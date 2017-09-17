import { Injectable } from '@angular/core';

import { Racer } from './scout.model';

@Injectable()
export class RacerService {
  racer: Racer;

  constructor() {
    this.racer = new Racer();
  }

  fetch(): Racer {
    return this.racer;
  }
  
  reset(): Racer {
    this.racer.reset();
    return this.racer;
  }
}
