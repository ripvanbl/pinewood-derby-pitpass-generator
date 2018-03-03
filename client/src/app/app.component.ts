import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private user$: ISubscription;
  private router$: ISubscription;

  public title = 'Pitpass Generator';
  public user: User;

  constructor(public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {}

  ngOnInit() {
    this.user$ = this.authService.user.subscribe(value => {
      this.user = value;
      this.changeDetectorRef.detectChanges();
    });

    this.router$ = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0)
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.user$.unsubscribe();
    this.router$.unsubscribe();
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
