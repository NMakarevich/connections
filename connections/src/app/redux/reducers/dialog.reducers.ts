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
            [dialogId]: { Count: 0, Items: [], refreshTime: 0 },
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
      if (dialog.Count === 0) return state;
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [dialogId]: {
            ...state.dialogs[dialogId],
            Count: dialog.Count,
            Items: [...state.dialogs[dialogId]?.Items, ...dialog.Items],
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
  )
);

export const selectDialogState = createFeatureSelector<DialogState>('dialog');

export const selectDialogs = createSelector(
  selectDialogState,
  (state) => state.dialogs
);
