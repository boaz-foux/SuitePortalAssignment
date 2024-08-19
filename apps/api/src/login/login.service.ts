import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getHash } from './login.utils';
import { ADMIN, JWT_SECRET } from './login.config';

@Injectable()
export class LoginService {

  constructor(private jwtService: JwtService) {
    //
  }

  login(username: string, passwordHash: string) {
    const hash = getHash(passwordHash);

    if(!this.validate(username,hash)){
      throw new ForbiddenException();
    }

    const payload = {
      username,
      hash,
    };
    return this.jwtService
      .signAsync(
        payload,
        { secret: JWT_SECRET },
      );
  }

  validate(username: string, hash: string) {
    return username === ADMIN.username && hash === getHash(ADMIN.password)
  }
}
