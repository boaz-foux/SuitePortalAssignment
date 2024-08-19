import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { getHash } from "../utils";
import { BASIC_URL } from "./config";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

const ROUTE = BASIC_URL + '/login';

@Injectable({
    providedIn: 'root'
})
export class LoginService  {
    protected isLoggedIn$ = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private router: Router) {
        this.checkLoggedIn();
     }

    async logout() {
        document.cookie = "Authorization=;path=/;expires=0";
        this.http.delete(ROUTE);
        this.isLoggedIn$.next(false);
        this.router.navigate(['login']); // couldn't find a fast way in time for directive/component sorry :(
    }

    async login(username: string, password: string) {
        const hashed = await getHash(password);
        this.http.post(ROUTE, { username, password: hashed })
        .toPromise()
        .then(() => {
            this.isLoggedIn$.next(true);
        })
        .catch(()=> {
            this.isLoggedIn$.next(false);
        });
    }

    async isLoggedIn() {
        return this.isLoggedIn$.value;
    }

    getLoggedIn$() {
        return this.isLoggedIn$.asObservable();
    }

    private checkLoggedIn() {
        this.http.get(ROUTE)
        .toPromise()
        .then(() => {
            this.isLoggedIn$.next(true);
        })
        .catch(()=> {
            this.isLoggedIn$.next(false);
        });
    }
}