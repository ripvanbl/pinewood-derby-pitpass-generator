import { find } from 'lodash';

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

  /**
   * Converts a server-side pitpass into a client-side model.
   * @param dto The server variant of a pitpass
   * @param themes The list of themes to use for lookup
   */
  fromDTO(dto: any, themes: Array<ITheme>): Pitpass {
    if (dto && themes) {
      this._id = dto._id || '';
      this.uid = dto.uid || '';
      this.racer = new Racer(dto.racer) || new Racer();
      this.theme = find(themes, {'id': dto.theme}) || null;
    }

    return this;
  }

  /**
   * Creates a data transfer object based on the contract with the server.
   */
  toDTO(): any {
    const item = {
      _id: this._id,
      uid: this.uid,
      racer: Object.assign({}, this.racer),
      theme: this.theme.id
    };

    // Clean up any extraneous properties the server doesn't need
    if (!item._id) {
      delete item._id;
    }

    if (!item.uid) {
      delete item.uid;
    }

    return item;
  }
}
