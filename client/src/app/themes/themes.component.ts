import { Component } from '@angular/core';

import { ITheme } from './itheme';
import { ThemeService } from './theme.service';
import { Pitpass } from 'app/pitpass/pitpass';
import { PitpassService } from 'app/pitpass/pitpass.service';


@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent  {
  public get pitpass(): Pitpass { return this.pitpassService.current; }
  public get themes(): Array<ITheme> { return this.themeService.themes; }

  constructor(private pitpassService: PitpassService, private themeService: ThemeService) { }

  onSelect(theme: ITheme): void {
    this.themes.forEach(item => {
      if (theme.component === item.component) {
        theme.isSelected = true;
        this.pitpass.theme = theme;
        this.pitpassService.updateCurrent(this.pitpass);
      } else {
        theme.isSelected = false;
      }
    });
  }
}
