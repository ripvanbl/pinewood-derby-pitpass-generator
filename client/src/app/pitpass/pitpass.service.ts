import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from 'app/network/http.service';
import { StorageService } from 'app/storage/storage.service';
import { User } from 'app/auth/user';
import { Pitpass } from 'app/pitpass/pitpass';
import { environment } from 'environments/environment';

@Injectable()
export class PitpassService {
  private readonly CURRENT_PITPASS_KEY = 'currentpp';
  private _pitpasses: Array<Pitpass>;
  private _current: Pitpass;

  public get current() { return this._current; }
  public set current(pitpass: Pitpass) {
    this._current = pitpass;
    this.storageService.setItem(this.CURRENT_PITPASS_KEY, pitpass);
  }

  constructor(private httpService: HttpService, private storageService: StorageService) {
    this._pitpasses = [];
    this._current = storageService.getItem(this.CURRENT_PITPASS_KEY) || new Pitpass();
  }

  load(user: User): Observable<Array<Pitpass>> {
    const endpoint = `${environment.routes.pitpass}?uid=${user.uid}`;

    return Observable.create(observer => {
      if (!this._pitpasses.length) {
        this.httpService.get(endpoint)
          .subscribe(res => {
            this._pitpasses = res.data;
            observer.next(this._pitpasses);
          });
      } else {
        observer.next(this._pitpasses);
      }
    });
  }

  save(pitpass: Pitpass): Promise<Pitpass> {
    return new Promise((resolve, reject) => {
      try {
        if (!pitpass) {
          reject('No pitpass to save!');
          return;
        }

        const pp = Object.assign(new Pitpass(), pitpass);

        if (pitpass._id) {
          this.httpService.put(environment.routes.pitpass, pp)
            .subscribe(
              resp => { resolve(new Pitpass(resp)); },
              error => { reject(null); }
            );
        } else {
          this.httpService.post(environment.routes.pitpass, pp)
            .subscribe(
              resp => {
                const newPitpass = new Pitpass(resp);
                this._pitpasses.push(newPitpass);
                resolve(newPitpass);
              },
              error => { reject(null); }
            );
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}
