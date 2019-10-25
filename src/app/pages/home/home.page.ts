import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
// import { freemem } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public http: HttpClient, public apiService: ApiService) {}
  utilisateurs; any; // je déclare mon tableau utilisateurs
  test2() {
    this.apiService.getPage().subscribe(data => {
        console.log(data[0].name);
        this.utilisateurs = data;
        // console.log(this.utilisateurs[0]);
        console.log(data);
    });
  }
}
