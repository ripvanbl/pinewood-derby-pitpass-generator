import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './auth/user.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pitpass Generator';
  user: Observable<User>;

  constructor(public authService: AuthService) {}
  
  ngOnInit() {
    this.user = this.authService.user;
  }
  
  login() {
    this.authService.login();
  }
  
  logout() {
      this.authService.logout();
  }
}
