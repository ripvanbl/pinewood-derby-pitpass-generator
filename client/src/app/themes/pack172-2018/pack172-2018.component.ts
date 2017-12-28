import { Component, OnInit } from '@angular/core';

import { Racer } from 'app/racer/racer.model';
import { PitpassService } from 'app/pitpass/pitpass.service';

@Component({
  selector: 'app-pack172-2018',
  templateUrl: './pack172-2018.component.html',
  styleUrls: ['./pack172-2018.component.css']
})
export class Pack1722018Component implements OnInit {
  public racer: Racer;

  constructor(private pitpassService: PitpassService) { }

  ngOnInit() {
    this.racer = this.pitpassService.current.racer;
  }

}
