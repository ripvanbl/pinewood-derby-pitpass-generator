import { Injectable } from '@angular/core';

import { Scout } from './scout.model';

@Injectable()
export class ScoutService {
  scout: Scout;

  constructor() {
    this.scout = new Scout();
  }

  fetch(): Scout {
    return this.scout;
  }
}