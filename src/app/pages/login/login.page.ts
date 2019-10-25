import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { freemem } from 'os';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {} // J'injecte le client HTTP dans le constructeur
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  constructor(public http: HttpClient) { }
  ngOnInit() { }
  email: any;
  password: any;



  loginButton(email: any, password: any) {
    email = this.email;
    password = this.password;
    const user = [email, password];
    // console.log(user);



    this.http.post('http://localhost:8080/login', user).subscribe(data => {
      console.log(data);
    });
  }
}
