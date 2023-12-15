import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as peopleActions from '../actions/people.actions';
import { selectPeopleState } from '../reducers/people.reducers';
import { NotificationService } from '../../components/UI/notification/notification.service';
import { ConversationItem } from '../../models/people.model';
import * as groupActions from '../actions/group.actions';
import { loadDialog } from '../actions/group-dialog.actions';
import { forceLogout } from '../actions/auth.actions';

export const loadPeople$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(groupActions.loadMainPage),
      map(() => peopleActions.loadPeopleList())
    );
  },
  { functional: true }
);

export const loadPeopleForDialog$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(loadDialog),
      map(() => peopleActions.loadPeopleList())
    );
  },
  { functional: true }
);

export const loadPeopleList$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(peopleActions.loadPeopleList),
      switchMap(() =>
        store.select(selectPeopleState).pipe(
          take(1),
          map((state) => {
            if (state.dataLoaded)
              return peopleActions.loadPeopleListSuccess({
                peopleList: state.peopleList,
              });
            return peopleActions.loadPeopleListFromServer();
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadPeopleListFromServer$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(peopleActions.loadPeopleListFromServer),
      switchMap(() =>
        apiService.loadPeople().pipe(
          map((peopleList) =>
            peopleActions.loadPeopleListSuccess({ peopleList })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                peopleActions.loadPeopleListError({
                  message: 'No internet connection',
                })
              );
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(
              peopleActions.loadPeopleListError({ message: error.message })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadConversationList$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(peopleActions.loadPeopleList),
      switchMap(() =>
        store.select(selectPeopleState).pipe(
          take(1),
          map((state) => {
            if (state.dataLoaded)
              return peopleActions.loadConversationListEarly();
            return peopleActions.loadConversationListFromServer();
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadConversationsListFromServer$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(
        peopleActions.loadConversationListFromServer,
        peopleActions.refreshPeopleList
      ),
      switchMap(() =>
        apiService.loadConversations().pipe(
          map((conversationList) =>
            peopleActions.loadConversationListSuccess({ conversationList })
          ),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                peopleActions.loadConversationListError({
                  message: 'No internet connection',
                })
              );
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(
              peopleActions.loadConversationListError({
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

export const loadPeopleListSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(peopleActions.loadPeopleListSuccess),
      tap(() => {
        notificationService.showNotification({
          message: 'People list loaded success',
          type: 'success',
        });
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loadConversationListSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(peopleActions.loadConversationListSuccess),
      tap(() =>
        notificationService.showNotification({
          message: 'Conversation list loaded success',
          type: 'success',
        })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const loadPeopleListError = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(peopleActions.loadPeopleListError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const loadConversationListError = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(peopleActions.loadConversationListError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const refreshPeopleList$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(peopleActions.refreshPeopleList),
      switchMap(() => of(peopleActions.loadPeopleListFromServer()))
    );
  },
  { functional: true }
);

export const createConversation$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(peopleActions.createConversation),
      switchMap(({ companion }) =>
        apiService.createConversation(companion).pipe(
          map(({ conversationID }) => {
            const conversation: ConversationItem = {
              companionID: { S: companion },
              id: { S: conversationID },
            };
            return peopleActions.createConversationSuccess({ conversation });
          }),
          catchError(({ error }) => {
            if (!error.status && error instanceof ProgressEvent)
              return of(
                peopleActions.createConversationError({
                  message: 'No internet connection',
                })
              );
            if (error.type === 'InvalidTokenException')
              return of(forceLogout({ message: error.message }));
            return of(
              peopleActions.createConversationError({
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

export const createConversationSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(peopleActions.createConversationSuccess),
      tap(({ conversation }) => {
        notificationService.showNotification({
          message: 'Conversation create success',
          type: 'success',
        });
        router.navigate(['conversation', conversation.id.S]);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const createConversationError$ = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(peopleActions.createConversationError),
      tap(({ message }) =>
        notificationService.showNotification({ message, type: 'error' })
      )
    );
  },
  { functional: true, dispatch: false }
);
