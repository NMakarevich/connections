import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as groupActions from '../actions/group.actions';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../components/UI/notification/notification.service';
import { selectGroupsState } from '../reducers/group.reducers';
import { UID } from '../../utils/consts';
import { ModalService } from '../../services/modal.service';
export const loadGroups$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(groupActions.loadMainPage),
      map(() => groupActions.loadGroups())
    );
  },
  { functional: true }
);


export const loadGroupsList$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(groupActions.loadGroups),
      switchMap(() =>
        store.select(selectGroupsState).pipe(
          take(1),
          map((state) => {
            if (state.dataLoaded)
              return groupActions.loadGroupsSuccess({
                groups: state.groupsList,
              });
            return groupActions.loadGroupsFromServer();
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadGroupsListFromServer$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(groupActions.loadGroupsFromServer),
      switchMap(() =>
        apiService.loadGroups().pipe(
          map((groups) => groupActions.loadGroupsSuccess({ groups })),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                groupActions.loadGroupsError({
                  message: 'No internet connection',
                })
              );
            return of(groupActions.loadGroupsError({ message: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const refreshGroupList$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(groupActions.refreshGroupsList),
      switchMap(() => of(groupActions.loadGroupsFromServer()))
    );
  },
  { functional: true }
);

export const loadGroupsSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(groupActions.loadGroupsSuccess),
      tap(() =>
        notificationService.showNotification({
          message: 'Load groups success',
          type: 'success',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const loadGroupsError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(groupActions.loadGroupsError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const createGroup$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(groupActions.createGroup),
      switchMap(({ name }) =>
        apiService.createGroup(name).pipe(
          map((response) => {
            const date = new Date().getTime();
            const userId = `${localStorage.getItem(UID)}`;
            return groupActions.createGroupSuccess({
              group: {
                name: { S: name },
                createdBy: { S: userId },
                createdAt: { S: date.toString() },
                id: { S: response.groupID },
              },
            });
          }),
          catchError(({ error }) =>
            of(groupActions.createGroupError({ message: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createGroupSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService),
    modalService = inject(ModalService)
  ) => {
    return actions$.pipe(
      ofType(groupActions.createGroupSuccess),
      tap(() => {
        modalService.close();
        notificationService.showNotification({
          message: 'Group created success',
          type: 'success',
        });
      })
    );
  },
  { functional: true, dispatch: false }
);

export const createGroupError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(groupActions.createGroupError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const deleteGroup$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(groupActions.deleteGroup),
      switchMap(({ id }) =>
        apiService.deleteGroup(id).pipe(
          map(() => groupActions.deleteGroupSuccess({ id })),
          catchError(({ error }) =>
            of(groupActions.deleteGroupError({ message: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const deleteGroupSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(groupActions.deleteGroupSuccess),
      tap(() =>
        notificationService.showNotification({
          message: 'Group deleted successful',
          type: 'success',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const deleteGroupError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(groupActions.deleteGroupError),
      tap(({ message }) =>
        notificationService.showNotification({
          message,
          type: 'error',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);
