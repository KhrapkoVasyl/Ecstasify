import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto, SignUpDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard, RolesGuard } from 'src/modules/auth/guards';
import { User } from 'src/common/decorators';
import { JwtPayloadUser } from './types';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() data: SingInDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('signout')
  signOut(@User() user: Partial<JwtPayloadUser>) {
    return this.authService.signOut(user.refreshTokenId);
  }

  @UseGuards(RefreshTokenGuard, RolesGuard)
  @Post('tokens/refresh')
  refreshTokens(@User() user: Partial<JwtPayloadUser>) {
    return this.authService.refreshTokens({ id: user.id }, user.refreshTokenId);
  }
}
