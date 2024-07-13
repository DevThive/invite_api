import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get<string>('KAKAO_CLIENT_ID');
    const clientSecret = configService.get<string>('KAKAO_CLIENT_SECRET');
    const callbackURL = configService.get<string>('KAKAO_CALLBACK_URL');

    // console.log('KAKAO_CLIENT_ID:', clientID);
    // console.log('KAKAO_CLIENT_SECRET:', clientSecret);
    // console.log('KAKAO_CALLBACK_URL:', callbackURL);

    super({
      clientID,
      clientSecret,
      callbackURL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    const {
      id,
      username,
      _json: { kakao_account },
    } = profile;
    const user = {
      id,
      username,
      email: kakao_account.email,
      accessToken,
    };

    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
