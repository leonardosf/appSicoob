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
import { Events, PopoverController, NavController } from 'ionic-angular';
import { Operacao } from "../../model/Operacao";
import { filtroAprovacaoPage } from "./filtroAprovacao";
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { DetalheAprovacaoPage } from "./detalhe-aprovacao";
var AprovacaoPage = /** @class */ (function () {
    function AprovacaoPage(events, popoverCtrl, mensagem, nav) {
        this.events = events;
        this.popoverCtrl = popoverCtrl;
        this.mensagem = mensagem;
        this.nav = nav;
        this.semResultado = false;
        this._tomador = mensagem.getTomador();
    }
    AprovacaoPage.prototype.ionViewDidEnter = function () {
        this.grupoAlcadas = 'Todas';
        this.recuperarOperacoes();
    };
    AprovacaoPage.prototype.abrirFiltros = function (event) {
        var _this = this;
        this.events.unsubscribe('filtroOperacoes:filtro');
        this.events.subscribe('filtroOperacoes:filtro', function (grupoAlcadas, nomeTomador, valorOperacao, cpfCnpj, tipoProduto, periodo, cooperativa, numProposta) {
            _this.filtrar(grupoAlcadas, nomeTomador, valorOperacao, cpfCnpj, tipoProduto, periodo, cooperativa, numProposta);
        });
        var popover = this.popoverCtrl.create(filtroAprovacaoPage, {
            estadosOperacao: this.estadosOperacao,
            nomeTomador: this.nomeTomador,
            valorOperacao: this.valorOperacao,
            cpfCnpj: this.cpfCnpj,
            tipoProduto: this.tipoProduto,
            periodo: this.periodo,
            cooperativa: this.cooperativa,
            numProposta: this.numProposta
        });
        popover.present({ ev: event });
    };
    AprovacaoPage.prototype.filtrar = function (grupoAlcadas, nomeTomador, valorOperacao, cpfCnpj, tipoProduto, periodo, cooperativa, numProposta) {
        var data = new Date();
        var cpfCnpjPuro = cpfCnpj == null ? null : cpfCnpj.replace(/[^\d]+/g, '');
        if (!this.operacoes) {
            return;
        }
        for (var _i = 0, _a = this.operacoes; _i < _a.length; _i++) {
            var operacao = _a[_i];
            if (operacao.dataOperacao >= data && (operacao.situacao == grupoAlcadas || this.grupoAlcadas == 'Todas')
                && (operacao.cpfCnpj.startsWith(cpfCnpjPuro) || cpfCnpjPuro == null) && (operacao.idOperacao.toString().startsWith(numProposta) || numProposta == null)) {
                operacao.exibir = true;
                this.semResultado = false;
            }
            else {
                operacao.exibir = false;
            }
        }
    };
    AprovacaoPage.prototype.recuperarOperacoes = function () {
        var idOperacao = 1234;
        var numProposta = 12345678;
        var operacao;
        this.operacoes = new Array();
        for (var i = 0; i <= 5; i++) {
            operacao = new Operacao();
            operacao.idOperacao = idOperacao + i;
            operacao.nome = 'Carlos Costa';
            operacao.cpfCnpj = '99999999999';
            operacao.dataOperacao = new Date;
            operacao.situacao = 'Aprovação';
            operacao.dataHoraUltimaVisita = new Date;
            operacao.idTipopendencia = 1234;
            operacao.idEstadoOperacao = 1;
            operacao.exibir = true;
            operacao.idSituacaoCredito = 1;
            operacao.cssClass = 'aprovada';
            operacao.documento = true;
            operacao.idLinhaCredito = 1234;
            operacao.numProposta = numProposta + i;
            this.operacoes.push(operacao);
        }
    };
    AprovacaoPage.prototype.abrirProposta = function (operacao) {
        this.mensagem.setFaseAtualProposta("Aprovacao");
        this.nav.push(DetalheAprovacaoPage, { "tomador": this._tomador });
    };
    AprovacaoPage = __decorate([
        Component({
            templateUrl: 'aprovacao.html'
        }),
        __metadata("design:paramtypes", [Events, PopoverController, MensagemServicoProvider,
            NavController])
    ], AprovacaoPage);
    return AprovacaoPage;
}());
export { AprovacaoPage };
//# sourceMappingURL=aprovacao.js.map