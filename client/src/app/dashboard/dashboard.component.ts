import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { AuthService } from 'app/auth/auth.service';
import { PitpassService } from 'app/pitpass/pitpass.service';
import { Pitpass } from 'app/pitpass/pitpass';
import { User } from 'app/auth/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _user$: ISubscription;
  private _pitpass$: ISubscription;

  public pitpasses: Array<Pitpass>;

  constructor(private router: Router,
    private authService: AuthService,
    private pitpassService: PitpassService) {
    this.pitpasses = [];
  }

  ngOnInit() {
    this._user$ = this.authService.user.subscribe(usr => {
      if (!usr) { return; }

      this._pitpass$ = this.pitpassService.load(usr).subscribe(pp => {
        this.pitpasses = pp;
      });
    });
  }

  ngOnDestroy() {
    if (this._user$) {
      this._user$.unsubscribe();
    }

    if (this._pitpass$) {
      this._pitpass$.unsubscribe();
    }
  }

  newPitpass(): void {
    this.pitpassService.current = new Pitpass();
    this.router.navigate(['/info']);
  }
}
