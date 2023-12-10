import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MessageWithAuthorName } from '../../../models/dialog.model';
import { UID } from '../../../utils/consts';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  @Input() message!: MessageWithAuthorName;

  ownMessage = false;

  ngOnInit() {
    this.ownMessage =
      this.message.authorID.S === `${localStorage.getItem(UID)}`;
  }
}
