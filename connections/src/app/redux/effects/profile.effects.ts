import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import * as profileActions from '../actions/profile.actions';
import { selectProfile } from '../reducers/profile.reducers';
import { loadProfileError } from '../actions/profile.actions';
import { NotificationService } from '../../components/UI/notification/notification.service';

export const loadProfile$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(profileActions.loadProfile),
      switchMap(() =>
        store.select(selectProfile).pipe(
          take(1),
          map((profile) => {
            if (profile.uid.S)
              return profileActions.loadProfileSuccess({ profile });
            return profileActions.loadProfileFromServer();
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadProfileFromServer$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(profileActions.loadProfileFromServer),
      switchMap(() =>
        apiService.getProfile().pipe(
          map((profile) => profileActions.loadProfileSuccess({ profile })),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                profileActions.loadProfileError({
                  message: 'No internet connection',
                })
              );
            return of(
              profileActions.loadProfileError({ message: error.message })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadProfileError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(profileActions.loadProfileError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);
