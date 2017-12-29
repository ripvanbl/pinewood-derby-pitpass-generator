import { Component, OnInit } from '@angular/core';

import { ITheme } from '../itheme';
import { Racer } from 'app/racer/racer';
import { PitpassService } from 'app/pitpass/pitpass.service';


@Component({
  selector: 'app-pack172-2018',
  templateUrl: './pack172-2018.component.html',
  styleUrls: ['./pack172-2018.component.css']
})
export class Pack1722018Component implements OnInit, ITheme {
  public id = 'Pack1722018Component';
  public displayName = 'Pack 172 - 2018';
  public description = 'Cub Scout Pack 172 Pinewood Derby Pitpass for 2018.';
  public thumbnailFrontURL = '/assets/themes/ppg-theme-f-2017.png';
  public thumbnailBackURL = '/assets/themes/ppg-theme-b-2017.png';
  public component = Pack1722018Component;
  public isSelected = false;
  public racer: Racer;

  constructor(private pitpassService: PitpassService) {}

  ngOnInit() {
    this.racer = this.pitpassService.current.racer;
  }

}
