import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GroupItem } from '../../models/group.model';
import { UID } from '../../utils/consts';
import { ModalService } from '../../services/modal.service';
import { DeleteComponent } from '../delete/delete.component';
import { deleteGroup } from '../../redux/actions/group.actions';

@Component({
  selector: 'app-group-list-item',
  standalone: true,
  imports: [NgIf, RouterLink, JsonPipe],
  templateUrl: './group-list-item.component.html',
  styleUrl: './group-list-item.component.scss',
})
export class GroupListItemComponent implements OnInit {
  @Input() groupItem!: GroupItem;

  isOwner = false;

  constructor(private readonly modalService: ModalService) {}

  ngOnInit() {
    this.isOwner = this.groupItem.createdBy.S === localStorage.getItem(UID);
  }

  deleteGroup() {
    this.modalService.open(DeleteComponent, {
      text: 'group',
      action: deleteGroup({ id: this.groupItem.id.S }),
    });
  }
}
