import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #isUserLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn$ = this.#isUserLoggedIn.asObservable();

  checkCredentials(userName: string, password: string): void {
    if (userName === 'demo' && password === 'demo') {
      this.#isUserLoggedIn.next(true);
    }
  }

  logout(): void {
    this.#isUserLoggedIn.next(false);
  }

}
