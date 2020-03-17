import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  forwardRef,
  Input,
  OnInit,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable]',
  // providers:
  // [
  //   { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ContentEditableFormDirective), multi: true }
  // ]
})
export class ContentEditableFormDirective /*implements ControlValueAccessor*/ {
  @HostBinding('attr.contenteditable') enabled = true;

  @Output()
  private onChange: EventEmitter<any> = new EventEmitter();
  // private onChange: (value: string) => void;
  // private onTouched: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('input') onInput(): void {
    // this.onChange(this.elementRef.nativeElement.innerText);
    // this.onChange.emit(this.elementRef.nativeElement.innerHTML);
  }

  @HostListener('blur') onBlur(): void {
    // this.onTouched();
    this.onChange.emit(this.elementRef.nativeElement.innerHTML);
  }

  // writeValue(value: string): void {
  //   this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', value || '');
  // }

  // registerOnChange(onChange: (value: string) => void): void {
  //   this.onChange = onChange;
  // }

  // registerOnTouched(onTouched: () => void): void {
  //   this.onTouched = onTouched;
  // }

  setDisabledState(disabled: boolean): void {
    this.enabled = !disabled;
  }
}