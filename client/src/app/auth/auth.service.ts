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
  private USER_KEY: string = 'user';
  private _loggedIn: boolean = false;
  private _user$: Subscription = null;
  
  user: BehaviorSubject<User>;

  constructor(private afAuth: AngularFireAuth, private storage: StorageService) {
    this.user = new BehaviorSubject<User>(null);

    this._user$ = this.user.subscribe((usr) => { this._setLoggedIn(usr); });
    
    let usr = this.storage.getItem(this.USER_KEY);
    
    if(usr) {
      this.user.next(usr);
    }
  }

  ngOnDestroy() {
    this._user$.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this._loggedIn;
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then((result) => {
            let usr = new User(result.user);
            this.storage.setItem(this.USER_KEY, usr);
            this.user.next(usr);
          })
          .catch((err: Error) => { 
            console.log('LOGIN:', err);
            this.storage.removeItem(this.USER_KEY);
            this.user.next(null);
          })
          .then(resolve);
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
      .signOut()
      .catch((err: Error) => {
        console.log('LOGIN:', err);
      })
      .then(() => {
        this.storage.clear();
        this.user.next(null);
        resolve();
      });
    });
  }

  _setLoggedIn(usr): void {
    if(!usr) {
      this._loggedIn = false;
      return;
    }

    this._loggedIn = usr.uid ? true : false;
  }
}