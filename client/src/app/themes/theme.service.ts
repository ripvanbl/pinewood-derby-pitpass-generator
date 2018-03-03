import { Injectable } from '@angular/core';
import { find } from 'lodash';

import { ITheme } from './itheme';
import { Pack1722018Component } from './pack172-2018/pack172-2018.component';


@Injectable()
export class ThemeService {
  private _themes: Array<ITheme>;

  public get themes() { return this._themes; }

  constructor() {
    this._themes = [
      new Pack1722018Component()
    ];
   }

  getById(id: string): ITheme {
    return find(this._themes, {'id': id});
  }
}
