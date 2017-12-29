import { Component } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { ITheme } from './itheme';
import { Pack1722018Component } from 'app/themes/pack172-2018/pack172-2018.component';
import { PitpassService } from 'app/pitpass/pitpass.service';
import { Pitpass } from 'app/pitpass/pitpass';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent  {
  private _themes: Array<ITheme>;

  public get pitpass(): Pitpass { return this.pitpassService.current; }
  public get themes(): Array<ITheme> { return this._themes; }

  constructor(private pitpassService: PitpassService) {
    this._themes = [
      new Pack1722018Component(pitpassService)
    ];
  }

  onSelect(theme: ITheme): void {
    this._themes.forEach(item => {
      if (theme.component === item.component) {
        theme.isSelected = true;
        this.pitpassService.current.theme = theme;
      } else {
        theme.isSelected = false;
      }
    });
  }
}
