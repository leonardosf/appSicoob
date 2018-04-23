var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { CpfFormatador } from '../formatador/cpf.formatador';
import { CnpjFormatador } from '../formatador/cnpj.formatador';
var CpfCnpjPipe = /** @class */ (function () {
    function CpfCnpjPipe() {
    }
    CpfCnpjPipe.prototype.transform = function (value, args) {
        if (!value) {
            return;
        }
        if (value.length == 11) {
            return CpfFormatador.formatar(value);
        }
        if (value.length == 14) {
            return CnpjFormatador.formatar(value);
        }
    };
    CpfCnpjPipe = __decorate([
        Pipe({
            name: 'cpfcnpj',
        })
    ], CpfCnpjPipe);
    return CpfCnpjPipe;
}());
export { CpfCnpjPipe };
//# sourceMappingURL=cpf-cnpj.js.map