import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  validateEnteredEmail,
  validateName,
  validatePasswordDigits,
  validatePasswordLength,
  validatePasswordLettersCase,
  validatePasswordSpecialChars,
  validatePasswordStrong,
} from '../../utils/validators';
import { ButtonComponent } from '../UI/button/button.component';
import { COLOR_BLUE, MAX_NAME_LENGTH } from '../../utils/consts';
import { signup } from '../../redux/actions/auth.actions';

export interface SignUp {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  enteredEmails: string[] = [];

  signUpForm: FormGroup<SignUp> = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(MAX_NAME_LENGTH),
        validateName,
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        validateEnteredEmail(this.enteredEmails),
      ],
    ],
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  get name() {
    return this.signUpForm.controls.name;
  }

  get email() {
    return this.signUpForm.controls.email;
  }

  get password() {
    return this.signUpForm.controls.password;
  }

  submit() {
    this.enteredEmails.push(this.email.value);
    this.store.dispatch(signup({ user: this.signUpForm.getRawValue() }));
    this.email.updateValueAndValidity();
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
