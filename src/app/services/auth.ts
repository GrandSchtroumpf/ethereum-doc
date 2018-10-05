import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class Auth {

  public user$ = this.afAuth.user;

  constructor(private afAuth: AngularFireAuth) {}

  public login() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

}
