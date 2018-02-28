import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Platform } from "ionic-angular";

@Directive({
  selector: '[max-length]'
})
export class MaxLengthDirective {
  @Input('max-length') maxLength:any;
  @Output() ngModelChange:EventEmitter<any> = new EventEmitter();

  constructor(public platform: Platform) {
  }
  //keypress event doesn't work in ionic android. the keydown event will work but the value doesn't effect until this event has finished. hence using keyup event.
  @HostListener('keyup',['$event']) onKeyup(event) {

    const element = event.target as HTMLInputElement;

    if (this.platform.is('android')) {
      console.log('-----------------------------------------------------------');
      console.log('maxLength: '+this.maxLength);
      console.log('element.value.length: '+element.value.length);

      if (element.value.length > this.maxLength) {
        console.log('substr');
        element.value = element.value.substr(0, this.maxLength);

      }
      console.log('atribui');
      this.ngModelChange.emit(element.value);
    }
  }

  @HostListener('focus',['$event']) onFocus(event) {
    const element = event.target as HTMLInputElement;
    if (!this.platform.is('android')) {
      element.setAttribute('maxlength', this.maxLength)
    }
  }
}
