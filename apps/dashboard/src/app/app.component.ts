import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {distinctUntilChanged} from 'rxjs';

import {UserService} from '@mfa/data-access-user';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterOutlet
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  #userService = inject(UserService);
  #router = inject(Router);

  isLoggedIn$ = this.#userService.isUserLoggedIn$;

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.#router.navigateByUrl('login');
          } else {
            this.#router.navigateByUrl('');
          }
        });
      });
  }
}
