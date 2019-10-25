import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  basePath = 'http://localhost:8080';

  getPage() {
      return this.http.get(this.basePath + '/membres');
  }
}
