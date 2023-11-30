import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { httpInterceptor } from './http.interceptor';
import { routes } from './app.routes';
import { authReducers } from './redux/reducers/auth.reducers';
import * as authEffects from './redux/effects/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpInterceptor])
    ),
    provideStore({ auth: authReducers }),
    provideEffects([authEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
