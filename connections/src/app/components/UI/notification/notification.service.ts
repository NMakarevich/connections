import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification$ = new BehaviorSubject<Notification | null>(null);

  showNotification(notification: Notification) {
    this.notification$.next(notification);
    setTimeout(() => this.notification$.next(null), 3500);
  }
}
