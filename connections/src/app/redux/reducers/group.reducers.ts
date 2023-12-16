import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { GroupsList } from '../../models/group.model';
import * as groupActions from '../actions/group.actions';
import { REFRESH_TIME } from '../../utils/consts';

export interface GroupState {
  groupsList: GroupsList;
  refreshTime: number;
  dataLoaded: boolean;
}

export const initialState: GroupState = {
  groupsList: {
    Count: 0,
    Items: [],
  },
  refreshTime: 0,
  dataLoaded: false,
};

export const groupsReducers = createReducer(
  initialState,
  on(groupActions.loadGroupsSuccess, (state, { groups }): GroupState => {
    return {
      ...state,
      groupsList: {
        ...state.groupsList,
        Count: groups.Count,
        Items: [...groups.Items],
      },
      dataLoaded: true,
    };
  }),
  on(groupActions.createGroupSuccess, (state, { group }): GroupState => {
    return {
      ...state,
      groupsList: {
        Count: state.groupsList.Count + 1,
        Items: [...state.groupsList.Items, group],
      },
    };
  }),
  on(groupActions.deleteGroupSuccess, (state, { id }): GroupState => {
    return {
      ...state,
      groupsList: {
        Count: state.groupsList.Count - 1,
        Items: state.groupsList.Items.filter((item) => item.id.S !== id),
      },
    };
  }),
  on(groupActions.refreshGroupsList, (state): GroupState => {
    const time = new Date().getTime() + REFRESH_TIME;
    return { ...state, refreshTime: time };
  }),
  on(
    groupActions.loadGroupsError,
    (state): GroupState => ({
      ...state,
      refreshTime: 0,
    })
  ),
  on(
    groupActions.resetGroupTimer,
    (state): GroupState => ({
      ...state,
      refreshTime: 0,
    })
  )
);

export const selectGroupsState = createFeatureSelector<GroupState>('groups');

export const selectGroupsList = createSelector(
  selectGroupsState,
  (state) => state.groupsList.Items
);

export const selectGroupRefreshTime = createSelector(
  selectGroupsState,
  (state) => {
    return state.refreshTime;
  }
);
