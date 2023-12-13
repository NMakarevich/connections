import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TOKEN } from '../../utils/consts';

export const authGuard: CanActivateFn = () => {
  const isAuth = localStorage.getItem(TOKEN);
  return isAuth ? true : inject(Router).createUrlTree(['signin']);
};

export const matchGuard: CanMatchFn = () => {
  const isAuth = localStorage.getItem(TOKEN);
  return !isAuth ? true : inject(Router).navigate(['']);
};
