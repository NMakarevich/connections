import { createAction, props } from '@ngrx/store';
import { GroupItem, GroupsList } from '../../models/group.model';

export const loadGroups = createAction('[Group] Load groups list');

export const loadGroupsFromServer = createAction(
  '[Group] Load groups list from server'
);

export const loadGroupsSuccess = createAction(
  '[Group] Load groups list success',
  props<{ groups: GroupsList }>()
);

export const loadGroupsError = createAction(
  '[Group] Load groups list error',
  props<{ message: string }>()
);

export const refreshGroupsList = createAction('[Group] Refresh groups list');

export const resetTimer = createAction('[Group] Reset refresh timer');

export const createGroup = createAction(
  '[Group] Create new group',
  props<{ name: string }>()
);

export const createGroupSuccess = createAction(
  '[Group] Create new group success',
  props<{ group: GroupItem }>()
);

export const createGroupError = createAction(
  '[Group] Create new group error',
  props<{ message: string }>()
);

export const deleteGroup = createAction(
  '[Group] Delete group',
  props<{ id: string }>()
);

export const deleteGroupSuccess = createAction(
  '[Group] Delete group success',
  props<{ id: string }>()
);

export const deleteGroupError = createAction(
  '[Group] Delete group error',
  props<{ message: string }>()
);
