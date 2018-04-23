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
import { NavController, LoadingController } from 'ionic-angular';
import { RelatorioDetalhesPage } from '../../app/paginas';
import { ParamPath, Paths } from '../../app/paths';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Util } from "./../../app/util";
import { LinhaCredito } from '../../model/LinhaCredito';
var RelatorioPage = /** @class */ (function () {
    function RelatorioPage(http, loadingCtrl, nav, mensagem, popoverCtrl, events) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.mensagem = mensagem;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.semResultado = false;
        this.exibirFiltro = true;
        this.exibirResultado = false;
        this.linhasDeCredito = Array();
        this.linhaSelecionada = 0;
        this.situacoes = Array();
        this.situacoes.push(new SituacaoFinanceira('t', 'Todas'));
        this.situacoes.push(new SituacaoFinanceira('a', 'Adimplente'));
        this.situacoes.push(new SituacaoFinanceira('i', 'Inadimplente'));
        this.linhasDeCredito.push(new LinhaCredito(-99, 'Todas'));
        this.carregarLinhasCredito();
    }
    RelatorioPage.prototype.carregarLinhasCredito = function () {
        var _this = this;
        this.http.get(Paths.LINHA).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this._linhasTemp = data;
            _this._linhasTemp.forEach(function (el) {
                _this.linhasDeCredito.push(new LinhaCredito(el.idLinhaCredito + ";" + el.dataCadastroLinhaCredito, el.nomeComercialLinhaCredito));
            });
        });
    };
    RelatorioPage.prototype.getNomeComercialLinhaPesquisada = function () {
        var _this = this;
        var nomeComercial;
        this.linhasDeCredito.forEach(function (linha) {
            if (linha.idLinhaCredito == _this.linhaSelecionada) {
                nomeComercial = linha.nomeComercialLinhaCredito;
            }
        });
        this._nomeComercialLinhaPesquisada = nomeComercial;
        console.log("Nome linha :" + this._nomeComercialLinhaPesquisada);
    };
    RelatorioPage.prototype.pesquisar = function () {
        var _this = this;
        this.getNomeComercialLinhaPesquisada();
        if (this.cpfCnpj && !Util.validarCPFCNPJ(this.cpfCnpj)) {
            var tipo = this.cpfCnpj.length <= 14 ? "CPF" : "CNPJ";
            this.mensagem.mensagemAlerta(tipo + ' inválido!', 'Informe ' + tipo + ' válido!');
            return;
        }
        var param = new URLSearchParams();
        if (this.cpfCnpj) {
            param.set('numCpfCnpj', this.cpfCnpj);
        }
        if (this.nome) {
            this.nome = this.nome.replace(new RegExp('%', 'g'), "");
            param.set('nomeTomador', this.nome);
        }
        if (this.situacaoFinanceira) {
            param.set('situacaoFinanceira', this.situacaoFinanceira.toString());
        }
        if (this.linhaSelecionada) {
            param.set('idLinhaCredito', this.linhaSelecionada.toString());
        }
        var requestOptions = new RequestOptions();
        requestOptions.search = param;
        this.http.get(Paths.RELATORIOS_CONSULTA, requestOptions).map(function (res) { return res.json(); }).subscribe(function (dados) {
            if (dados && dados.length > 0) {
                _this.operacoes = dados;
                console.log(_this.operacoes);
                _this.exibirFiltro = false;
                _this.exibirResultado = true;
            }
            else {
                _this.semResultado = true;
                _this.exibirFiltro = false;
                _this.exibirResultado = false;
                return;
            }
        });
    };
    RelatorioPage.prototype.carregarNovaPesquisa = function () {
        this.semResultado = false;
        this.exibirResultado = false;
        this.exibirFiltro = true;
    };
    RelatorioPage.prototype.detalhar = function (operacao) {
        var _this = this;
        var param = ParamPath.parametro('idOperacaoCredito', operacao.idOperacaoCredito.toString());
        this.http.get(Paths.getURL(Paths.RELATORIOS_DETALHE, param)).map(function (res) { return res.json(); }).subscribe(function (dados) {
            if (dados) {
                _this.limpar();
                _this.nav.push(RelatorioDetalhesPage, { cabecalho: operacao, relatorio: dados });
            }
        });
    };
    RelatorioPage.prototype.limpar = function () {
        this.cpfCnpj = null;
        this.nome = null;
        this.situacaoFinanceira = null;
        this.linhaSelecionada = null;
        this._nomeComercialLinhaPesquisada = "";
    };
    RelatorioPage.prototype.recuperarSituacao = function (situacaoFinanceira) {
        var descricaoSituacao = "";
        for (var i = 0; i < this.situacoes.length; i++) {
            if (situacaoFinanceira == this.situacoes[i].id) {
                descricaoSituacao = this.situacoes[i].descricao;
            }
        }
        return descricaoSituacao;
    };
    RelatorioPage = __decorate([
        Component({
            templateUrl: 'relatorio.html'
        }),
        __metadata("design:paramtypes", [Http, LoadingController, NavController,
            MensagemServicoProvider, PopoverController, Events])
    ], RelatorioPage);
    return RelatorioPage;
}());
export { RelatorioPage };
var SituacaoFinanceira = /** @class */ (function () {
    function SituacaoFinanceira(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }
    return SituacaoFinanceira;
}());
export { SituacaoFinanceira };
//# sourceMappingURL=relatorio.js.map