import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { COLOR_BLUE } from '../../utils/consts';
import { ButtonComponent } from '../UI/button/button.component';
import { login } from '../../redux/actions/auth.actions';

export interface SignIn {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm: FormGroup<SignIn> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isChanged = true;

  enteredEmail = '';

  enteredPassword = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  get email() {
    return this.signInForm.controls.email;
  }

  get password() {
    return this.signInForm.controls.password;
  }

  fieldIsChanged() {
    if (
      !this.isChanged &&
      (this.enteredPassword !== this.password.value ||
        this.enteredEmail !== this.email.value)
    ) {
      this.enteredEmail = '';
      this.enteredPassword = '';
      this.isChanged = true;
    }
    return !this.isChanged;
  }

  submit() {
    this.isChanged = false;
    this.enteredEmail = this.email.value;
    this.enteredPassword = this.password.value;
    this.store.dispatch(login({ user: this.signInForm.getRawValue() }));
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
