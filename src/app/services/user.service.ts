import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  user = {
    id: null,
    name: '',
    email: '',
    password: '',
    accessToken: '',
    expiresIn: '',
    isConnected: null
  };
}
