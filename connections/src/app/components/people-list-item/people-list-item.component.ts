import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConversationItem, UserItem } from '../../models/people.model';
import { createConversation } from '../../redux/actions/people.actions';

@Component({
  selector: 'app-people-list-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './people-list-item.component.html',
  styleUrl: './people-list-item.component.scss',
})
export class PeopleListItemComponent {
  @Input() user!: UserItem;

  @Input() conversation!: ConversationItem | undefined;

  constructor(private readonly store: Store) {}

  createConversation() {
    this.store.dispatch(createConversation({ companion: this.user.uid.S }));
  }
}
