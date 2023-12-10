import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { COLOR_BLUE } from '../../../utils/consts';

interface Message {
  message: FormControl<string>;
}

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.scss',
})
export class MessageFormComponent {
  messageForm: FormGroup<Message> = this.fb.nonNullable.group({
    message: ['', [Validators.required]],
  });

  @Output() sendMessage: EventEmitter<{ message: string }> = new EventEmitter<{
    message: string;
  }>();

  constructor(private readonly fb: FormBuilder) {}

  get message() {
    return this.messageForm.controls.message;
  }

  postMessage() {
    this.sendMessage.emit(this.messageForm.getRawValue());
    this.messageForm.reset();
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
