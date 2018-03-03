import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'; //pour formater le Observable en json.

@Injectable()
export class DataService {
  result:any;

  constructor(private _http: Http) { }

  getDrummers() {
    return this._http.get('admin/drummers')
    .map(result => this.result = result.json());
  }

  getDrummersById(id) {
    return this._http.get('admin/drummers/'+id)
    .map(result => this.result = result.json());
  }

}