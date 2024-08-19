import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  sub: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    //
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    const action = (isLogged) => {
      if (!isLogged) {
        return;
      }
      this.navigate();
    };
    this.sub = this.loginService.getLoggedIn$().subscribe(action);
  }

  onSubmit(formDirective: FormGroupDirective) {
    const { loginForm } = this;
    if (!loginForm.valid) {
      return;
    }
    const { username, password } = loginForm.value
    this.loginService
      .login(username, password)
      .then(() => {
        formDirective.resetForm();
        loginForm.reset();
        this.navigate();
      });
  }

  private navigate(){
    this.router.navigate(['admin']);
  }
}
