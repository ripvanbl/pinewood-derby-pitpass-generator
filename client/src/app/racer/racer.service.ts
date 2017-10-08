import { Injectable } from '@angular/core';

import { Racer } from './racer.model';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class RacerService {
  private RACER_KEY: string = 'racer';
  private _racer: Racer;

  public get racer(): Racer {
    return this._racer;
  }

  constructor(private storageService: StorageService) {
    let rcr = this.storageService.getItem(this.RACER_KEY);

    if(rcr) {
      this._racer = new Racer(rcr);
    } else {
      this._racer = new Racer();
    }
  }

  reset(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._racer.reset();
        this.storageService.removeItem(this.RACER_KEY);
        resolve(this._racer);
      } catch(e) {
        reject(e);
      }  
    });
  }

  save(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.storageService.setItem(this.RACER_KEY, this._racer);
        resolve(this._racer);
      } catch(e) {
        reject(e);
      }
    });
  }
}
