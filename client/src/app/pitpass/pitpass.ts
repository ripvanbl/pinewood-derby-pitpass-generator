import { Racer } from 'app/racer/racer';
import { ITheme } from 'app/themes/itheme';

export class Pitpass {
  public _id: string;
  public uid: string;
  public racer: Racer;
  public theme: ITheme;

  constructor(pitpass?: Pitpass) {
    if (pitpass) {
      Object.assign(this, pitpass);
    } else {
      this.reset();
    }
  }

  reset(): void {
    this._id = '';
    this.uid = '';
    this.racer = new Racer();
    this.theme = null;
  }
}
