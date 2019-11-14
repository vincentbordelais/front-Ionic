import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { resolve } from 'url';


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
    private  router: Router,
    // private  authService: AuthService,
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

  errStatus = '';

  ngOnInit() { }

  loginButton(email: any, password: any) {

      email = this.loginForm.value.email;
      password = this.loginForm.value.password;
      const user = [email, password];


      //console.log(user);
      // console.log(1);
      /*
      this.http.post('http://localhost:8080/login', user).subscribe(
        (data: any) => {
          console.log(data);
        },
        (err) => console.log(err),
        // () => { console.log("error") }
        );
        // console.log(HttpErrorResponse.headers.status);
        // HttpErrorResponse {headers: HttpHeaders, status: 404,
      */

      return new Promise(() => {
        this.http.post('http://localhost:8080/login', user).subscribe((data: any) => {
          console.log(data);
          this.router.navigateByUrl(`home`);
        },

        (err) => {
          this.errStatus = 'Status du serveur : ' + err.status;
          // console.log('Erreur statut :', this.errStatus);
        });
      });



    // Infos du user venant du serveur :
      // this.authService.login(user).subscribe(data => {
      // console.log(user);
      // console.log(2);
      // console.log(form.value);
      // console.log(data);
      // this.router.navigateByUrl(`home`);

      /*
      saveUser() {
        console.log(this.newUser.email);
        if (undefined !== this.newUser.email) {
          // Ajout de la tâche dans le tableau :
          this.users.push(this.newUser);
          // Création d'une nouvelle tâche :
          this.newUser = new User();
        }
      }

    });
*/
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
