import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/auth/user';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  public user: Observable<User> = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
  }

}
