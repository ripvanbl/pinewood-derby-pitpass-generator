import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  user: Subject<User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = new Subject<User>();
  }

  login(): void {
    this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => { 
            this.isLoggedIn = true;
            this.user.next(new User(result.user));
        })
        .catch((err) => { 
            console.log('LOGIN:', err);
            this.user.next(new User());
            this.isLoggedIn = false;
        });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.isLoggedIn = false;
  }
}