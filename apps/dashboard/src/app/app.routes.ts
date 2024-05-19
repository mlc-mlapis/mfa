import {Route} from '@angular/router';
import {loadRemoteModule} from '@nx/angular/mf';

import {AppComponent} from './app.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    /**
     * loadChildren: () => import('login/Routes').then((m) => m.remoteRoutes)
     */
    loadChildren: () => loadRemoteModule('login', './Routes').then((m) => m.remoteRoutes)
  },
  {
    path: '',
    component: AppComponent
  }
];
