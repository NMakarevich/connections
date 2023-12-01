import { createAction, props } from '@ngrx/store';
import {
  SignInModel,
  SignInResponseModel,
  SignUpModel,
} from '../../models/auth.model';

export const signup = createAction(
  '[Auth] Registry new user',
  props<{ user: SignUpModel }>()
);

export const signupSuccess = createAction('[Auth] Signup successful');

export const signupError = createAction(
  '[Auth] Signup error',
  props<{ message: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ user: SignInModel }>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ response: SignInResponseModel }>()
);

export const loginError = createAction(
  '[Auth] Login error',
  props<{ message: string }>()
);