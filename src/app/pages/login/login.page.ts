import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
// import { User } from '../../auth/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;

  errorMessages = {
    email: [
      {type: 'required', message: 'Le champs Email est requis.'},
      {type: 'minlength', message: 'Votre email doit contenir au moins 6 caractères.'},
      {type: 'maxlength', message: 'Votre email ne doit contenir plus de 50 caractères.'},
      {type: 'pattern', message: 'Merci de saisir un email valide.' }
    ],
    password: [
      {type: 'required', message: 'Le champs Mot de passe est requis.'},
      {type: 'minlength', message: 'Votre mot de passe doit contenir au moins 6 caractères.'},
      {type: 'maxlength', message: 'Votre mot de passe ne doit contenir plus de 30 caractères.'},
      {type: 'pattern', message: 'Votre mot de passe doit contenir au moins 1 nombre, 1 minuscule et 1 majuscule.'}
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    private  authService: AuthService,
    private  router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }

  ngOnInit() { }

  loginButton(email: any, password: any) {
    email = this.loginForm.value.email;
    password = this.loginForm.value.password;
    const emailPassword = [email, password];
    // console.log(user);

    /*
    this.http.post('http://localhost:8080/login', user).subscribe(data => {
     console.log(data);
    });
    */

    this.authService.login(emailPassword).subscribe(data => {
      console.log(data);
      // this.router.navigateByUrl(`home`);

      /*
      saveUser() {
        console.log(this.newUser.email);
        if (undefined !== this.newUser.email) {
          // Ajout de la tâche dans le tableau :
          this.users.push(this.newUser);
          // Création d'une nouvelle tâche :
          this.newUser = new User();
        }
      }
      */
    });


  }
  /*
  // test session :
this.auth.isLoggedIn().subscribe((state: any) => { // The isLoggedIn() method returns an Observable so you need to subscribe to it
  if (state) {
    console.log('Logged IN');
  } else {
    console.log('Logged OUT');
  }
});
*/
}
