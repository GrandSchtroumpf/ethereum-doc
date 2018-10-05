import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Auth } from './../../services/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public user$: Observable<firebase.User>;

  constructor(private auth: Auth) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  public login() {
    this.auth.login();
  }

  public logout() {
    this.auth.logout();
  }

}
