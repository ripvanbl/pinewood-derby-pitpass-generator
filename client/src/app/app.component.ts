import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  title = 'Pitpass Generator';
  user: User;

  constructor(public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(value => {
      this.user = value;
      this.changeDetectorRef.detectChanges();
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0)
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
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.router.navigate(['/']);
      });
  }
}
