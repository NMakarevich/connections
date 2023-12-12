import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Type,
} from '@angular/core';
import { Action } from '@ngrx/store';
import { ModalComponent } from '../components/UI/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalComponent!: ComponentRef<ModalComponent>;

  params!: { text: string; action: Action };

  constructor(
    private readonly injector: EnvironmentInjector,
    private readonly appRef: ApplicationRef
  ) {}

  open(component: Type<unknown>, params?: { text: string; action: Action }) {
    if (params) this.params = params;
    const modalContent = createComponent(component, {
      environmentInjector: this.injector,
    });
    this.modalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[modalContent.location.nativeElement]],
    });

    document.body.appendChild(this.modalComponent.location.nativeElement);

    this.appRef.attachView(modalContent.hostView);
    this.appRef.attachView(this.modalComponent.hostView);
  }

  close() {
    this.modalComponent.instance.close();
  }
}
