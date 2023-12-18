import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as authActions from '../actions/auth.actions';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../components/UI/notification/notification.service';
import { EMAIL } from '../../utils/consts';
import { forceLogout } from '../actions/auth.actions';

export const signup$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ user }) =>
        apiService.registration(user).pipe(
          map(() => {
            return authActions.signupSuccess();
          }),
          catchError(({ error }) =>
            of(authActions.signupError({ message: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const signupError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(authActions.signupError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const signupSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.signupSuccess),
      tap(() => {
        notificationService.showNotification({
          message: 'Signup success',
          type: 'success',
        });
        router.navigate(['signin']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const login$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ user }) => {
        localStorage.setItem(EMAIL, user.email);
        return apiService.login(user).pipe(
          map((response) => authActions.loginSuccess({ response })),
          catchError(({ error }) => {
            localStorage.removeItem(EMAIL);
            return of(authActions.loginError({ message: error.message }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const loginSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        notificationService.showNotification({
          message: 'Login success',
          type: 'success',
        });
        router.navigate(['']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(authActions.loginError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() =>
        apiService.logout().pipe(
          map(() => authActions.logoutSuccess()),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent) {
              return of(
                authActions.logoutError({ message: 'No internet connection' })
              );
            }
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(authActions.logoutError({ message: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const logoutSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logoutSuccess),
      tap(() => {
        notificationService.showNotification({
          message: 'Logout success',
          type: 'success',
        });
        router.navigate(['signin']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logoutError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logoutError),
      tap(({ message }) => {
        notificationService.showNotification({ message, type: 'error' });
      })
    );
  },
  { functional: true, dispatch: false }
);

export const forceLogout$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(authActions.forceLogout),
      tap(({ message }) => {
        notificationService.showNotification({
          message,
          type: 'error',
        });
        localStorage.clear();
        router.navigate(['signin']);
      })
    );
  },
  { functional: true, dispatch: false }
);
