import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true,
})
export class ScrollToBottomDirective implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.scrollTop =
        this.elementRef.nativeElement.scrollHeight;
    }, 300);
  }
}
