import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string, password: string): boolean {
    // Simulamos la autenticación. Puedes reemplazar esta lógica con llamadas a un servicio de autenticación real.
    if (username === 'usuario' && password === 'contraseña') {
      localStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  logOut() {
    localStorage.removeItem('username');
  }
}
