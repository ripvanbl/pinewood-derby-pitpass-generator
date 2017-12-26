import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  private _user$: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$
      .map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/']);
        }

        return isLoggedIn;
      })
      .catch(() => {
        return Observable.of(false);
      });
  }
}
