import { HttpInterceptorFn } from '@angular/common/http';
import { BASE_URL, EMAIL, TOKEN, UID } from './utils/consts';

const skipHeaders = ['login', 'registration'];

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!skipHeaders.includes(req.url))
    return next(
      req.clone({
        url: `${BASE_URL}/${req.url}`,
        headers: req.headers
          .set(TOKEN, `Bearer ${localStorage.getItem(TOKEN)}`)
          .set(UID, `${localStorage.getItem(UID)}`)
          .set(EMAIL, `${localStorage.getItem(EMAIL)}`),
      })
    );
  return next(req.clone({ url: `${BASE_URL}/${req.url}` }));
};
