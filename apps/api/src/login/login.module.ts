import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginStrategy } from './login.strategy';
import { JWT_SECRET } from './login.config';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    LoginStrategy,
  ],
})
export class LoginModule { }
