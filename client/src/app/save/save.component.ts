import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from 'app/auth/auth.service';
import { PitpassService } from 'app/pitpass/pitpass.service';
import { User } from 'app/auth/user';


@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  public user: BehaviorSubject<User>;

  constructor(private authService: AuthService, private pitpassService: PitpassService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  save(): void {
    this.pitpassService.save(this.pitpassService.current);
  }
}
