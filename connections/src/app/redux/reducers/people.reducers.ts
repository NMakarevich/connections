import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  ConversationItem,
  ConversationObject,
  PeopleList,
  PeopleListWithConversations,
} from '../../models/people.model';
import * as peopleActions from '../actions/people.actions';
import { REFRESH_TIME } from '../../utils/consts';

export interface PeopleState {
  peopleList: PeopleList;
  conversations: ConversationObject;
  refreshTime: number;
  dataLoaded: boolean;
}

export const initialState: PeopleState = {
  peopleList: {
    Count: 0,
    Items: [],
  },
  conversations: {
    Count: 0,
    source: {},
  },
  refreshTime: 0,
  dataLoaded: false,
};

export const peopleReducers = createReducer(
  initialState,
  on(
    peopleActions.loadPeopleListSuccess,
    (state, { peopleList }): PeopleState => ({
      ...state,
      peopleList: {
        Count: peopleList.Count,
        Items: peopleList.Items.map((item) => ({
          ...item,
          hasConversation: false,
        })),
      },
    })
  ),
  on(
    peopleActions.loadConversationListSuccess,
    (state, { conversationList }): PeopleState => {
      const conversationsObject: { [id: string]: ConversationItem } =
        conversationList.Items.reduce(
          (result, conversation) => ({
            ...result,
            [conversation.companionID.S]: conversation,
          }),
          {}
        );
      return {
        ...state,
        conversations: {
          Count: conversationList.Count,
          source: { ...conversationsObject },
        },
        dataLoaded: true,
      };
    }
  ),
  on(
    peopleActions.createConversationSuccess,
    (state, { conversation }): PeopleState => ({
      ...state,
      conversations: {
        Count: state.conversations.Count + 1,
        source: {
          ...state.conversations.source,
          [conversation.companionID.S]: conversation,
        },
      },
    })
  ),
  on(
    peopleActions.refreshPeopleList,
    (state): PeopleState => ({
      ...state,
      refreshTime: new Date().getTime() + REFRESH_TIME,
    })
  ),
  on(
    peopleActions.resetPeopleTimer,
    (state): PeopleState => ({
      ...state,
      refreshTime: 0,
    })
  )
);

export const selectPeopleState = createFeatureSelector<PeopleState>('people');

export const selectPeopleList = createSelector(selectPeopleState, (state) => {
  if (!state.dataLoaded)
    return { peopleList: state.peopleList.Items, conversations: {} };
  const peopleList = state.peopleList.Items;
  const conversations = state.conversations.source;
  const result: PeopleListWithConversations = { peopleList, conversations };
  return result;
});

export const selectPeopleRefreshTime = createSelector(
  selectPeopleState,
  (state) => state.refreshTime
);

export const selectDataLoaded = createSelector(
  selectPeopleState,
  (state) => state.dataLoaded
);

export const selectPeopleSource = createSelector(selectPeopleState, (state) =>
  state.peopleList.Items.reduce(
    (result, user) => ({ ...result, [user.uid.S]: user }),
    {}
  )
);
