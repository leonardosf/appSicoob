var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var TelefonePipe = /** @class */ (function () {
    function TelefonePipe() {
    }
    TelefonePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            return;
        }
        return value.replace(/(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    };
    TelefonePipe = __decorate([
        Pipe({
            name: 'telefone',
        })
    ], TelefonePipe);
    return TelefonePipe;
}());
export { TelefonePipe };
//# sourceMappingURL=telefone.js.map