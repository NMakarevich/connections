import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as authActions from '../actions/auth.actions';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../components/UI/notification/notification.service';

export const signup = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ user }) =>
        apiService.signUp(user).pipe(
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

export const alertError = createEffect(
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

export const signupSuccess = createEffect(
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
