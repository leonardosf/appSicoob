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
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { AcompanhamentoRegistrarPage } from '../../app/paginas';
var AcompanhamentoDetalhesPage = /** @class */ (function () {
    function AcompanhamentoDetalhesPage(params, http, nav, mensagem, events, loadingCtrl) {
        this.params = params;
        this.http = http;
        this.nav = nav;
        this.mensagem = mensagem;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.acompanhamento = params.data.acompanhamento;
        this.visitas = params.data.visitas;
    }
    AcompanhamentoDetalhesPage.prototype.ionViewDidEnter = function () {
    };
    AcompanhamentoDetalhesPage.prototype.registrar = function () {
        var loading = this.loadingCtrl.create();
        loading.present();
        this.nav.push(AcompanhamentoRegistrarPage, { acompanhamento: this.acompanhamento });
        loading.dismiss();
    };
    AcompanhamentoDetalhesPage.prototype.voltar = function () {
        this.nav.pop();
    };
    AcompanhamentoDetalhesPage = __decorate([
        Component({
            templateUrl: 'acompanhamento-detalhes.html'
        }),
        __metadata("design:paramtypes", [NavParams, Http, NavController,
            MensagemServicoProvider, Events,
            LoadingController])
    ], AcompanhamentoDetalhesPage);
    return AcompanhamentoDetalhesPage;
}());
export { AcompanhamentoDetalhesPage };
//# sourceMappingURL=acompanhamento-detalhes.js.map