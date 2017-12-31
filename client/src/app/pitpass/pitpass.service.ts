import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from 'app/network/http.service';
import { StorageService } from 'app/storage/storage.service';
import { ThemeService } from 'app/themes/theme.service';
import { User } from 'app/auth/user';
import { Pitpass } from 'app/pitpass/pitpass';
import { Racer } from 'app/racer/racer';
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

  constructor(private httpService: HttpService, private storageService: StorageService, private themeService: ThemeService) {
    this._pitpasses = [];
    this._current = storageService.getItem(this.CURRENT_PITPASS_KEY) || new Pitpass();
  }

  load(user: User): Observable<Array<Pitpass>> {
    const endpoint = `${environment.routes.pitpass}?uid=${user.uid}`;

    return Observable.create(observer => {
      if (!this._pitpasses.length) {
        this.httpService.get(endpoint)
          .subscribe(res => {
            if (res && res.length) {
              this._pitpasses = res.map(item => {
                return new Pitpass().fromDTO(item, this.themeService.themes);
              });
            }

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

        // Create a DTO to send to the server
        const dto = pitpass.toDTO();

        if (dto._id) {
          this.httpService.put(environment.routes.pitpass, dto)
            .subscribe(
              resp => {
                pitpass.fromDTO(resp, this.themeService.themes);
                resolve(pitpass);
              },
              error => { reject(error); }
            );
        } else {
          this.httpService.post(environment.routes.pitpass, dto)
            .subscribe(
              resp => {
                const pp = new Pitpass().fromDTO(resp, this.themeService.themes);
                this._pitpasses.push(pp);
                resolve(pp);
              },
              error => { reject(error); }
            );
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  updateCurrent(pitpass: Pitpass): Pitpass {
    const pp = Object.assign({}, pitpass);
    this.current = pp;
    return this.current;
  }
}
