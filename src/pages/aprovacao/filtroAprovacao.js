var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { ViewController, Events } from "ionic-angular";
var filtroAprovacaoPage = /** @class */ (function () {
    function filtroAprovacaoPage(events, viewCtrl) {
        this.events = events;
        this.viewCtrl = viewCtrl;
    }
    filtroAprovacaoPage.prototype.ngOnInit = function () {
        this.grupoAlcadas = 'Todas';
        this.itensGrupoAlcadas();
    };
    filtroAprovacaoPage.prototype.filtrarSituacao = function () {
        this.filtrar();
        this.fechar();
    };
    filtroAprovacaoPage.prototype.filtrar = function () {
        this.events.publish('filtroOperacoes:filtro', this.grupoAlcadas, this.nomeTomador, this.valorOperacao, this.cpfCnpj, this.tipoProduto, this.periodo, this.cooperativa, this.numProposta);
    };
    filtroAprovacaoPage.prototype.fechar = function () {
        this.viewCtrl.dismiss();
    };
    filtroAprovacaoPage.prototype.itensGrupoAlcadas = function () {
        this.lstGrupoAlcadas = new Array();
        this.lstGrupoAlcadas.push('Todos', 'N1', 'N2', 'N3', 'N4');
    };
    filtroAprovacaoPage.prototype.limparNumProposta = function () {
        this.numProposta = null;
        this.cpfCnpj = null;
        this.grupoAlcadas = 'Todas';
        this.filtrar();
    };
    filtroAprovacaoPage = __decorate([
        Component({
            templateUrl: 'filtroAprovacao.html'
        }),
        __metadata("design:paramtypes", [Events, ViewController])
    ], filtroAprovacaoPage);
    return filtroAprovacaoPage;
}());
export { filtroAprovacaoPage };
//# sourceMappingURL=filtroAprovacao.js.map