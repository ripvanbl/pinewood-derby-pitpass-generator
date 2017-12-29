import { Injectable } from '@angular/core';

import { ITheme } from './itheme';
import { PitpassService } from 'app/pitpass/pitpass.service';
import { Pack1722018Component } from './pack172-2018/pack172-2018.component';


@Injectable()
export class ThemeService {
  private _themes: Array<ITheme>;

  public get themes() { return this._themes; }

  constructor(private pitpassService: PitpassService) {
    this._themes = [
      new Pack1722018Component(pitpassService)
    ];
  }
}
