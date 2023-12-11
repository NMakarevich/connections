import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/UI/notification/notification.component';
import { HeaderComponent } from './components/header/header.component';
import { AutoHeightDirective } from './directives/auto-height.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NotificationComponent,
    HeaderComponent,
    AutoHeightDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'connections';
}
