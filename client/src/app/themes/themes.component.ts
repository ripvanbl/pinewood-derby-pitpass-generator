import { Component, OnInit } from '@angular/core';

import { Racer } from '../racer/racer.model';
import { RacerService } from '../racer/racer.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  public racer: Racer;
  public currentDate: Date;

  constructor(private racerService: RacerService) { }

  ngOnInit() {
    this.racer = this.racerService.racer;
    this.currentDate = new Date();
  }

}
