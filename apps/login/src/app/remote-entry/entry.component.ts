import {Component, inject} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserService} from '@mfa/data-access-user';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FormsModule
  ],
  selector: 'app-login-entry',
  template: `
    <div class="login-app">
      <form class="login-form" (ngSubmit)="login()">
        <label>
          User name:
          <input type="text" name="userName" [(ngModel)]="userName" />
        </label>
        <label>
          Password:
          <input type="password" name="password" [(ngModel)]="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <div *ngIf="isLoggedIn$ | async">
        User is logged in!
      </div>
    </div>
  `,
  styles: [
    `
      .login-app {
        width: 30vw;
        border: 2px dashed black;
        padding: 8px;
        margin: 0 auto;
      }
      .login-form {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 8px;
      }
      label {
        display: block;
      }
    `
  ]
})
export class RemoteEntryComponent {

  #userService = inject(UserService)

  userName = '';
  password = '';
  isLoggedIn$ = this.#userService.isUserLoggedIn$;

  login() {
    this.#userService.checkCredentials(this.userName, this.password);
  }
}
