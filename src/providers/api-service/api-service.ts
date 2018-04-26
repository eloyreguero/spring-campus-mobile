import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http: HttpClient) {
  }

  public getShows(): Observable<any> {
    return this.http.get<any>('https://api.tvmaze.com/shows');
  }

}
