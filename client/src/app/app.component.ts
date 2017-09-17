import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pitpass Generator';
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {}
  
  ngOnInit() {
    this.user = this.afAuth.authState;
  }
  
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  
  logout() {
      this.afAuth.auth.signOut();
  }
}
