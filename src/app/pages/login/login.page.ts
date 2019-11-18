import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router,
    private storage: Storage,
    public userService: UserService,
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
  user = this.userService.user;

  ngOnInit() {} // fonction exécutée à l'initialisation de la page.

  loginButton(email: any, password: any) {

    email = this.loginForm.value.email;
    password = this.loginForm.value.password;
    const userForm = [email, password];


    return new Promise(() => {
      this.http.post('http://localhost:8080/login', userForm).subscribe((data: any) => {
        console.log('1');
        console.log(data);
        console.log('2');
        console.log(data.userServer);


        this.storage.set('ACCESS_TOKEN', data.access_token); // mais comment lire le token storé ?

        this.user.id = data.userServer.id;
        this.user.name = data.userServer.name;
        this.user.email = data.userServer.email;
        this.user.password = data.userServer.password;
        this.user.accessToken = data.access_token;
        this.user.expiresIn = data.expires_in;

        // this.navCtrl.push(HomePage, {user: name});  // dépressié
        // this.router.navigateByUrl(`home`); // OK

      },
      (err) => {
        this.errStatus = 'Status du serveur : ' + err.status;
      });
    });
  }
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

/* // voir https://devdactic.com/ionic-4-login-angular/
  checkToken() {
    this.storage.get(ACCESS_TOKEN).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login() {
    return this.storage.set(ACCESS_TOKEN, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(ACCESS_TOKEN).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
*/

