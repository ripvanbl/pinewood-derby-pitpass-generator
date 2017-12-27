import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../network/http.service';
import { User } from 'app/auth/user.model';
import { Racer } from 'app/racer/racer.model';
import { environment } from '../../environments/environment';


@Injectable()
export class PitpassService {
  private _pitpasses: Array<Racer>;

  constructor(private httpService: HttpService) {
    this._pitpasses = [];
  }

  load(user: User): Observable<Array<Racer>> {
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
}
