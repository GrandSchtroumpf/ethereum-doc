import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class Auth {

  public user$ = this.afAuth.user;

  constructor(
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth
  ) {}

  public login() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  public loginAlert() {
    this.snackBar.open('Please login before', 'close', {duration: 2000});
  }
}
