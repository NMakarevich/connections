import { createAction, props } from '@ngrx/store';
import { DialogModel } from '../../models/dialog.model';

export const loadDialog = createAction(
  '[Dialog] Load dialog',
  props<{ dialogId: string }>()
);

export const loadDialogFromServer = createAction(
  '[Dialog] Load dialog from server',
  props<{ dialogId: string }>()
);

export const loadDialogSuccess = createAction(
  '[Dialog] Load dialog success',
  props<{ dialog: DialogModel; dialogId: string }>()
);

export const loadDialogError = createAction(
  '[Dialog] Load dialog error',
  props<{ message: string }>()
);

export const updateDialog = createAction(
  '[Dialog] Update dialog',
  props<{ dialogId: string }>()
);

export const updateDialogSuccess = createAction(
  '[Dialog] Update dialog success',
  props<{ dialog: DialogModel; dialogId: string }>()
);

export const updateDialogError = createAction(
  '[Dialog] Load dialog error',
  props<{ message: string }>()
);

export const refreshDialog = createAction(
  '[Dialog] Refresh dialog',
  props<{ dialogId: string }>()
);

export const resetDialogTimer = createAction(
  '[Dialog] Reset dialog timer',
  props<{ dialogId: string }>()
);

export const postDialogMessage = createAction(
  '[Dialog] Post new message',
  props<{ message: string; groupId: string }>()
);

export const postDialogMessageSuccess = createAction(
  '[Dialog] Message posted',
  props<{ groupId: string }>()
);

export const postDialogMessageError = createAction(
  '[Dialog] Post dialog error',
  props<{ message: string }>()
);
