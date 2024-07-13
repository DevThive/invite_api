import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { UserId } from './decorators/userId.decorator';
import { UsersService } from 'src/users/users.service';

import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('로그인&회원가입')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  signup(@Body() singupUserDto: SignupUserDto) {
    return this.authService.signup(singupUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiBearerAuth('accessToken')
  @Get('me')
  async authme(@Req() req, @UserId() userId: number, @Res() res) {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await this.authService.validateAccessToken(token);
      const user = await this.usersService.findUserById(decodedToken.userId);
      return res.json(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        const refreshToken = req.headers['x-refresh-token'];
        const googleRefreshToken = req.headers['x-google-refresh-token'];
        if (!refreshToken && !googleRefreshToken) {
          throw new UnauthorizedException('Refresh token is missing');
        }
        let newAccessToken: string;
        let newRefreshToken: string;

        if (refreshToken) {
          const newTokens = await this.authService.refresh(refreshToken);
          newAccessToken = newTokens.accessToken;
          newRefreshToken = newTokens.refreshToken;
          res.setHeader('x-access-token', newAccessToken);
          res.setHeader('x-refresh-token', newRefreshToken);
        }
        const decodedToken =
          await this.authService.validateAccessToken(newAccessToken);
        const user = await this.usersService.findUserById(decodedToken.userId);
        return res.json({ accessToken: newAccessToken, user });
      }
      throw error;
    }
  }

  @Post('refreshtoken')
  async refreshtoken(@Body() refreshTokendto: RefreshTokenDto) {
    return await this.authService.refresh(refreshTokendto.refreshToken);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req) {
    // 카카오 로그인 리다이렉트
  }

  @Get('kakao/redirect')
  async kakaoLoginRedirect(@Query('code') code: string) {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    const userInfo = await this.authService.getUserInfo(accessToken);
    // console.log(accessToken);
    return this.authService.kakaologin(userInfo);
  }
}
