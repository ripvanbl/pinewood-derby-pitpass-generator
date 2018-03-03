import { Racer } from 'app/racer/racer';

export interface ITheme {
  id: string;
  displayName: string;
  description: string;
  thumbnailBackURL: string;
  thumbnailFrontURL: string;
  component: any;
  isSelected: boolean;
}
