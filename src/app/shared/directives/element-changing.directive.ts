import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[elementChanging]',
})
export class ElementChangingDirective implements OnChanges {
  @Input() elementChanging = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    const parent = this.renderer.parentNode(this.elRef.nativeElement);
    // if (changes.elementChanging.currentValue) { // before Angular 13
    if (changes['elementChanging'].currentValue) {
      this.renderer.setStyle(parent, 'color', 'blue');
    } else {
      this.renderer.setStyle(parent, 'color', 'yellow');
    }
  }
}
