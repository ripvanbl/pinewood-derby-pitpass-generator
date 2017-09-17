export const ranks = ['Tiger', 'Wolf', 'Bear', 'Webelos', 'Arrow of Light'];

export class Racer {
  private trans1x1: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  firstname: string;
  lastname: string;
  rank: string;
  carname: string;
  profilePhotoDataURL: string;
  
  constructor() {
    this.profilePhotoDataURL = this.trans1x1;
  }
  
  reset() {
    this.firstname = '';
    this.lastname = '';
    this.rank = '';
    this.profilePhotoDataURL = this.trans1x1;
  }
};
