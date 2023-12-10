import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { DialogMessage, DialogModel } from '../../models/dialog.model';
import * as dialogActions from '../actions/group-dialog.actions';
import { REFRESH_TIME, UID } from '../../utils/consts';

export interface DialogState {
  dialogs: {
    [id: string]: DialogModel;
  };
  refreshTime: number;
}

export const initialState: DialogState = {
  dialogs: {},
  refreshTime: 0,
};

export const dialogReducers = createReducer(
  initialState,
  on(
    dialogActions.loadDialogSuccess,
    (state, { dialog, dialogId }): DialogState => {
      if (dialog.Count === 0) return state;
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [dialogId]: { Count: dialog.Count, Items: dialog.Items },
        },
      };
    }
  ),
  on(dialogActions.updateDialog, (state): DialogState => {
    const time = new Date().getTime() + REFRESH_TIME;
    return { ...state, refreshTime: time };
  }),
  on(
    dialogActions.updateDialogSuccess,
    (state, { dialog, dialogId }): DialogState => {
      if (dialog.Count === 0) return state;
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [dialogId]: {
            Count: dialog.Count,
            Items: [...state.dialogs[dialogId].Items, ...dialog.Items],
          },
        },
        refreshTime: new Date().getTime() + REFRESH_TIME,
      };
    }
  ),
  on(
    dialogActions.resetDialogTimer,
    (state): DialogState => ({ ...state, refreshTime: 0 })
  ),
  on(
    dialogActions.postDialogMessageSuccess,
    (state, { message, groupId }): DialogState => {
      const authorId = localStorage.getItem(UID);
      if (!authorId) return state;
      const createdAt = new Date().getTime().toString();
      const newMessage: DialogMessage = {
        authorID: { S: authorId },
        message: { S: message },
        createdAt: { S: createdAt },
      };
      if (state.dialogs[groupId]) {
        const count = state.dialogs[groupId]?.Items.length || 0;
        const items = state.dialogs[groupId]?.Items || [];
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [groupId]: {
              Count: count + 1,
              Items: [...items, newMessage],
            },
          },
        };
      }
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [groupId]: { Count: 1, Items: [newMessage] },
        },
      };
    }
  )
);

export const selectDialogState = createFeatureSelector<DialogState>('dialog');

export const selectDialogs = createSelector(
  selectDialogState,
  (state) => state.dialogs
);

export const selectDialogRefreshTime = createSelector(
  selectDialogState,
  (state) => state.refreshTime
);
