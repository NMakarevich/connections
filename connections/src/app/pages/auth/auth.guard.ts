import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TOKEN } from '../../utils/consts';

export const authGuard: CanActivateFn = () => {
  return localStorage.getItem(TOKEN)
    ? true
    : inject(Router).createUrlTree(['signin']);
};
