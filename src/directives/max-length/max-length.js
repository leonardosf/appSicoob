var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Platform } from "ionic-angular";
var MaxLengthDirective = /** @class */ (function () {
    function MaxLengthDirective(platform) {
        this.platform = platform;
        this.ngModelChange = new EventEmitter();
    }
    //keypress event doesn't work in ionic android. the keydown event will work but the value doesn't effect until this event has finished. hence using keyup event.
    MaxLengthDirective.prototype.onKeyup = function (event) {
        var element = event.target;
        if (this.platform.is('android')) {
            console.log('-----------------------------------------------------------');
            console.log('maxLength: ' + this.maxLength);
            console.log('element.value.length: ' + element.value.length);
            if (element.value.length > this.maxLength) {
                console.log('substr');
                element.value = element.value.substr(0, this.maxLength);
            }
            console.log('atribui');
            this.ngModelChange.emit(element.value);
        }
    };
    MaxLengthDirective.prototype.onFocus = function (event) {
        var element = event.target;
        if (!this.platform.is('android')) {
            element.setAttribute('maxlength', this.maxLength);
        }
    };
    __decorate([
        Input('max-length'),
        __metadata("design:type", Object)
    ], MaxLengthDirective.prototype, "maxLength", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MaxLengthDirective.prototype, "ngModelChange", void 0);
    __decorate([
        HostListener('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MaxLengthDirective.prototype, "onKeyup", null);
    __decorate([
        HostListener('focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MaxLengthDirective.prototype, "onFocus", null);
    MaxLengthDirective = __decorate([
        Directive({
            selector: '[max-length]'
        }),
        __metadata("design:paramtypes", [Platform])
    ], MaxLengthDirective);
    return MaxLengthDirective;
}());
export { MaxLengthDirective };
//# sourceMappingURL=max-length.js.map