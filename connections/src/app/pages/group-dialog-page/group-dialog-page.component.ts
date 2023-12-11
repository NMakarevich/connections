import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, map, Observable, switchMap, takeWhile } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import * as dialogActions from '../../redux/actions/group-dialog.actions';
import { MessageWithAuthorName } from '../../models/dialog.model';
import { selectDialogs } from '../../redux/reducers/dialog.reducers';
import { MessageComponent } from '../../components/UI/message/message.component';
import { selectPeopleSource } from '../../redux/reducers/people.reducers';
import { UserItem } from '../../models/people.model';
import { SortByDatePipe } from '../../pipes/sort-by-date.pipe';
import { COLOR_BLUE, UID } from '../../utils/consts';
import { ButtonComponent } from '../../components/UI/button/button.component';
import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive';
import { MessageFormComponent } from '../../components/UI/message-form/message-form.component';
import { selectGroupsList } from '../../redux/reducers/group.reducers';
import { ModalService } from '../../services/modal.service';
import { DeleteGroupComponent } from '../../components/delete-group/delete-group.component';
import { AutoHeightDirective } from '../../directives/auto-height.directive';

@Component({
  selector: 'app-group-dialog-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MessageComponent,
    NgForOf,
    SortByDatePipe,
    ButtonComponent,
    ScrollToBottomDirective,
    MessageFormComponent,
    RouterLink,
    AutoHeightDirective,
  ],
  templateUrl: './group-dialog-page.component.html',
  styleUrl: './group-dialog-page.component.scss',
})
export class GroupDialogPageComponent implements OnInit {
  dialog$!: Observable<MessageWithAuthorName[]>;

  dialogs$ = this.store.select(selectDialogs);

  authorId = localStorage.getItem(UID);

  dialogId = '';

  isOwner$!: Observable<boolean>;

  refreshTime = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.dialogId = this.route.snapshot.params['groupId'];
    this.store.dispatch(dialogActions.loadDialog({ dialogId: this.dialogId }));
    this.dialog$ = this.dialogs$.pipe(
      map((dialogs) => dialogs[this.dialogId]?.Items),
      switchMap((dialog) =>
        this.store.select(selectPeopleSource).pipe(
          map(
            (source: { [id: string]: UserItem }) =>
              dialog?.map((message) => ({
                ...message,
                authorName: source[message.authorID.S]?.name.S,
              }))
          )
        )
      )
    );

    this.isOwner$ = this.store.select(selectGroupsList).pipe(
      map((groups) => {
        const group = groups.find(
          (groupItem) => groupItem.id.S === this.dialogId
        );
        if (group) return group.createdBy.S === localStorage.getItem(UID);
        return false;
      })
    );

    this.timer().subscribe((value) => {
      this.refreshTime = value;
      if (value < 0)
        this.store.dispatch(
          dialogActions.resetDialogTimer({
            dialogId: this.dialogId,
          })
        );
    });
  }

  timer() {
    const refreshTime$ = this.dialogs$.pipe(
      map((dialogs) => dialogs[this.dialogId]?.refreshTime)
    );
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

  updateMessages() {
    this.store.dispatch(
      dialogActions.refreshDialog({
        dialogId: this.dialogId,
      })
    );
  }

  deleteDialog() {
    this.modalService.open(DeleteGroupComponent, this.dialogId);
  }

  getMessage(message: { message: string }) {
    this.store.dispatch(
      dialogActions.postDialogMessage({
        message: message.message,
        dialogId: this.dialogId,
      })
    );
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
