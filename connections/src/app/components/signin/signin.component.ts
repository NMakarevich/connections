import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  validatePasswordDigits,
  validatePasswordLength,
  validatePasswordLettersCase,
  validatePasswordSpecialChars,
  validatePasswordStrong,
} from '../../utils/validators';

interface SignIn {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm: FormGroup<SignIn> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        validatePasswordStrong,
        validatePasswordLength,
        validatePasswordLettersCase,
        validatePasswordDigits,
        validatePasswordSpecialChars,
      ],
    ],
  });

  constructor(private readonly fb: FormBuilder) {}

  get email() {
    return this.signInForm.controls.email;
  }

  get password() {
    return this.signInForm.controls.password;
  }
}
