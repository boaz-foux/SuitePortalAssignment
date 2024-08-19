import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';
import { LoginGuard } from './login.guard';
import { LOGIN_COOKIE_NAME, OK_JSON } from './login.config';

@Controller('login')
export class LoginController {

  constructor(
    private readonly LoginService: LoginService,
  ) {
    //
  }

  @UseGuards(LoginGuard)
  @Get('/')
  public async isLoggedIn(@Req() req) {
    return OK_JSON;
  }

  @Post('/')
  public async login(@Body() { username, password }: LoginDto, @Res() res) {
    const token = await this.LoginService.login(username, password);
    res.cookie(LOGIN_COOKIE_NAME, token, {httpOnly: true});
    res.end(OK_JSON);
  }

  @Delete('/')
  public async logout(@Res() res) {
    res.cookie(LOGIN_COOKIE_NAME, '');
    res.end(OK_JSON);
  }
}
