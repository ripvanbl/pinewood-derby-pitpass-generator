import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { PitpassService } from 'app/pitpass/pitpass.service';
import { AuthService } from 'app/auth/auth.service';
import { Racer } from 'app/racer/racer.model';
import { User } from 'app/auth/user.model';
import { RacerService } from 'app/racer/racer.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _user$: ISubscription;

  public pitpasses: Array<Racer>;

  constructor(private router: Router,
    private authService: AuthService,
    private pitpassService: PitpassService,
    private racerService: RacerService) {
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

  newPitpass(): void {
    this.racerService.reset()
      .then(() => {
        this.router.navigate(['/info']);
      });
  }
}
