import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  AUTH_SERVER_ADDRESS = 'http://localhost:8080';
  authenticationState = new BehaviorSubject(false);

  // Envoi d'une requête post pour authentifier des utilisateurs :
  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        // console.log(user);
        // Mise en mémoire :
        if (res.user) {
          await this.storage.set('ACCESS_TOKEN', res.user.access_token);
          await this.storage.set('EXPIRES_IN', res.user.expires_in);
          this.authenticationState.next(true);
          /* // Mon test de la mémoire :
          this.storage.get('ACCESS_TOKEN').then((valeur) => {
            console.log('Mon ACCESS_TOKEN contient ', valeur);
          }); */
        }
      })
    );
  }


  // Logging out Users :
  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.authenticationState.next(false);
  }
  // Obtenir l'état d'authentification :
  isLoggedIn() {
    return this.authenticationState.asObservable();
  }
}

