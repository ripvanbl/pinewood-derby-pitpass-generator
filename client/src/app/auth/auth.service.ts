import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from './user.model';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService {
  private USER_KEY = 'user';
  
  user: BehaviorSubject<User>;

  constructor(private afAuth: AngularFireAuth, private storage: StorageService) {
    this.user = new BehaviorSubject<User>(null);
    
    let usr = this.storage.getItem(this.USER_KEY);
    
    if(usr) {
      this.user.next(usr);
    }
  }

  login(): void {
    this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => {
          let usr = new User(result.user);
          this.storage.setItem(this.USER_KEY, usr);
          this.user.next(usr);
        })
        .catch((err) => { 
          console.log('LOGIN:', err);
          this.storage.removeItem(this.USER_KEY);
          this.user.next(null);
        });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.storage.clear();
    this.user.next(null);
  }
}