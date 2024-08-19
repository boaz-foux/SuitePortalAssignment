import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LOGIN_COOKIE_NAME, JWT_SECRET } from './login.config';
import { LoginService } from './login.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private loginService: LoginService,
    ) {
        const jwtFromRequest = ExtractJwt.fromExtractors([
            (request) => {
                return request?.cookies?.[LOGIN_COOKIE_NAME];
            },
        ]);

        super({
            jwtFromRequest,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload) {
        if (!this.loginService.validate(payload?.username, payload?.hash)) {
            return null;
        }
        return payload;
    }
}