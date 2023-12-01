import { createReducer, on } from '@ngrx/store';
import { EMAIL, TOKEN, UID } from '../../utils/consts';
import * as authActions from '../actions/auth.actions';

interface AuthState {
  isAuth: boolean;
  token: string;
  rsUid: string;
  rsEmail: string;
}

export const initialState: AuthState = {
  isAuth: !!(
    localStorage.getItem(TOKEN) &&
    localStorage.getItem(UID) &&
    localStorage.getItem(EMAIL)
  ),
  token: localStorage.getItem(TOKEN) || '',
  rsUid: localStorage.getItem(UID) || '',
  rsEmail: localStorage.getItem(EMAIL) || '',
};

export const authReducers = createReducer(initialState);
export const authReducers = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => {
    localStorage.setItem(TOKEN, response.token);
    localStorage.setItem(UID, response.uid);
    return {
      ...state,
      isAuth: true,
      token: response.token,
      rsUid: response.uid,
      rsEmail: `${localStorage.getItem(EMAIL)}`,
    };
  }),
);
