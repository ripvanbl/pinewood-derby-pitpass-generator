import { ITheme } from '../itheme';

export class Pack1722018Theme implements ITheme {
  name: string;
  description: string;
  iconDataURL: string;
  component: string;

  constructor() {
    this.name = 'Pack 172 - 2018';
    this.description = 'Pitpass theme for Cub Scout Pack 172 used for the 2018 Pinewood Derby.';
    this.iconDataURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    this.component = 'Pack1722018Component';
  }
}
