import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAutoHeight]',
  standalone: true,
})
export class AutoHeightDirective implements AfterViewInit {
  @Input() nextElement = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    let nextElemHeight = 0;
    if (this.nextElement) {
      const nextElem = this.elementRef.nativeElement.nextElementSibling;
      const nextElemRect = nextElem.getBoundingClientRect();
      nextElemHeight = nextElemRect.height + (nextElemRect.top - rect.bottom);
    }
    const height = `${window.innerHeight - rect.top - nextElemHeight}px`;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', height);
  }
}
