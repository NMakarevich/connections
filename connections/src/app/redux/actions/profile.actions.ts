import { createAction, props } from '@ngrx/store';
import { ProfileModel } from '../../models/profile.model';

export const loadProfile = createAction('[Profile] Load profile data');

export const loadProfileFromServer = createAction(
  '[Profile] Load profile data from server'
);

export const loadProfileSuccess = createAction(
  '[Profile] Profile loading success',
  props<{ profile: ProfileModel }>()
);

export const loadProfileError = createAction(
  '[Profile] Profile loading error',
  props<{ message: string }>()
);

export const updateProfile = createAction(
  '[Profile] Update profile name',
  props<{ name: string }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update profile success',
  props<{ name: string }>()
);

export const updateProfileError = createAction(
  '[Profile] Update profile error',
  props<{ message: string }>()
);
