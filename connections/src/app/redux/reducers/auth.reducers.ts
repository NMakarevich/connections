import { createReducer } from '@ngrx/store';
import { EMAIL, TOKEN, UID } from '../../utils/consts';

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
