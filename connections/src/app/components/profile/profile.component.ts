import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  loadProfile,
  updateProfile,
} from '../../redux/actions/profile.actions';
import {
  ProfileState,
  selectProfile,
} from '../../redux/reducers/profile.reducers';
import { validateName } from '../../utils/validators';
import { MAX_NAME_LENGTH } from '../../utils/consts';

interface EditName {
  name: FormControl<string>;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgForOf,
    NgIf,
    KeyValuePipe,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<ProfileState>;

  subscription!: Subscription;

  editForm: FormGroup<EditName> = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(MAX_NAME_LENGTH),
        validateName,
      ],
    ],
  });

  isEdit = false;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.store.dispatch(loadProfile());
    this.profile$ = this.store.select(selectProfile);
  }

  get name() {
    return this.editForm.controls.name;
  }

  toggleInput() {
    this.isEdit = !this.isEdit;
    if (this.isEdit)
      this.subscription = this.profile$.subscribe(({ name }) => {
        this.name.setValue(name.S);
      });
    else this.subscription.unsubscribe();
  }

  updateName() {
    this.store.dispatch(updateProfile({ name: this.name.value }));
    this.toggleInput();
  }
}
