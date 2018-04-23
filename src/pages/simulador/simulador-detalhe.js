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
import { ToastController, NavParams, NavController, Events, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { OperacaoPage } from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { DocumentacaoHomePage } from '../documentacao/documentacao-home';
import { PageGeneric } from '../gerenic/pageGeneric';
import { TipoGarantia } from '../../model/TipoGarantia';
import { Conta } from '../../model/Conta';
var SimuladorDetalhePage = /** @class */ (function () {
    function SimuladorDetalhePage(http, events, toastCtrl, nav, navParams, mensagem, alertCtrl) {
        this.http = http;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.mensagem = mensagem;
        this.alertCtrl = alertCtrl;
        this.tipoCriterio = 'credito';
        this.tipoCriteriosCredito = new Array();
        this.tipoCriteriosDebito = new Array();
        this.contasCredito = new Array();
        this.contasDebito = new Array();
        this.trocaPagina = true;
        this.pageGeneric = new PageGeneric();
        this.idOperacaoMicrocredito = navParams.get('idOperacaoMicrocredito');
        this.tomador = navParams.get('tomador');
        this.nomePessoa = navParams.get('nomePessoa');
        this.numCpfCnpj = navParams.get('numCpfCnpj');
        this.tomadorLSE = navParams.get('tomadorLSE');
        this.linhaDeCredito = navParams.get('linhaDeCredito');
        this.identificadorLinhacredito = navParams.get('identificadorLinhacredito');
        this.parcela = navParams.get('parcela');
        this.primeiroVencimento = navParams.get('primeiroVencimento');
        // this.capacidadePagamento = navParams.get('capacidadePagamento');
        this.valorOperacao = navParams.get('valorOperacao');
        this.idNsuSimulacao = navParams.get('idNsuSimulacao');
        this.isExcluir = navParams.get('isExcluir');
        this.tipoCriteriosCredito.push(new TipoGarantia(1, "CONTA CORRENTE"));
        this.tipoCriteriosDebito.push(new TipoGarantia(1, "BOLETO"));
        this.tipoCriteriosCredito.push(new TipoGarantia(2, "DOC"));
        this.tipoCriteriosDebito.push(new TipoGarantia(2, "CONTA CORRENTE"));
        this.contasCredito.push(new Conta(756, 1, 12345));
        this.contasCredito.push(new Conta(756, 14, 54321));
        this.contasCredito.push(new Conta(756, 20, 98765));
        this.contasDebito.push(new Conta(756, 2, 14736));
        this.contasDebito.push(new Conta(756, 24, 96374));
        this.contasDebito.push(new Conta(756, 30, 56789));
        this.tipoCriteriosDebito.push();
        console.log(this.tipoCriteriosCredito);
        console.log(this.tipoCriteriosDebito);
        this.definirTitulo();
        this.definirBotao();
    }
    SimuladorDetalhePage.prototype.setFaseAtualProposta = function () {
        this.mensagem.setFaseAtualProposta("Documentacao");
        console.log("setaFase=" + this.mensagem.getFaseAtualProposta());
    };
    SimuladorDetalhePage.prototype.definirBotao = function () {
        if (this.isExcluir) {
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
        else {
            this.tituloBotao = 'Gravar';
            this.botaoEncaminhar = true;
        }
    };
    SimuladorDetalhePage.prototype.definirTitulo = function () {
        if (this.isExcluir) {
            this.tituloPagina = 'Cadastro de Proposta de Crédito';
        }
        else {
            this.tituloPagina = this.tomador ? 'Simulação' : 'Cadastro de Proposta de Crédito';
        }
    };
    SimuladorDetalhePage.prototype.novaSimulacao = function () {
        this.events.publish('simulacao:carregarNovaSimulacao');
        this.nav.pop();
    };
    SimuladorDetalhePage.prototype.enviarParaMesa = function () {
        var valorOperacaoFormatado = this.valorOperacao.toString().replace('.', '').replace(',', '.');
        // let capacidadePagamentoFormatado = this.capacidadePagamento.toString().replace('.','').replace(',','.');
        // let simulacaoDTO = JSON.stringify({
        //     quantidadeParcelas: this.parcela.quantidadeParcelas,
        // 	valorOperacao: valorOperacaoFormatado,
        // 	capacidadePagamento: capacidadePagamentoFormatado,
        // 	idOperacaoMicrocredito: this.idOperacaoMicrocredito,
        //     idNsuSimulacao: this.idNsuSimulacao,
        //     idLinhaCredito: this.linhaDeCredito.idLinhaCredito,
        //     identificadorLinhacredito: this.identificadorLinhacredito
        // });
        if (this.tituloBotao == 'Cancelar') {
            this.nav.push(OperacaoPage, { "tomador": this.tomadorLSE });
        }
        else {
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
        // this.http.post(Paths.SIMULACOES, simulacaoDTO).
        // 	subscribe((data) => {
        //         this.nav.push(PropostaPage, {"tomador": this.tomadorLSE});
        // 	}, (error) => {
        //         this.mensagem.mensagemAlerta('Atenção', JSON.parse(error._body).erro.mensagem);
        //     });
    };
    SimuladorDetalhePage.prototype.enviarParaDocumentacao = function () {
        // this.nav.push(DocumentacaoHomePage, {"tomador": this.tomadorLSE, "gravarEncaminhar":"Gravar"});
        this.setFaseAtualProposta();
        this.nav.push(DocumentacaoHomePage, { "tomador": this.mensagem.getTomador, "isMesa": false });
    };
    SimuladorDetalhePage.prototype.voltar = function () {
        this.nav.pop();
    };
    SimuladorDetalhePage.prototype.selecionarContaCredito = function (contas) {
        this.contasCredito.map(function (listItem) {
            if (contas == listItem) {
                listItem.cssClass = 'buttonSelect';
            }
            else {
                listItem.cssClass = 'buttonDefault';
            }
            return listItem;
        });
    };
    SimuladorDetalhePage.prototype.selecionarContaDebito = function (contas) {
        this.contasDebito.map(function (listItem) {
            if (contas == listItem) {
                listItem.cssClass = 'buttonSelect';
            }
            else {
                listItem.cssClass = 'buttonDefault';
            }
            return listItem;
        });
    };
    SimuladorDetalhePage = __decorate([
        Component({
            templateUrl: 'simulador-detalhe.html'
        }),
        __metadata("design:paramtypes", [Http, Events,
            ToastController, NavController,
            NavParams, MensagemServicoProvider,
            AlertController])
    ], SimuladorDetalhePage);
    return SimuladorDetalhePage;
}());
export { SimuladorDetalhePage };
//# sourceMappingURL=simulador-detalhe.js.map