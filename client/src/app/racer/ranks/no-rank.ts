import { IRacerRank } from '../iracer-rank';

export class NoRank implements IRacerRank {
  name: string;
  logoDataURL: string;

  constructor() {
    this.name = '';
    this.logoDataURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
}
