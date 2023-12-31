import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { DialogModel } from '../../models/dialog.model';
import * as dialogActions from '../actions/group-dialog.actions';
import { REFRESH_TIME } from '../../utils/consts';
import { forceLogout, logoutSuccess } from '../actions/auth.actions';

export interface DialogState {
  dialogs: {
    [id: string]: DialogModel;
  };
}

export const initialState: DialogState = {
  dialogs: {},
};

export const dialogReducers = createReducer(
  initialState,
  on(
    dialogActions.loadDialogSuccess,
    (state, { dialog, dialogId }): DialogState => {
      if (dialog.Count === 0)
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [dialogId]: {
              Count: 0,
              Items: [],
              refreshTime: 0,
              since: new Date().getTime(),
            },
          },
        };
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [dialogId]: {
            Count: dialog.Count,
            Items: dialog.Items,
            refreshTime: 0,
            since: Math.max(
              ...dialog.Items.map((message) =>
                parseInt(message.createdAt.S, 10)
              )
            ),
          },
        },
      };
    }
  ),
  on(dialogActions.refreshDialog, (state, { dialogId }): DialogState => {
    const time = new Date().getTime() + REFRESH_TIME;
    return {
      ...state,
      dialogs: {
        ...state.dialogs,
        [dialogId]: { ...state.dialogs[dialogId], refreshTime: time },
      },
    };
  }),
  on(
    dialogActions.updateDialogSuccess,
    (state, { dialog, dialogId }): DialogState => {
      if (dialog.Count === 0)
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [dialogId]: {
              ...state.dialogs[dialogId],
              since: new Date().getTime(),
            },
          },
        };
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [dialogId]: {
            ...state.dialogs[dialogId],
            Count: dialog.Count + state.dialogs[dialogId].Count,
            Items: [...state.dialogs[dialogId].Items, ...dialog.Items],
            since: Math.max(
              ...dialog.Items.map((message) =>
                parseInt(message.createdAt.S, 10)
              )
            ),
          },
        },
      };
    }
  ),
  on(
    dialogActions.resetDialogTimer,
    (state, { dialogId }): DialogState => ({
      ...state,
      dialogs: {
        ...state.dialogs,
        [dialogId]: { ...state.dialogs[dialogId], refreshTime: 0 },
      },
    })
  ),
  on(
    logoutSuccess,
    forceLogout,
    (): DialogState => ({
      ...initialState,
    })
  )
);

export const selectDialogState = createFeatureSelector<DialogState>('dialog');

export const selectDialogs = createSelector(
  selectDialogState,
  (state) => state.dialogs
);
