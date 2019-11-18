import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { userInfo } from 'os';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { ApiService } from '../../services/api.service';
// import { freemem } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: ActivatedRoute) {
    /*
    this.route.params.pipe(user).subscribe(params => {
      user.name
    });
    */
  }



}
