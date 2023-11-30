import { createAction, props } from '@ngrx/store';
import { SignUpModel } from '../../models/auth.model';

export const signup = createAction(
  '[Auth] Registry new user',
  props<{ user: SignUpModel }>()
);

export const signupSuccess = createAction('[Auth] Signup successful');

export const signupError = createAction(
  '[Auth] Signup error',
  props<{ message: string }>()
);
