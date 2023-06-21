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
import { AuthTokens, JwtPayloadUser } from './types';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<AuthTokens> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() data: SingInDto): Promise<AuthTokens> {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('signout')
  signOut(@User() user: JwtPayloadUser) {
    return this.authService.signOut({ id: user.refreshTokenId });
  }

  @UseGuards(RefreshTokenGuard, RolesGuard)
  @Post('tokens/refresh')
  refreshTokens(@User() user: JwtPayloadUser): Promise<AuthTokens> {
    return this.authService.refreshTokens(
      { id: user.id },
      { id: user.refreshTokenId },
    );
  }
}
