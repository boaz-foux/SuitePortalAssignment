import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from '../shared/services';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private router: Router) { }

    async canActivate() {
        const flag = await this.loginService.isLoggedIn();
        if (!flag) {
            this.router.navigate(['login']);
        }
        return true;
    }
}