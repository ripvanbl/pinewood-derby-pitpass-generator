import { Injectable } from '@angular/core';

import { User } from '../auth/user.model';
import { Racer } from './racer.model';
import { StorageService } from '../storage/storage.service';
import { HttpService } from '../network/http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RacerService {
  private RACER_KEY = 'racer';
  private _racer: Racer;

  public get racer(): Racer {
    return this._racer;
  }

  constructor(private storageService: StorageService,
    private httpService: HttpService) {
    const rcr = this.storageService.getItem(this.RACER_KEY);

    if (rcr) {
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
      } catch (e) {
        reject(e);
      }
    });
  }

  save(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.storageService.setItem(this.RACER_KEY, this._racer);

        resolve(this._racer);
      } catch (e) {
        reject(e);
      }
    });
  }

  saveToProfile(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (user && user.uid && this._racer) {
          const rcr = this._racer.getSaveModel();

          if (rcr._id) {
            this.httpService.put(environment.routes.pitpass, rcr)
              .subscribe(
                resp => { resolve(this._racer); },
                error => { reject(null); }
              );
          } else {
            this.httpService.post(environment.routes.pitpass, rcr)
              .subscribe(
                resp => {
                  this._racer._id = resp.data._id;
                  this._racer.uid = resp.data.uid;
                  this.save()
                    .then(() => { resolve(this._racer); })
                    .catch(() => { reject(null); });
                },
                error => { reject(null); }
              );
          }
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
