import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';

import { AuthService } from 'app/auth/auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class HttpService {
  public baseUrl = environment.endpointPrefix;

  constructor(private ngCoreHttp: Http, private router: Router, private authService: AuthService) { }

  get(endpoint: string) {
    const getUserIdTokenFn = this.authService.getUserIdToken();

    return Observable.fromPromise(getUserIdTokenFn)
      .flatMap(token => {
        return this.ngCoreHttp.get(`${this.baseUrl}${endpoint}`, this.generateHeaders(token))
          .map((response: Response) => {
            return this.handleResponse(response);
          });
      });
  }

  put(endpoint: string, data: any) {
    const getUserIdTokenFn = this.authService.getUserIdToken();

    return Observable.fromPromise(getUserIdTokenFn)
      .flatMap(token => {
        return this.ngCoreHttp.put(`${this.baseUrl}${endpoint}`, JSON.stringify(data), this.generateHeaders(token))
          .map((response: Response) => {
            return this.handleResponse(response);
          });
      });
  }

  post(endpoint: string, data: any) {
    const getUserIdTokenFn = this.authService.getUserIdToken();

    return Observable.fromPromise(getUserIdTokenFn)
      .flatMap(token => {
        return this.ngCoreHttp.post(`${this.baseUrl}${endpoint}`, data, this.generateHeaders(token))
          .map((response: Response) => {
            return this.handleResponse(response);
          });
      });
  }

  del(endpoint: string) {
    const getUserIdTokenFn = this.authService.getUserIdToken();

    return Observable.fromPromise(getUserIdTokenFn)
      .flatMap(token => {
        return this.ngCoreHttp.delete(`${this.baseUrl}${endpoint}`, this.generateHeaders(token))
          .map((response: Response) => {
            return this.handleResponse(response);
          });
      });
  }

  private generateHeaders(token: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    headers.append('Authorization', 'Bearer ' + token);
    return { headers: headers };
  }

  private handleResponse(response: Response) {
    if (response) {
      return (response.text()) ? response.json() : {};
    }

    return {};
  }
}
