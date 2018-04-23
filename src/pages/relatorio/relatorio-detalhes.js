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
var RelatorioDetalhesPage = /** @class */ (function () {
    function RelatorioDetalhesPage(params, http, nav, mensagem, events, loadingCtrl) {
        this.params = params;
        this.http = http;
        this.nav = nav;
        this.mensagem = mensagem;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.tituloPagina = "Relatório | Detalhes";
        this.cabecalho = params.data.cabecalho;
        this.relatorio = params.data.relatorio;
        if (params.data.visita) {
            this.tituloPagina = "Visita | Detalhes financeiros";
        }
    }
    RelatorioDetalhesPage.prototype.ionViewDidEnter = function () {
    };
    RelatorioDetalhesPage.prototype.voltar = function () {
        this.nav.pop();
    };
    RelatorioDetalhesPage = __decorate([
        Component({
            templateUrl: 'relatorio-detalhes.html'
        }),
        __metadata("design:paramtypes", [NavParams, Http, NavController,
            MensagemServicoProvider, Events,
            LoadingController])
    ], RelatorioDetalhesPage);
    return RelatorioDetalhesPage;
}());
export { RelatorioDetalhesPage };
//# sourceMappingURL=relatorio-detalhes.js.map