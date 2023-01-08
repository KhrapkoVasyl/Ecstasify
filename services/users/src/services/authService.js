import bcrypt from 'bcryptjs';
import tokenService from './tokenService.js';
import userService from './userService.js';
import UserDto from '../dtos/user-dto.js';
import { kafkaTopics } from '../config.js';
import KafkaNotificationProducerService from './kafkaNotificationProducerService.js';

class AuthService {
  constructor(notificationProducer) {
    this.notificationProducer = notificationProducer;
    this.setup();
  }

  async setup() {
    try {
      await this.notificationProducer.connect();
    } catch (err) {
      console.error('Error while connecting to kafka: ' + err);
    }
  }

  async signUp(userData) {
    const user = await userService.getUserByEmail(userData.email);
    if (user) throw new Error('User with this email has already exists!');

    const newUser = await userService.createUser(userData);

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    await this.notificationProducer.send({
      topic: kafkaTopics.SUCCESSFUL_REGISTRATION,
      messages: [{ value: JSON.stringify(userDto) }],
    });

    return { ...tokens, user: userDto };
  }

  async signIn(userData) {
    const user = await userService.getUserByEmail(userData.email);
    if (!user) throw new Error('User with this email does not exists!');

    const isPassEqual = await bcrypt.compare(userData.password, user.password);
    if (!isPassEqual) throw new Error('Wrong password!');

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw new Error('User is not authorized');

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw new Error('User is not authorized');

    const user = await userService.getUserById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async signOut(refreshToken) {
    if (!refreshToken) throw new Error('User is not authorized');

    return await tokenService.removeToken(refreshToken);
  }
}

export default new AuthService(new KafkaNotificationProducerService());
