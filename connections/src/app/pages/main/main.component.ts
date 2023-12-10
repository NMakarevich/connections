import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { GroupListComponent } from '../../components/group-list/group-list.component';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { loadMainPage } from '../../redux/actions/group.actions';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, GroupListComponent, PeopleListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadMainPage());
  }
}
