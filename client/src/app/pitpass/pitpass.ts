import { Racer } from 'app/racer/racer';

export class Pitpass {
  public _id: string;
  public uid: string;
  public racer: Racer;

  constructor(pitpass?: Pitpass) {
    if (pitpass) {
      Object.assign(this, pitpass);
      Object.assign(this.racer, pitpass.racer);
    } else {
      this.reset();
    }
  }

  reset(): void {
    this._id = '';
    this.uid = '';
    this.racer = new Racer();
  }
}
