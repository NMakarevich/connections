import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColor]',
  standalone: true,
})
export class ColorDirective implements OnInit {
  @Input() color: string = '';

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.color
    );
  }
}
