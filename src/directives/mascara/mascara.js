var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, Attribute } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CpfFormatador } from '../../formatador/cpf.formatador';
import { CnpjFormatador } from '../../formatador/cnpj.formatador';
var MascaraDirective = /** @class */ (function () {
    function MascaraDirective(model, tipo) {
        this.model = model;
        this.tipo = tipo;
    }
    MascaraDirective.prototype.onInputChange = function (event) {
        var valorLimpo = event.target.value.replace(/[^\d]+/g, '');
        if ('CPF' == this.tipo) {
            this.model.update.emit(CpfFormatador.formatarIncompleto(valorLimpo));
            return;
        }
        if ('CNPJ' == this.tipo) {
            this.model.update.emit(CnpjFormatador.formatarIncompleto(valorLimpo));
            return;
        }
        if ('CPF-CNPJ' == this.tipo) {
            if (valorLimpo.length <= 11) {
                this.model.update.emit(CpfFormatador.formatarIncompleto(valorLimpo));
            }
            else {
                this.model.update.emit(CnpjFormatador.formatarIncompleto(valorLimpo));
            }
            return;
        }
        if ('MONETARIO' == this.tipo) {
            if (!valorLimpo) {
                this.model.update.emit(valorLimpo);
                return;
            }
            var v = valorLimpo + 'e-2';
            var numero = Number(v);
            if (numero > 0) {
                v = numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            }
            else {
                v = '';
            }
            this.model.update.emit(v);
            return;
        }
        if ('MONETARIO-LSE' == this.tipo) {
            if (!valorLimpo) {
                this.model.update.emit(valorLimpo);
                return;
            }
            var v = valorLimpo + 'e-2';
            var numero = Number(v);
            v = numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            this.model.update.emit(v);
            return;
        }
        if ('TELEFONE' == this.tipo) {
            var telefone = valorLimpo.replace(/(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
            this.model.update.emit(telefone);
            return;
        }
    };
    MascaraDirective = __decorate([
        Directive({
            selector: '[mascara]',
            host: {
                '(keyup)': 'onInputChange($event)'
            },
            providers: [NgModel]
        }),
        __param(1, Attribute('mascara')),
        __metadata("design:paramtypes", [NgModel, String])
    ], MascaraDirective);
    return MascaraDirective;
}());
export { MascaraDirective };
//# sourceMappingURL=mascara.js.map