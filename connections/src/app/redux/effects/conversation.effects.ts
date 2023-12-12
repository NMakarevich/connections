import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import * as conversationActions from '../actions/conversation-dialog.actions';
import { selectConversations } from '../reducers/conversation.reducers';
import { NotificationService } from '../../components/UI/notification/notification.service';

export const loadConversation$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(conversationActions.loadConversation),
      switchMap(({ conversationId }) =>
        store.select(selectConversations).pipe(
          take(1),
          map((dialogs) => {
            if (dialogs[conversationId])
              return conversationActions.updateConversation({ conversationId });
            return conversationActions.loadConversationFromServer({
              conversationId,
            });
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadConversationFromServer$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(conversationActions.loadConversationFromServer),
      switchMap(({ conversationId }) =>
        apiService.loadConversationMessages(conversationId).pipe(
          map((conversation) =>
            conversationActions.loadConversationSuccess({
              conversation,
              conversationId,
            })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                conversationActions.loadConversationError({
                  message: 'No internet connection',
                })
              );
            return of(
              conversationActions.loadConversationError({
                message: error.message,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadConversationError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(conversationActions.loadConversationError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const loadConversationSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(conversationActions.loadConversationSuccess),
      tap(() =>
        notificationService.showNotification({
          message: 'Load conversation success',
          type: 'success',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const updateConversation$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(
        conversationActions.updateConversation,
        conversationActions.refreshConversation
      ),
      switchMap(({ conversationId }) =>
        store.select(selectConversations).pipe(
          take(1),
          map((conversations) => {
            const conversation = conversations[conversationId];
            const latestMessageTime = conversation
              ? Math.max(
                  ...conversation.Items.map((message) =>
                    parseInt(message.createdAt.S, 10)
                  )
                ).toString()
              : '0';
            return {
              conversationId,
              since: latestMessageTime,
            };
          })
        )
      ),
      switchMap(({ conversationId, since }) =>
        apiService.loadConversationMessages(conversationId, since).pipe(
          map((conversation) =>
            conversationActions.updateConversationSuccess({
              conversation,
              conversationId,
            })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof PointerEvent)
              return of(
                conversationActions.updateConversationError({
                  message: 'No internet connection',
                })
              );
            return of(
              conversationActions.updateConversationError({
                message: error.message,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const updateConversationSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(conversationActions.updateConversationSuccess),
      tap(() =>
        notificationService.showNotification({
          message: 'Conversation updated',
          type: 'success',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const updateConversationError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(conversationActions.updateConversationError),
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

export const postMessageToConversation$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(conversationActions.postConversationMessage),
      switchMap(({ message, conversationId }) =>
        apiService.postMessageToConversation(conversationId, message).pipe(
          map(() =>
            conversationActions.postConversationMessageSuccess({
              conversationId,
            })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof PointerEvent)
              return of(
                conversationActions.postConversationMessageError({
                  message: 'No internet connection',
                })
              );
            return of(
              conversationActions.postConversationMessageError({
                message: error.message,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const postMessageToConversationSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(conversationActions.postConversationMessageSuccess),
      map(({ conversationId }) => {
        notificationService.showNotification({
          message: 'Message posted successful',
          type: 'success',
        });
        return conversationActions.updateConversation({ conversationId });
      })
    );
  },
  { functional: true }
);

export const postMessageToConversationError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(conversationActions.postConversationMessageError),
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

// export const deleteConversationSuccess$ = createEffect(
//   (actions$ = inject(Actions), router = inject(Router)) => {
//     return actions$.pipe(
//       ofType(del),
//       tap(() => {
//         router.navigate(['/']);
//       })
//     );
//   },
//   { functional: true, dispatch: false }
// );
