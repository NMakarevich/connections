import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  interval,
  map,
  Observable,
  Subscription,
  switchMap,
  takeWhile,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AutoHeightDirective } from '../../directives/auto-height.directive';
import { ButtonComponent } from '../../components/UI/button/button.component';
import { MessageComponent } from '../../components/UI/message/message.component';
import { MessageFormComponent } from '../../components/UI/message-form/message-form.component';
import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive';
import { SortByDatePipe } from '../../pipes/sort-by-date.pipe';
import { COLOR_BLUE, UID } from '../../utils/consts';
import { MessageWithAuthorName } from '../../models/dialog.model';
import { ModalService } from '../../services/modal.service';
import * as conversationActions from '../../redux/actions/conversation-dialog.actions';
import { selectConversations } from '../../redux/reducers/conversation.reducers';
import { selectPeopleSource } from '../../redux/reducers/people.reducers';
import { UserItem } from '../../models/people.model';
import { DeleteComponent } from '../../components/delete/delete.component';
import { deleteConversation } from '../../redux/actions/conversation-dialog.actions';

@Component({
  selector: 'app-conversation-dialog-page',
  standalone: true,
  imports: [
    AsyncPipe,
    AutoHeightDirective,
    ButtonComponent,
    MessageComponent,
    MessageFormComponent,
    NgForOf,
    NgIf,
    RouterLink,
    ScrollToBottomDirective,
    SortByDatePipe,
  ],
  templateUrl: './conversation-dialog-page.component.html',
  styleUrl: './conversation-dialog-page.component.scss',
})
export class ConversationDialogPageComponent implements OnInit, OnDestroy {
  conversation$!: Observable<MessageWithAuthorName[]>;

  conversations$ = this.store.select(selectConversations);

  authorId = localStorage.getItem(UID);

  conversationId = '';

  refreshTime = 0;

  timerSubscription!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.params['conversationId'];
    this.store.dispatch(
      conversationActions.loadConversation({
        conversationId: this.conversationId,
      })
    );

    this.conversation$ = this.conversations$.pipe(
      map((conversations) => conversations[this.conversationId]?.Items),
      switchMap((conversation) =>
        this.store.select(selectPeopleSource).pipe(
          map(
            (source: { [id: string]: UserItem }) =>
              conversation?.map((message) => ({
                ...message,
                authorName: source[message.authorID.S]?.name.S,
              }))
          )
        )
      )
    );

    this.timerSubscription = this.timer().subscribe((value) => {
      this.refreshTime = value;
      if (value <= 0)
        this.store.dispatch(
          conversationActions.resetConversationTimer({
            conversationId: this.conversationId,
          })
        );
    });
  }

  timer() {
    const refreshTime$ = this.conversations$.pipe(
      map((conversations) => conversations[this.conversationId]?.refreshTime)
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
      conversationActions.refreshConversation({
        conversationId: this.conversationId,
      })
    );
  }

  getMessage(message: { message: string }) {
    this.store.dispatch(
      conversationActions.postConversationMessage({
        message: message.message,
        conversationId: this.conversationId,
      })
    );
  }

  deleteConversation() {
    this.modalService.open(DeleteComponent, {
      text: 'conversation',
      action: deleteConversation({ id: this.conversationId }),
    });
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
