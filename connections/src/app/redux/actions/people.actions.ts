import { createAction, props } from '@ngrx/store';
import {
  ConversationList,
  ConversationItem,
  PeopleList,
} from '../../models/people.model';

export const loadPeopleList = createAction('[People] Load people list');

export const loadPeopleListFromServer = createAction(
  '[People] Load people list from server'
);

export const loadPeopleListSuccess = createAction(
  '[People] Load people list success',
  props<{ peopleList: PeopleList }>()
);

export const loadPeopleListError = createAction(
  '[People] Load people list error',
  props<{ message: string }>()
);

export const loadConversationList = createAction(
  '[People] Load conversation list'
);

export const loadConversationListFromServer = createAction(
  '[People] Load conversation list'
);

export const loadConversationListSuccess = createAction(
  '[People] Load conversation list success',
  props<{ conversationList: ConversationList }>()
);

export const loadConversationListEarly = createAction(
  '[People] Conversation list was loaded early'
);

export const loadConversationListError = createAction(
  '[People] Load conversation list error',
  props<{ message: string }>()
);

export const refreshPeopleList = createAction('[People] Refresh people list');

export const resetPeopleTimer = createAction('[People] Reset people timer');

export const createConversation = createAction(
  '[People] Create conversation',
  props<{ companion: string }>()
);

export const createConversationSuccess = createAction(
  '[People] Conversation created successful',
  props<{ conversation: ConversationItem }>()
);

export const createConversationError = createAction(
  '[People] Create conversation error',
  props<{ message: string }>()
);
