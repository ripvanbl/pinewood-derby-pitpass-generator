import { Component, OnInit } from '@angular/core';

import { Racer } from '../../racer/racer.model';
import { RacerService } from '../../racer/racer.service';

@Component({
  selector: 'app-pack172-2018',
  templateUrl: './pack172-2018.component.html',
  styleUrls: ['./pack172-2018.component.css']
})
export class Pack1722018Component implements OnInit {
  public racer: Racer;

  constructor(private racerService: RacerService) { }

  ngOnInit() {
    this.racer = this.racerService.racer;
  }

}
