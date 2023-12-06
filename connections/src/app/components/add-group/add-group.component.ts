import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { validateGroupName } from '../../utils/validators';
import { ButtonComponent } from '../UI/button/button.component';
import { COLOR_BLUE, COLOR_RED } from '../../utils/consts';
import { createGroup } from '../../redux/actions/group.actions';

interface GroupName {
  name: FormControl<string>;
}

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, NgIf],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss',
})
export class AddGroupComponent {
  formGroupName: FormGroup<GroupName> = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(30), validateGroupName],
    ],
  });

  constructor(
    private readonly modalService: ModalService,
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  get name() {
    return this.formGroupName.controls.name;
  }

  createGroup() {
    this.store.dispatch(createGroup({ name: this.name.value }));
  }

  cancel() {
    this.modalService.close();
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;

  protected readonly COLOR_RED = COLOR_RED;
}
