import { Component, Input } from '@angular/core';

import { ITheme } from '../itheme';
import { Racer } from 'app/racer/racer';
import { Pitpass } from 'app/pitpass/pitpass';


@Component({
  selector: 'app-pack172-2018',
  templateUrl: './pack172-2018.component.html',
  styleUrls: ['./pack172-2018.component.css']
})
export class Pack1722018Component implements ITheme {
  @Input() pitpass: Pitpass;

  public id = 'Pack1722018Component';
  public displayName = 'Pack 172 - 2018';
  public description = 'Cub Scout Pack 172 Pinewood Derby Pitpass for 2018.';
  public thumbnailFrontURL = '/assets/themes/ppg-theme-f-2017.png';
  public thumbnailBackURL = '/assets/themes/ppg-theme-b-2017.png';
  public component = Pack1722018Component;
  public isSelected = false;
}
