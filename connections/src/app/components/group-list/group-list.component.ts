import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  interval,
  map,
  Observable,
  Subscription,
  switchMap,
  takeWhile,
} from 'rxjs';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ButtonComponent } from '../UI/button/button.component';
import { COLOR_BLUE } from '../../utils/consts';
import { ModalService } from '../../services/modal.service';
import { AddGroupComponent } from '../add-group/add-group.component';
import {
  refreshGroupsList,
  resetGroupTimer,
} from '../../redux/actions/group.actions';
import { GroupItem } from '../../models/group.model';
import {
  selectGroupsList,
  selectGroupRefreshTime,
} from '../../redux/reducers/group.reducers';
import { GroupListItemComponent } from '../group-list-item/group-list-item.component';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    AsyncPipe,
    NgForOf,
    GroupListItemComponent,
    JsonPipe,
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
})
export class GroupListComponent implements OnInit, OnDestroy {
  groupsList$!: Observable<GroupItem[]>;

  refreshTime = 0;

  timerSubscription!: Subscription;

  constructor(
    private readonly store: Store,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.groupsList$ = this.store.select(selectGroupsList);
    this.timerSubscription = this.timer().subscribe((value) => {
      this.refreshTime = value;
      if (value <= 0) this.store.dispatch(resetGroupTimer());
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  timer() {
    const refreshTime$ = this.store.select(selectGroupRefreshTime);
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

  trackByFn(index: number, groupItem: GroupItem) {
    return groupItem.id.S;
  }

  addGroup() {
    this.modalService.open(AddGroupComponent);
  }

  refreshList() {
    this.store.dispatch(refreshGroupsList());
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
