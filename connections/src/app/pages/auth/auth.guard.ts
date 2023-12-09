import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TOKEN } from '../../utils/consts';

export const authGuard: CanActivateFn = (route) => {
  const isAuth = localStorage.getItem(TOKEN);
  const authURLs = ['signin', 'signup'];
  const [urlSegment] = route.url;
  if (isAuth && authURLs.includes(urlSegment?.path))
    inject(Router).navigate(['']);
  return isAuth ? true : inject(Router).createUrlTree(['signin']);
};
