import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/last';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from './user.model';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService implements OnDestroy {
  private USER_KEY = 'user';
  private _loggedIn = false;
  private _user$: Subscription = null;
  private _authState$: Subscription = null;

  public user: BehaviorSubject<User>;

  constructor(private afAuth: AngularFireAuth, private storage: StorageService) {
    this.user = new BehaviorSubject<User>(null);

    this._authState$ = this.afAuth.authState.subscribe((usr) => { this._setAuthState(usr); });

    const storedUser = this.storage.getItem(this.USER_KEY);

    if (storedUser) {
      this.user.next(storedUser);
    }
  }

  ngOnDestroy() {
    this._user$.unsubscribe();
    this._authState$.unsubscribe();
  }

  getUserIdToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          resolve(idToken);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  isLoggedIn(): boolean {
    return this._loggedIn;
  }

  login(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginAnonymous(): void {
    this.afAuth.auth.signInAnonymously();
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
        .catch((err: Error) => {
          console.log('LOGOUT:', err);
        })
        .then(() => {
          this.storage.clear();
          this.user.next(null);
          resolve(null);
        });
    });
  }

  _setAuthState(result): void {
    if (!result) {
      this._loggedIn = false;
      return;
    }

    const usr = new User(result);
    this.storage.setItem(this.USER_KEY, usr);
    this.user.next(usr);

    this._loggedIn = usr.uid ? true : false;
  }
}
