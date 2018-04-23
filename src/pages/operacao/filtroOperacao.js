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
import { NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
var FiltroOperacaoPage = /** @class */ (function () {
    function FiltroOperacaoPage(navParams, events, viewCtrl) {
        this.navParams = navParams;
        this.events = events;
        this.viewCtrl = viewCtrl;
    }
    FiltroOperacaoPage.prototype.ngOnInit = function () {
        if (this.navParams.data) {
            this.estadosOperacao = this.navParams.data.estadosOperacao;
            this.dias = this.navParams.data.dias;
            this.situacao = this.navParams.data.situacao;
            this.cpfCnpj = this.navParams.data.cpfCnpj;
            this.numProposta = this.navParams.data.numProposta;
        }
    };
    FiltroOperacaoPage.prototype.filtrar = function () {
        this.events.publish('filtroOperacoes:filtro', this.dias, this.situacao, this.cpfCnpj, this.numProposta);
    };
    FiltroOperacaoPage.prototype.filtrarSituacao = function () {
        this.filtrar();
        this.fechar();
    };
    FiltroOperacaoPage.prototype.limparCpfCnpj = function () {
        this.cpfCnpj = null;
        this.situacao = 'Todas';
        this.filtrar();
    };
    FiltroOperacaoPage.prototype.fechar = function () {
        this.viewCtrl.dismiss();
    };
    FiltroOperacaoPage.prototype.limparNumProposta = function () {
        this.numProposta = null;
        this.cpfCnpj = null;
        this.situacao = 'Todas';
        this.filtrar();
    };
    FiltroOperacaoPage = __decorate([
        Component({
            templateUrl: 'filtroOperacao.html'
        }),
        __metadata("design:paramtypes", [NavParams, Events, ViewController])
    ], FiltroOperacaoPage);
    return FiltroOperacaoPage;
}());
export { FiltroOperacaoPage };
//# sourceMappingURL=filtroOperacao.js.map