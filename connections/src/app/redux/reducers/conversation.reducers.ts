import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { DialogModel } from '../../models/dialog.model';
import * as conversationActions from '../actions/conversation-dialog.actions';
import { REFRESH_TIME } from '../../utils/consts';
import { forceLogout, logoutSuccess } from '../actions/auth.actions';

export interface ConversationState {
  dialogs: {
    [id: string]: DialogModel;
  };
}

export const initialState: ConversationState = {
  dialogs: {},
};

export const conversationReducers = createReducer(
  initialState,
  on(
    conversationActions.loadConversationSuccess,
    (state, { conversation, conversationId }): ConversationState => {
      if (conversation.Count === 0)
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [conversationId]: {
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
          [conversationId]: {
            Count: conversation.Count,
            Items: conversation.Items,
            refreshTime: 0,
            since: Math.max(
              ...conversation.Items.map((message) =>
                parseInt(message.createdAt.S, 10)
              )
            ),
          },
        },
      };
    }
  ),
  on(
    conversationActions.refreshConversation,
    (state, { conversationId }): ConversationState => {
      const time = new Date().getTime() + REFRESH_TIME;
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [conversationId]: {
            ...state.dialogs[conversationId],
            refreshTime: time,
          },
        },
      };
    }
  ),
  on(
    conversationActions.updateConversationSuccess,
    (state, { conversation, conversationId }): ConversationState => {
      if (conversation.Count === 0)
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [conversationId]: {
              ...state.dialogs[conversationId],
              since: new Date().getTime(),
            },
          },
        };
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [conversationId]: {
            ...state.dialogs[conversationId],
            Count: conversation.Count + state.dialogs[conversationId].Count,
            Items: [
              ...state.dialogs[conversationId].Items,
              ...conversation.Items,
            ],
            since: Math.max(
              ...conversation.Items.map((message) =>
                parseInt(message.createdAt.S, 10)
              )
            ),
          },
        },
      };
    }
  ),
  on(
    conversationActions.resetConversationTimer,
    (state, { conversationId }): ConversationState => ({
      ...state,
      dialogs: {
        ...state.dialogs,
        [conversationId]: { ...state.dialogs[conversationId], refreshTime: 0 },
      },
    })
  ),
  on(
    logoutSuccess,
    forceLogout,
    (): ConversationState => ({
      ...initialState,
    })
  )
);

export const selectConversationState =
  createFeatureSelector<ConversationState>('conversation');

export const selectConversations = createSelector(
  selectConversationState,
  (state) => state.dialogs
);
