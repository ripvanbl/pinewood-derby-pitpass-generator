import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ITheme } from './itheme';
import { AppModule } from 'app/app.module';


@Injectable()
export class ThemeService {
  private _themes: ReplaySubject<ITheme>;

  public get themes() { return this._themes.asObservable(); }

  constructor() {
    this._themes = new ReplaySubject<ITheme>();
  }

  register(theme: ITheme): void {
    this._themes.next(theme);
  }
}
