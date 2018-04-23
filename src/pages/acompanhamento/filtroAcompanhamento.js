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
var FiltroAcompanhamentoPage = /** @class */ (function () {
    function FiltroAcompanhamentoPage(navParams, events, viewCtrl) {
        this.navParams = navParams;
        this.events = events;
        this.viewCtrl = viewCtrl;
    }
    FiltroAcompanhamentoPage.prototype.ngOnInit = function () {
        if (this.navParams.data) {
            this.nome = this.navParams.data.nome;
            this.cpfCnpj = this.navParams.data.cpfCnpj;
            this.order = this.navParams.data.order;
            this.reverse = this.navParams.data.reverse;
        }
        if (this.nome) {
            this.consultaCpfCnpj = true;
        }
        if (this.cpfCnpj) {
            this.consultaNome = true;
        }
    };
    FiltroAcompanhamentoPage.prototype.limparNome = function () {
        this.nome = '';
    };
    FiltroAcompanhamentoPage.prototype.filtrarNome = function () {
        if (this.nome == '') {
            this.nome = null;
            this.consultaCpfCnpj = false;
        }
        else {
            this.consultaCpfCnpj = true;
        }
        this.events.publish('filtroAcompanhamento:filtrarPorNome', this.nome);
    };
    FiltroAcompanhamentoPage.prototype.limparCpfCnpj = function () {
        this.cpfCnpj = '';
    };
    FiltroAcompanhamentoPage.prototype.filtrarCpfCnpj = function () {
        if (this.cpfCnpj == '') {
            this.cpfCnpj = null;
            this.consultaNome = false;
        }
        else {
            this.consultaNome = true;
        }
        this.events.publish('filtroAcompanhamento:filtrarPorCpfCnpj', this.cpfCnpj);
    };
    FiltroAcompanhamentoPage.prototype.ordernar = function (valor) {
        this.order = valor;
        this.reverse = !this.reverse;
        this.events.publish('ordemAcompanhamento:ordernar', this.order, this.reverse);
    };
    FiltroAcompanhamentoPage.prototype.fechar = function () {
        this.viewCtrl.dismiss();
    };
    FiltroAcompanhamentoPage = __decorate([
        Component({
            templateUrl: 'filtroAcompanhamento.html'
        }),
        __metadata("design:paramtypes", [NavParams, Events, ViewController])
    ], FiltroAcompanhamentoPage);
    return FiltroAcompanhamentoPage;
}());
export { FiltroAcompanhamentoPage };
//# sourceMappingURL=filtroAcompanhamento.js.map