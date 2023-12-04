import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as profileActions from '../actions/profile.actions';
import { logoutSuccess } from '../actions/auth.actions';

export interface ProfileState {
  uid: { S: string };
  email: { S: string };
  name: { S: string };
  createdAt: { S: string };
}

export const initialState: ProfileState = {
  uid: { S: '' },
  email: { S: '' },
  name: { S: '' },
  createdAt: { S: '' },
};

export const profileReducers = createReducer(
  initialState,
  on(
    profileActions.loadProfileSuccess,
    (state, { profile }): ProfileState => ({
      ...state,
      ...profile,
    })
  on(
    logoutSuccess,
    (state): ProfileState => ({
      ...state,
      ...initialState,
    })
  )
);

export const selectProfile = createFeatureSelector<ProfileState>('profile');
