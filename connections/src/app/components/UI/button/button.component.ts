import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDirective } from './color.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ColorDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';

  @Input() color: string = '';

  @Input() disabled: boolean = false;
}
