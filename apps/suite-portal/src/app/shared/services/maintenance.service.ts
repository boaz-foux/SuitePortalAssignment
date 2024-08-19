import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASIC_URL } from './config';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { LoginService } from './login.service';
import { BehaviorSubject, Subject } from 'rxjs';

const ROUTE = BASIC_URL + '/maintenance-requests';

export class LoginError extends Error { }

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {
    protected requests$ = new BehaviorSubject<MaintenanceRequest[]>([]);

    constructor(private http: HttpClient, private loginService: LoginService) {
        const action = (isLogged) => {
            if (!isLogged) {
                this.requests$.next([]);
              return;
            }
            this.checkOpenMaintanceCall();
          };
          loginService.getLoggedIn$().subscribe(action);
    }

    createMaintenanceCall(maintenance: MaintenanceRequest) {
        return <Promise<{ id: string }>>this.http.post(ROUTE, maintenance).toPromise();
    }

    getOpenMaintenanceCalls() {
        return this.requests$.asObservable();
    }

     closeMaintenanceCalls(id: string) {
        const url = `${ROUTE}/${id}/close`;
        const array = this.requests$.value;
        this.requests$.next(array.filter((call: any) => call.id !== id ));
        this.http.put(url, {}).toPromise()
        .catch(() => {
            this.requests$.next([]);
            this.checkOpenMaintanceCall();
        });
    }

    private checkOpenMaintanceCall() {
        this.http.get(ROUTE)
        .toPromise()
        .then((array: MaintenanceRequest[]) => {
            this.requests$.next(array);
        })
        .catch(()=> {
            this.requests$.next([]);
        });
    }

}