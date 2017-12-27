import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { PitpassService } from 'app/pitpass/pitpass.service';
import { AuthService } from 'app/auth/auth.service';
import { Racer } from 'app/racer/racer.model';
import { User } from 'app/auth/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _user$: ISubscription;

  public pitpasses: Array<Racer>;

  constructor(private authService: AuthService, private pitpassService: PitpassService) {
    this.pitpasses = [];
  }

  ngOnInit() {
    this._user$ = this.authService.user.subscribe(usr => {
      if (!usr) { return; }

      this.pitpassService.load(usr).subscribe(pp => {
        this.pitpasses = pp;
      });
    });
  }

  ngOnDestroy() {
    this._user$.unsubscribe();
  }

}
