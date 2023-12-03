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
