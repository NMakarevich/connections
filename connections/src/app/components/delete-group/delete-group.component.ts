import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../UI/button/button.component';
import { COLOR_BLUE, COLOR_RED } from '../../utils/consts';
import { ModalService } from '../../services/modal.service';
import { deleteGroup } from '../../redux/actions/group.actions';

@Component({
  selector: 'app-delete-group',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete-group.component.html',
  styleUrl: './delete-group.component.scss',
})
export class DeleteGroupComponent {
  constructor(
    private readonly modalService: ModalService,
    private readonly store: Store
  ) {}

  cancel() {
    this.modalService.close();
  }

  delete() {
    if (typeof this.modalService.params === 'string') {
      this.store.dispatch(deleteGroup({ id: this.modalService.params }));
      this.modalService.close();
    }
  }

  protected readonly COLOR_RED = COLOR_RED;

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
