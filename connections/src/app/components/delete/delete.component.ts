import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../UI/button/button.component';
import { COLOR_BLUE, COLOR_RED } from '../../utils/consts';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  text = this.modalService.params.text;

  constructor(
    private readonly modalService: ModalService,
    private readonly store: Store
  ) {}

  cancel() {
    this.modalService.close();
  }

  delete() {
    this.store.dispatch(this.modalService.params.action);
  }

  protected readonly COLOR_RED = COLOR_RED;

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
