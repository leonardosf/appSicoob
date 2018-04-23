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
import { AcompanhamentoDetalhesPage, FiltroAcompanhamentoPage, AcompanhamentoRegistrarPage } from '../../app/paginas';
import { ParamPath, Paths } from '../../app/paths';
import { Http } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
var AcompanhamentoPage = /** @class */ (function () {
    function AcompanhamentoPage(http, loadingCtrl, nav, mensagem, popoverCtrl, events) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.mensagem = mensagem;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.order = 'nomePessoa';
        this.reverse = false;
        this.ordernacao = 'Nome';
        this.semResultado = false;
        this.exibirFiltro = true;
    }
    AcompanhamentoPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.http.get(Paths.VISITAS).map(function (res) { return res.json(); }).subscribe(function (dados) {
            if (dados && dados.length > 0) {
                _this.acompanhamentos = dados;
                for (var _i = 0, _a = _this.acompanhamentos; _i < _a.length; _i++) {
                    var acompanhamento = _a[_i];
                    acompanhamento.exibir = true;
                }
            }
            else {
                _this.semResultado = true;
                _this.exibirFiltro = false;
                return;
            }
        });
    };
    AcompanhamentoPage.prototype.registrar = function (acompanhamento) {
        var loading = this.loadingCtrl.create();
        loading.present();
        this.nav.push(AcompanhamentoRegistrarPage, { acompanhamento: acompanhamento });
        loading.dismiss();
    };
    AcompanhamentoPage.prototype.detalhar = function (acompanhamento) {
        var _this = this;
        var param = ParamPath.parametro('idOperacao', acompanhamento.idOperacao.toString());
        this.http.get(Paths.getURL(Paths.OPERACOES_VISITAS, param)).map(function (res) { return res.json(); }).subscribe(function (dados) {
            if (dados && dados.length > 0) {
                _this.visitas = dados;
                _this.nav.push(AcompanhamentoDetalhesPage, { acompanhamento: acompanhamento, visitas: _this.visitas });
            }
            else {
                _this.nav.push(AcompanhamentoRegistrarPage, { acompanhamento: acompanhamento });
            }
        });
    };
    AcompanhamentoPage.prototype.abrirFiltros = function (event) {
        var _this = this;
        this.events.unsubscribe('filtroAcompanhamento:filtrarPorNome');
        this.events.subscribe('filtroAcompanhamento:filtrarPorNome', function (nome) {
            _this.filtrarPorNome(nome);
        });
        this.events.unsubscribe('filtroAcompanhamento:filtrarPorCpfCnpj');
        this.events.subscribe('filtroAcompanhamento:filtrarPorCpfCnpj', function (cpfCnpj) {
            _this.filtrarPorCpfCnpj(cpfCnpj);
        });
        this.events.unsubscribe('ordemAcompanhamento:ordernar');
        this.events.subscribe('ordemAcompanhamento:ordernar', function (valor, reverse) {
            _this.ordernar(valor, reverse);
        });
        var popover = this.popoverCtrl.create(FiltroAcompanhamentoPage, {
            nome: this.nomeFiltro,
            cpfCnpj: this.cpfCnpjFiltro,
            order: this.order,
            reverse: this.reverse
        });
        popover.present({ ev: event });
    };
    AcompanhamentoPage.prototype.filtrarPorNome = function (nome) {
        this.semResultado = true;
        this.nomeFiltro = nome;
        if (nome) {
            nome = nome.toUpperCase();
        }
        if (!this.acompanhamentos) {
            return;
        }
        for (var _i = 0, _a = this.acompanhamentos; _i < _a.length; _i++) {
            var acompanhamento = _a[_i];
            if (acompanhamento.nomePessoa.toUpperCase().startsWith(nome) || nome == null) {
                acompanhamento.exibir = true;
                this.semResultado = false;
            }
            else {
                acompanhamento.exibir = false;
            }
        }
    };
    AcompanhamentoPage.prototype.filtrarPorCpfCnpj = function (cpfCnpj) {
        this.semResultado = true;
        this.cpfCnpjFiltro = cpfCnpj;
        var cpfCnpjPuro = cpfCnpj == null ? null : cpfCnpj.replace(/[^\d]+/g, '');
        for (var _i = 0, _a = this.acompanhamentos; _i < _a.length; _i++) {
            var acompanhamento = _a[_i];
            if (acompanhamento.numCpfCnpj.startsWith(cpfCnpjPuro) || cpfCnpjPuro == null) {
                acompanhamento.exibir = true;
                this.semResultado = false;
            }
            else {
                acompanhamento.exibir = false;
            }
        }
    };
    AcompanhamentoPage.prototype.ordernar = function (valor, reverse) {
        this.order = valor;
        if ('nomePessoa' == valor) {
            this.ordernacao = 'Nome';
        }
        this.reverse = reverse;
    };
    AcompanhamentoPage = __decorate([
        Component({
            templateUrl: 'acompanhamento.html'
        }),
        __metadata("design:paramtypes", [Http, LoadingController, NavController,
            MensagemServicoProvider, PopoverController, Events])
    ], AcompanhamentoPage);
    return AcompanhamentoPage;
}());
export { AcompanhamentoPage };
//# sourceMappingURL=acompanhamento.js.map