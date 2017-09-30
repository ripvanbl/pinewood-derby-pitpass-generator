import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from './auth/user.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private userSubscription: Subscription;
  
  title = 'Pitpass Generator';
  user: User;

  constructor(public authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(value => {
      this.user = value;
      this.changeDetectorRef.detectChanges();
    });
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userSubscription.unsubscribe();
  }
  
  login() {
    this.authService.login();
  }
  
  logout() {
    this.authService.logout();
  }
}
