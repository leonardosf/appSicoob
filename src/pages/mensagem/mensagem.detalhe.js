var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, NavController } from 'ionic-angular';
var MensagemDetalhePage = /** @class */ (function () {
    function MensagemDetalhePage(http, params, _nav) {
        this.http = http;
        this.params = params;
        this._nav = _nav;
        this.mensagem = params.data.mensagem;
    }
    MensagemDetalhePage.prototype.voltar = function () {
        this._nav.pop();
    };
    MensagemDetalhePage.prototype.excluir = function () {
        this.mensagem.bolExcluido = true;
        //  this.http.put(Paths.MENSAGENS , JSON.stringify(this.mensagem), null).map(res => res.json()).
        //     subscribe((data) => {
        //     console.log(data);
        //     this.voltar();
        //     });
    };
    MensagemDetalhePage = __decorate([
        Component({
            templateUrl: 'mensagem.detalhe.html',
        }),
        __metadata("design:paramtypes", [Http, NavParams, NavController])
    ], MensagemDetalhePage);
    return MensagemDetalhePage;
}());
export { MensagemDetalhePage };
//# sourceMappingURL=mensagem.detalhe.js.map