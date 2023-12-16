import { createAction, props } from '@ngrx/store';
import { DialogModel } from '../../models/dialog.model';

export const loadConversation = createAction(
  '[Conversation] Load conversation',
  props<{ conversationId: string }>()
);

export const loadConversationFromServer = createAction(
  '[Conversation] Load conversation from server',
  props<{ conversationId: string }>()
);

export const loadConversationSuccess = createAction(
  '[Conversation] Load conversation success',
  props<{ conversation: DialogModel; conversationId: string }>()
);

export const loadConversationError = createAction(
  '[Conversation] Load conversation error',
  props<{ message: string }>()
);

export const updateConversation = createAction(
  '[Conversation] Update conversation',
  props<{ conversationId: string }>()
);

export const updateConversationSuccess = createAction(
  '[Conversation] Update conversation success',
  props<{ conversation: DialogModel; conversationId: string }>()
);

export const updateConversationError = createAction(
  '[Conversation] Load conversation error',
  props<{ message: string }>()
);

export const refreshConversation = createAction(
  '[Conversation] Refresh conversation',
  props<{ conversationId: string }>()
);

export const setConversationTimer = createAction(
  '[Conversation] Set dialog timer',
  props<{ conversationId: string }>()
);

export const resetConversationTimer = createAction(
  '[Conversation] Reset conversation timer',
  props<{ conversationId: string }>()
);

export const postConversationMessage = createAction(
  '[Conversation] Post new message',
  props<{ message: string; conversationId: string }>()
);

export const postConversationMessageSuccess = createAction(
  '[Conversation] Message posted',
  props<{ conversationId: string }>()
);

export const postConversationMessageError = createAction(
  '[Conversation] Post conversation error',
  props<{ message: string }>()
);

export const deleteConversation = createAction(
  '[Group] Delete conversation',
  props<{ id: string }>()
);

export const deleteConversationSuccess = createAction(
  '[Group] Delete conversation success',
  props<{ id: string }>()
);

export const deleteConversationError = createAction(
  '[Group] Delete conversation error',
  props<{ message: string }>()
);
