import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  notification$ = this.notificationService.notification$;

  constructor(private readonly notificationService: NotificationService) {}
}
