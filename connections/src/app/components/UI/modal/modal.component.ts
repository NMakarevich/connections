import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(private readonly elementRef: ElementRef) {}

  close() {
    this.elementRef.nativeElement.remove();
  }
}
