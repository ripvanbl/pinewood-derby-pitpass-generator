import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { RacerService } from '../racer/racer.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  public user: BehaviorSubject<User>;

  constructor(private authService: AuthService, private racerService: RacerService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  save(): void {
    this.racerService.saveToProfile(this.user.getValue());
  }
}
