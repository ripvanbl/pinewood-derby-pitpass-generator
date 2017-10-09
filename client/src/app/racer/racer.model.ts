export const ranks = ['Tiger', 'Wolf', 'Bear', 'Webelos', 'Arrow of Light'];

export class Racer {
  private trans1x1: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  
  public firstname: string;
  public lastname: string;
  public rank: string;
  public carname: string;
  public profilePhotoDataURL: string;
  
  constructor(racer?: Racer) {
    if(racer) {
      Object.assign(this, racer);
    }
    
    if(!this.profilePhotoDataURL) {
      this.profilePhotoDataURL = this.trans1x1;
    }
  }
  
  reset() {
    this.firstname = '';
    this.lastname = '';
    this.rank = '';
    this.profilePhotoDataURL = this.trans1x1;
  }
};
