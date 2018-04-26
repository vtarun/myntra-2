import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  public static BASE_URL = "http://192.168.0.118:3000/";

  constructor(public http: HttpClient) {
    
  }
  get(url) {
    return this.http.get(HttpServiceProvider.BASE_URL + url);

  }

  post(url, data) {
    return this.http.post(HttpServiceProvider.BASE_URL + url, data);
  }

  put(url, data) {
    return this.http.put(HttpServiceProvider.BASE_URL + url, data);

  }

}
