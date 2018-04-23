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
import { AcompanhamentoDocumentoPage, RelatorioDetalhesPage } from '../../app/paginas';
import { ParamPath, Paths } from '../../app/paths';
import { Http } from '@angular/http';
var AcompanhamentoRegistrarPage = /** @class */ (function () {
    function AcompanhamentoRegistrarPage(params, nav, loadingCtrl, http) {
        this.params = params;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.quantidadeCaracteresDescricao = "0/500";
        this.acompanhamento = params.data.acompanhamento;
    }
    AcompanhamentoRegistrarPage.prototype.contarCaracteresDescricao = function () {
        this.quantidadeCaracteresDescricao = this.acompanhamento.visitaAgenda.descricao.length.toString() + "/500";
    };
    AcompanhamentoRegistrarPage.prototype.voltar = function () {
        this.nav.pop();
    };
    AcompanhamentoRegistrarPage.prototype.abrirDocumentos = function () {
        this.nav.push(AcompanhamentoDocumentoPage, { acompanhamento: this.acompanhamento });
    };
    AcompanhamentoRegistrarPage.prototype.detalharContrato = function () {
        var _this = this;
        var param = ParamPath.parametro('idOperacaoCredito', this.acompanhamento.idOperacaoCredito.toString());
        this.http.get(Paths.getURL(Paths.RELATORIOS_DETALHE, param)).map(function (res) { return res.json(); }).subscribe(function (dados) {
            if (dados) {
                _this.nav.push(RelatorioDetalhesPage, { cabecalho: _this.acompanhamento, relatorio: dados, visita: true });
            }
        });
    };
    AcompanhamentoRegistrarPage = __decorate([
        Component({
            templateUrl: 'acompanhamento-registrar.html'
        }),
        __metadata("design:paramtypes", [NavParams, NavController,
            LoadingController, Http])
    ], AcompanhamentoRegistrarPage);
    return AcompanhamentoRegistrarPage;
}());
export { AcompanhamentoRegistrarPage };
//# sourceMappingURL=acompanhamento-registrar.js.map