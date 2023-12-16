import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { DialogModel } from '../../models/dialog.model';
import * as conversationActions from '../actions/conversation-dialog.actions';
import { REFRESH_TIME } from '../../utils/consts';

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
            [conversationId]: { Count: 0, Items: [], refreshTime: 0 },
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
          },
        },
      };
    }
  ),
  on(
    conversationActions.refreshConversation,
    (state, { conversationId }): ConversationState => {
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [conversationId]: {
            ...state.dialogs[conversationId],
          },
        },
      };
    }
  ),
  on(
    conversationActions.updateConversationSuccess,
    (state, { conversation, conversationId }): ConversationState => {
      if (conversation.Count === 0) return state;
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [conversationId]: {
            ...state.dialogs[conversationId],
            Count: conversation.Count,
            Items: [
              ...state.dialogs[conversationId].Items,
              ...conversation.Items,
            ],
          },
        },
      };
    }
  ),
  on(
    conversationActions.setConversationTimer,
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
    conversationActions.resetConversationTimer,
    (state, { conversationId }): ConversationState => ({
      ...state,
      dialogs: {
        ...state.dialogs,
        [conversationId]: { ...state.dialogs[conversationId], refreshTime: 0 },
      },
    })
  )
);

export const selectConversationState =
  createFeatureSelector<ConversationState>('conversation');

export const selectConversations = createSelector(
  selectConversationState,
  (state) => state.dialogs
);
