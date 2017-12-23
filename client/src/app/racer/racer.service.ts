import { Injectable } from '@angular/core';

import { User } from '../auth/user.model';
import { Racer } from './racer.model';
import { StorageService } from '../storage/storage.service';
import { Promise } from 'q';

@Injectable()
export class RacerService {
  private RACER_KEY = 'racer';
  private PERSIST_QUEUE_KEY = 'persist';
  private _racer: Racer;
  private _persistQueue: Array<Racer>;

  public get racer(): Racer {
    return this._racer;
  }

  constructor(private storageService: StorageService) {
    const rcr = this.storageService.getItem(this.RACER_KEY);
    const prcr = this.storageService.getItem(this.PERSIST_QUEUE_KEY);

    if (rcr) {
      this._racer = new Racer(rcr);
    } else {
      this._racer = new Racer();
    }

    if (prcr) {
      this._persistQueue = prcr;
    } else {
      this._persistQueue = [];
    }
  }

  reset(): Promise<any> {
    return Promise((resolve, reject) => {
      try {
        this._racer.reset();
        this.storageService.removeItem(this.RACER_KEY);
        resolve(this._racer);
      } catch (e) {
        reject(e);
      }
    });
  }

  save(user?: User): Promise<any> {
    return Promise((resolve, reject) => {
      try {
        this.storageService.setItem(this.RACER_KEY, this._racer);

        resolve(this._racer);
      } catch (e) {
        reject(e);
      }
    });
  }

  saveToProfile(user: User): Promise<any> {
    return Promise((resolve, reject) => {
      try {
        if (user && user.uid && this._racer) {
          const rcr = Object.assign({}, this._racer);
          this._persistQueue.push(rcr);
          this.storageService.setItem(this.PERSIST_QUEUE_KEY, this._persistQueue);
        } else {
          reject(null);
        }

        resolve(this._racer);
      } catch (e) {
        reject(e);
      }
    });
  }
}
