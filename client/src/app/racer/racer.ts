import { IRacerRank } from './iracer-rank';
import { NoRank } from './ranks/no-rank';

export class Racer {
  private readonly trans1x1 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  public firstname: string;
  public lastname: string;
  public rank: string;
  public carname: string;
  public profilePhotoDataURL: string;

  constructor(racer?: Racer) {
    if (racer) {
      Object.assign(this, racer);
    }

    if (!this.profilePhotoDataURL) {
      this.profilePhotoDataURL = this.trans1x1;
    }
  }

  reset() {
    this.firstname = '';
    this.lastname = '';
    this.carname = '';
    this.rank = '';
    this.profilePhotoDataURL = this.trans1x1;
  }
};
