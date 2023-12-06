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
import { profileReducers } from './redux/reducers/profile.reducers';
import * as profileEffects from './redux/effects/profile.effects';
import { groupsReducers } from './redux/reducers/group.reducers';
import * as groupsEffects from './redux/effects/group.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpInterceptor])
    ),
    provideStore({
      auth: authReducers,
      profile: profileReducers,
      groups: groupsReducers,
    }),
    provideEffects([authEffects, profileEffects, groupsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
