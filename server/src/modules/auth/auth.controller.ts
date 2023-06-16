import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard, RolesGuard } from 'src/modules/auth/guards';
import { User } from 'src/common/decorators';
import { JwtPayloadUser } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('signout')
  signOut(@User() user: Partial<JwtPayloadUser>) {
    return this.authService.signOut(user.id, user.refreshToken);
  }

  @UseGuards(RefreshTokenGuard, RolesGuard)
  @Get('refresh')
  refreshTokens(@User() user: Partial<JwtPayloadUser>) {
    return this.authService.refreshTokens({ id: user.id }, user.refreshToken);
  }
}
