import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from './user';
import { StorageService } from 'app/storage/storage.service';

@Injectable()
export class AuthService implements OnDestroy {
  private _isLoggedIn = new ReplaySubject<boolean>();
  private _authState$: Subscription = null;

  public user: BehaviorSubject<User>;
  public get isLoggedIn() { return this._isLoggedIn.asObservable(); }

  constructor(private afAuth: AngularFireAuth, private storage: StorageService) {
    this.user = new BehaviorSubject<User>(null);

    this._authState$ = this.afAuth.authState.subscribe(firebaseUser => { this._setAuthState(firebaseUser); });
  }

  ngOnDestroy() {
    this._authState$.unsubscribe();
  }

  getUserIdToken(): Promise<string> {
    if (!firebase.auth().currentUser) {
      return Promise.reject('No current user');
    }

    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          resolve(idToken);
        }).catch((error) => {
          reject(error);
        });
    });
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

  _setAuthState(user): void {
    if (!user || !user.uid) {
      this._isLoggedIn.next(false);
      return;
    }

    const usr = new User(user);
    this.user.next(usr);
    this._isLoggedIn.next(true);
  }
}
