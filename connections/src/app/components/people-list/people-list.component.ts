import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, map, Observable, switchMap, takeWhile } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  loadPeopleList,
  refreshPeopleList,
  resetPeopleTimer,
} from '../../redux/actions/people.actions';
import { PeopleListWithConversations } from '../../models/people.model';
import {
  selectDataLoaded,
  selectPeopleList,
  selectPeopleRefreshTime,
} from '../../redux/reducers/people.reducers';
import { COLOR_BLUE } from '../../utils/consts';
import { ButtonComponent } from '../UI/button/button.component';
import { PeopleListItemComponent } from '../people-list-item/people-list-item.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgForOf, ButtonComponent, PeopleListItemComponent],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
})
export class PeopleListComponent implements OnInit {
  peopleList$!: Observable<PeopleListWithConversations>;

  dataLoaded$ = this.store.select(selectDataLoaded);

  refreshTime = 0;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadPeopleList());
    this.peopleList$ = this.store.select(selectPeopleList);
    this.timer().subscribe((value) => {
      this.refreshTime = value;
      if (value <= 0) this.store.dispatch(resetPeopleTimer());
    });
  }

  timer() {
    const refreshTime$ = this.store.select(selectPeopleRefreshTime);
    const int = interval(1000);
    return refreshTime$.pipe(
      map((time) => Math.ceil((time - new Date().getTime()) / 1000)),
      switchMap((countdown) =>
        int.pipe(
          takeWhile((timer) => countdown - timer >= 0),
          map((value) => countdown - value)
        )
      )
    );
  }

  refreshList() {
    this.store.dispatch(refreshPeopleList());
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
