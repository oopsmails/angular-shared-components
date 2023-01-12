import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mouseOverColor]'
})
export class MouseoverColorDirective {
  @Input('mouseOverColor') isLoading: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover') onMouseOver() {
    const parent = this.renderer.parentNode(this.elRef.nativeElement);
    if (this.isLoading) {
      this.renderer.setStyle(parent, 'color', 'red');
    }
  }

  @HostListener('mouseout') onMouseOut() {
    const parent = this.renderer.parentNode(this.elRef.nativeElement);
    this.renderer.setStyle(parent, 'color', '');
  }

}

