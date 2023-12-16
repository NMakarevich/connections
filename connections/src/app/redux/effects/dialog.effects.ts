import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as dialogActions from '../actions/group-dialog.actions';
import { selectDialogs } from '../reducers/dialog.reducers';
import { NotificationService } from '../../components/UI/notification/notification.service';
import { deleteGroupSuccess } from '../actions/group.actions';
import { ModalService } from '../../services/modal.service';
import { forceLogout } from '../actions/auth.actions';

export const loadDialog$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(dialogActions.loadDialog),
      switchMap(({ dialogId }) =>
        store.select(selectDialogs).pipe(
          take(1),
          map((dialogs) => {
            if (dialogs[dialogId])
              return dialogActions.updateDialog({ dialogId });
            return dialogActions.loadDialogFromServer({ dialogId });
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadDialogFromServer$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(dialogActions.loadDialogFromServer),
      switchMap(({ dialogId }) =>
        apiService.loadGroupMessages(dialogId).pipe(
          map((dialog) =>
            dialogActions.loadDialogSuccess({ dialog, dialogId })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                dialogActions.loadDialogError({
                  message: 'No internet connection',
                })
              );
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(
              dialogActions.loadDialogError({ message: error.message })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadDialogError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.loadDialogError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const loadDialogSuccess = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.loadDialogSuccess),
      tap(() =>
        notificationService.showNotification({
          message: 'Load dialog success',
          type: 'success',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const updateDialog$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.updateDialog, dialogActions.refreshDialog),
      switchMap(({ dialogId }) =>
        store.select(selectDialogs).pipe(
          take(1),
          map((dialogs) => {
            const dialog = dialogs[dialogId];
            const latestMessageTime = dialog
              ? Math.max(
                  ...dialog.Items.map((message) =>
                    parseInt(message.createdAt.S, 10)
                  )
                ).toString()
              : '0';
            return {
              dialogId,
              since: latestMessageTime,
            };
          })
        )
      ),
      switchMap(({ dialogId, since }) =>
        apiService.loadGroupMessages(dialogId, since).pipe(
          map((dialog) =>
            dialogActions.updateDialogSuccess({ dialog, dialogId })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                dialogActions.updateDialogError({
                  message: 'No internet connection',
                  dialogId,
                })
              );
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(
              dialogActions.updateDialogError({
                message: error.message,
                dialogId,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const updateDialogSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.updateDialogSuccess),
      tap(() => {
        notificationService.showNotification({
          message: 'Dialog updated',
          type: 'success',
        });
      })
    );
  },
  { functional: true, dispatch: false }
);

export const updateDialogError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.updateDialogError),
      tap(({ message, dialogId }) => {
        notificationService.showNotification({
          message,
          type: 'error',
        });
        store.dispatch(dialogActions.resetDialogTimer({ dialogId }));
      })
    );
  },
  { functional: true, dispatch: false }
);

export const postMessageToDialog$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(dialogActions.postDialogMessage),
      switchMap(({ message, dialogId }) =>
        apiService.postMessageToDialog(dialogId, message).pipe(
          map(() => dialogActions.postDialogMessageSuccess({ dialogId })),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                dialogActions.postDialogMessageError({
                  message: 'No internet connection',
                })
              );
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(
              dialogActions.postDialogMessageError({ message: error.message })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const postMessageToDialogSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.postDialogMessageSuccess),
      map(({ dialogId }) => {
        notificationService.showNotification({
          message: 'Message posted successful',
          type: 'success',
        });
        return dialogActions.updateDialog({ dialogId });
      })
    );
  },
  { functional: true }
);

export const postMessageToDialogError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(dialogActions.postDialogMessageError),
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

export const deleteDialog$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    modalService = inject(ModalService)
  ) => {
    return actions$.pipe(
      ofType(deleteGroupSuccess),
      tap(() => {
        modalService.close();
        router.navigate(['/']);
      })
    );
  },
  { functional: true, dispatch: false }
);
