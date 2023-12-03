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
import { loadProfile } from '../../redux/actions/profile.actions';
import { selectProfile } from '../../redux/reducers/profile.reducers';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, KeyValuePipe, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile$ = this.store.select(selectProfile);

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadProfile());
  }
}
