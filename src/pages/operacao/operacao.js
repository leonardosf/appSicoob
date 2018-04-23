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
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ParamPath } from '../../app/paths';
import { Http } from '@angular/http';
import { FiltroOperacaoPage } from '../../app/paginas';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import 'rxjs/Rx';
import { Operacao } from '../../model/Operacao';
import { Util } from '../../app/util';
import { EstadoOperacao } from '../../model/EstadoOperacao';
import { SimuladorDetalhePage } from "../simulador/simulador-detalhe";
import { LinhaCredito } from "../../model/LinhaCredito";
import { GarantiaPage } from "../garantia/garantia";
import { DocumentacaoHomePage } from '../documentacao/documentacao-home';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PageGeneric } from '../gerenic/pageGeneric';
import { EstudoPage } from '../estudo/estudo';
var OperacaoPage = /** @class */ (function () {
    function OperacaoPage(http, nav, navParams, mensagem, alertCtrl, popoverCtrl, events) {
        this.http = http;
        this.nav = nav;
        this.navParams = navParams;
        this.mensagem = mensagem;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.dias = 30;
        this.semResultado = false;
        this._podeAbrirTelaProposta = false;
        this.primeiraAberturaDeTela = true;
        this.exibirFiltro = true;
        this.pageGeneric = new PageGeneric();
        this._tomador = mensagem.getTomador();
    }
    OperacaoPage.prototype.ionViewDidEnter = function () {
        this.recuperarOperacoes();
        this.situacao = 'Todas';
    };
    OperacaoPage.prototype.ngOnInit = function () {
        this._tomador = this.mensagem.getTomador();
    };
    OperacaoPage.prototype.recuperarOperacoes = function () {
        // this.http.get(Paths.OPERACOES).map(res => res.json()).subscribe(
        //   (dados) => {
        this.recuperarEstadosOperacao();
        //     if(dados.length == 0){
        //       this.semResultado = true;
        //       this.exibirFiltro = false;
        //       return;
        //     }
        //     this.operacoes = dados;
        //     for(let operacao of this.operacoes){
        //       operacao.exibir = true;
        //     }
        //     this._verificaCss();
        //   }
        // );
        var lstProposta;
        var operacao = new Operacao();
        operacao.idOperacao = 1234;
        operacao.nome = 'Carlos Costa';
        operacao.cpfCnpj = '99999999999';
        operacao.dataOperacao = new Date;
        operacao.situacao = 'Cadastro';
        operacao.dataHoraUltimaVisita = new Date;
        operacao.idTipopendencia = 1234;
        operacao.idEstadoOperacao = 1;
        operacao.exibir = true;
        operacao.idSituacaoCredito = 1;
        operacao.cssClass = 'aprovada';
        operacao.documento = true;
        operacao.idLinhaCredito = 1234;
        var operacao2 = new Operacao();
        operacao2.idOperacao = 12345;
        operacao2.nome = 'Leonardo Soares';
        operacao2.cpfCnpj = '88888888888';
        operacao2.dataOperacao = new Date;
        operacao2.situacao = 'Documentação';
        operacao2.dataHoraUltimaVisita = new Date;
        operacao2.idTipopendencia = 12345;
        operacao2.idEstadoOperacao = 1;
        operacao2.exibir = true;
        operacao2.idSituacaoCredito = 1;
        operacao2.cssClass = 'cancelada';
        operacao2.documento = true;
        operacao2.idLinhaCredito = 12345;
        var operacao3 = new Operacao();
        operacao3.idOperacao = 123456;
        operacao3.nome = 'Rafael Rodrigues';
        operacao3.cpfCnpj = '77777777777';
        operacao3.dataOperacao = new Date;
        operacao3.situacao = 'Garantia';
        operacao3.dataHoraUltimaVisita = new Date;
        operacao3.idTipopendencia = 123456;
        operacao3.idEstadoOperacao = 1;
        operacao3.exibir = true;
        operacao3.idSituacaoCredito = 1;
        operacao3.cssClass = 'prospeccao';
        operacao3.documento = true;
        operacao3.idLinhaCredito = 123456;
        var operacao4 = new Operacao();
        operacao4.idOperacao = 1234567;
        operacao4.nome = 'João Jose';
        operacao4.cpfCnpj = '77777777777';
        operacao4.dataOperacao = new Date;
        operacao4.situacao = 'Estudo';
        operacao4.dataHoraUltimaVisita = new Date;
        operacao4.idTipopendencia = 1234567;
        operacao4.idEstadoOperacao = 1;
        operacao4.exibir = true;
        operacao4.idSituacaoCredito = 1;
        operacao4.cssClass = 'prospeccao';
        operacao4.documento = true;
        operacao4.idLinhaCredito = 1234567;
        lstProposta = [operacao, operacao2, operacao3, operacao4];
        this.operacoes = lstProposta;
    };
    OperacaoPage.prototype.recuperarEstadosOperacao = function () {
        // this.http.get(Paths.ESTADOS_OPERACAO).map(res => res.json()).subscribe((data) => {
        //   this.estadosOperacao = data;
        //     this.estadosOperacao.splice(0,0, {
        //       "idEstadoOperacao":0,
        //       "descricao": "Todas",
        //       "bolSisbr": false,
        //       "bolMobile": true,
        //       "bolAtivo": true,
        //       "dataHoraInclusao":null,
        //       "idUsuarioInclusao": "app",
        //       });
        // });
        var estado = new EstadoOperacao();
        estado.idEstadoOperacao = 0;
        estado.descricao = 'Todas';
        estado.bolSisbr = false;
        estado.bolMobile = true;
        estado.bolAtivo = true;
        estado.dataHoraInclusao = new Date;
        estado.idUsuarioInclusao = '0';
        var estado1 = new EstadoOperacao();
        estado1.idEstadoOperacao = 1;
        estado1.descricao = 'Cadastro';
        estado1.bolSisbr = false;
        estado1.bolMobile = true;
        estado1.bolAtivo = true;
        estado1.dataHoraInclusao = new Date;
        estado1.idUsuarioInclusao = '1';
        var estado2 = new EstadoOperacao();
        estado2.idEstadoOperacao = 2;
        estado2.descricao = 'Documentação';
        estado2.bolSisbr = false;
        estado2.bolMobile = true;
        estado2.bolAtivo = true;
        estado2.dataHoraInclusao = new Date;
        estado2.idUsuarioInclusao = '2';
        var estado3 = new EstadoOperacao();
        estado3.idEstadoOperacao = 3;
        estado3.descricao = 'Garantia';
        estado3.bolSisbr = false;
        estado3.bolMobile = true;
        estado3.bolAtivo = true;
        estado3.dataHoraInclusao = new Date;
        estado3.idUsuarioInclusao = '3';
        var estado4 = new EstadoOperacao();
        estado4.idEstadoOperacao = 4;
        estado4.descricao = 'Estudo';
        estado4.bolSisbr = false;
        estado4.bolMobile = true;
        estado4.bolAtivo = true;
        estado4.dataHoraInclusao = new Date;
        estado4.idUsuarioInclusao = '3';
        this.estadosOperacao = [estado, estado1, estado2, estado3, estado4];
    };
    OperacaoPage.prototype.abrirFiltros = function (event) {
        var _this = this;
        this.events.unsubscribe('filtroOperacoes:filtro');
        this.events.subscribe('filtroOperacoes:filtro', function (dias, situacao, cpfCnpj, numProposta) {
            _this.filtrar(dias, situacao, cpfCnpj, numProposta);
        });
        var popover = this.popoverCtrl.create(FiltroOperacaoPage, {
            estadosOperacao: this.estadosOperacao,
            dias: this.dias,
            situacao: this.situacao,
            cpfCnpj: this.cpfCnpj,
            numProposta: this.numProposta
        });
        popover.present({ ev: event });
    };
    OperacaoPage.prototype.abrirProposta = function (operacao) {
        this._verificaRegraDeNegocios(operacao);
        if (this._podeAbrirTelaProposta) {
            var param = new ParamPath();
            param.adicionar('cpfCnpj', operacao.cpfCnpj);
            param.adicionar('consultaProposta', "true");
            // this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).subscribe((data) => {
            //     this._tomador = data;
            //     this.nav.push(PropostaPage, {'tomador': this._tomador});
            // });
            // idPessoa: Number;
            // idInstituicao: Number;
            // nomePessoa:string;
            // numCpfCnpj: string;
            // codTipoPessoa: Number;
            // nomeApelido: string;
            // icon: String;
            // showDetails: Boolean;
            // show: Boolean;
            // codigoAtividadeEconomica: Number;
            // autorizaConsultaBacen: Boolean;
            // dataInclusaoSistema: Date;
            // dataRenovacaoCadastral: Date;
            // telefones: Array<Telefone>;
            // endereco: Array<Endereco>;
            // emailPessoaVO: Email;
            // proposta:PropostaLSE;
            // dataNascimentoPessoaFisica:Date;
            // bolAssociado:boolean;
            // hasDocument:boolean;
            if (operacao.situacao == 'Cadastro') {
                this.mensagem.setFaseAtualProposta("Cadastro");
                this.nav.push(SimuladorDetalhePage, {
                    tomador: this._tomador,
                    nomePessoa: 'Carlos Costa',
                    numCpfCnpj: '999.999.999-99',
                    tomadorLSE: this._tomador,
                    capacidadePagamento: 4,
                    linhaDeCredito: (new LinhaCredito(1 + ";" + new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ")),
                    parcela: { quantidadeParcelas: '12', maiorValorParcela: 500.00, percentualTaxaJuros: 1.3, primeiroVencimento: '07/03',
                        valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual: 24 },
                    valorOperacao: '5000',
                    idNsuSimulacao: '1',
                    primeiroVencimento: '07/03/2018',
                    idOperacaoMicrocredito: '1',
                    identificadorLinhacredito: 'Linha de Crédito 1',
                    isExcluir: true
                });
            }
            else if (operacao.situacao == 'Documentação') {
                this.mensagem.setFaseAtualProposta("Documentacao");
                console.log(this._tomador);
                this.nav.push(DocumentacaoHomePage, { "tomador": this._tomador, "isMesa": true });
            }
            else if (operacao.situacao == 'Garantia') {
                this.mensagem.setFaseAtualProposta("Garantia");
                this.nav.push(GarantiaPage, { "tomador": this._tomador, "isMesa": true });
            }
            else if (operacao.situacao == 'Estudo') {
                this.mensagem.setFaseAtualProposta("Estudo");
                this.nav.push(EstudoPage, { 'tomador': this._tomador });
            }
            else {
            }
        }
    };
    OperacaoPage.prototype._verificaRegraDeNegocios = function (operacao) {
        switch (operacao.idEstadoOperacao) {
            case Util.OPERACAO_EM_AJUSTE:
                this._controleOperacaoEmAjuste(operacao);
                break;
            case Util.OPERACAO_EM_PROPOSTA:
                this._controleOperacaoEmProposta(operacao);
                break;
            case Util.SITUACAO_PROPOSTA_CANCELADA:
                this._controleOpercaoCancelada(operacao);
                break;
            case Util.OPERACAO_CANCELADA:
                this._controleOpercaoCancelada(operacao);
                break;
            default:
                this._controleOpercaoEmAnalise(operacao);
                break;
        }
    };
    OperacaoPage.prototype._controleOperacaoEmAjuste = function (operacao) {
        this._podeAbrirTelaProposta = true;
    };
    OperacaoPage.prototype._controleOperacaoEmProposta = function (operacao) {
        if (operacao.idSituacaoCredito != null) {
            switch (operacao.idSituacaoCredito) {
                case Util.SITUACAO_PROPOSTA_CREDITO:
                    //operacao.cssClass = "aprovada";
                    //operacao.situacao = "Proposta";
                    this.showAlert({
                        title: 'Operação em Proposta!',
                        message: 'A operação selecionada encontra-se em Proposta.',
                        buttons: ['OK']
                    });
                    this.primeiraAberturaDeTela = false;
                    break;
                case Util.SITUACAO_CONTRATO_DE_CREDITO:
                    //operacao.cssClass = "aprovada";
                    //operacao.situacao = "Contrato";
                    this.showAlert({
                        title: 'Operação em Contrato!',
                        message: 'A operação selecionada encontra-se em Contrato.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_CONTRATO_LIQUIDADO:
                    // operacao.cssClass = "encerrada";
                    // operacao.situacao = "Encerrada";
                    this.showAlert({
                        title: 'Operação Encerrada!',
                        message: 'A operação selecionada encontra-se Encerrada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_CONTRATO_BAIXADO_PARA_ACERTO:
                    // operacao.cssClass = "encerrada";
                    // operacao.situacao = "Encerrada";
                    this.showAlert({
                        title: 'Operação Encerrada!',
                        message: 'A operação selecionada encontra-se Encerrada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_CONTRATO_TRANSFERIDO:
                    // operacao.cssClass = "aprovada";
                    //  operacao.situacao = "Aprovada";
                    this.showAlert({
                        title: 'Operação Aprovada!',
                        message: 'A operação selecionada encontra-se Aprovada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_ABERTO:
                    // operacao.cssClass = "aprovada";
                    // operacao.situacao = "Contrato";
                    this.showAlert({
                        title: 'Operação Aprovada!',
                        message: 'A operação selecionada encontra-se Aprovada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_CREDITO_LIQUIDAR:
                    // operacao.cssClass = "aprovada";
                    //  operacao.situacao = "Aprovada";
                    this.showAlert({
                        title: 'Operação Aprovada!',
                        message: 'A operação selecionada encontra-se Aprovada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_PROPOSTA_CANCELADA:
                    //  operacao.cssClass = "cancelada";
                    //  operacao.situacao = "Cancelada";
                    this.showAlert({
                        title: 'Operação Cancelada!',
                        message: 'A operação selecionada encontra-se Cancelada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.SITUACAO_PROPOSTA_INDEFERIDA:
                    // operacao.cssClass = "cancelada";
                    // operacao.situacao = "Cancelada";
                    this.showAlert({
                        title: 'Operação Cancelada!',
                        message: 'A operação selecionada encontra-se Cancelada.',
                        buttons: ['OK']
                    });
                    break;
                case Util.PROPOSTA_DISPONIVEL_PARA_ASSINATURA:
                    this.showAlert({
                        title: 'Operação Não Permitida!',
                        message: 'A Operação selecionada encontra-se em Contrato e disponível para Assinatura!',
                        buttons: ['OK']
                    });
                    break;
            }
        }
        else {
            //operacao.cssClass = "proposta";
            this.showAlert({
                title: 'Operação em Proposta!',
                message: 'A operação selecionada encontra-se em Proposta.',
                buttons: ['OK']
            });
        }
    };
    OperacaoPage.prototype._controleOpercaoEmAnalise = function (operacao) {
        this._podeAbrirTelaProposta = false;
        this.showAlert({
            title: 'Operação em Análise!',
            message: 'A operação selecionada encontra-se na Cooperativa para análise.',
            buttons: ['OK']
        });
    };
    OperacaoPage.prototype._controleOpercaoCancelada = function (operacao) {
        this._podeAbrirTelaProposta = false;
        this.showAlert({
            title: 'Operação Cancelada!',
            message: 'A operação selecionada encontra-se cancelada.',
            buttons: ['OK']
        });
    };
    OperacaoPage.prototype.filtrar = function (dias, situacao, cpfCnpj, numProposta) {
        this.semResultado = true;
        this.dias = dias;
        this.situacao = situacao;
        this.cpfCnpj = cpfCnpj;
        this.numProposta = numProposta;
        this.dias = dias;
        var data = new Date();
        data.setDate(data.getDate() - this.dias);
        var cpfCnpjPuro = cpfCnpj == null ? null : cpfCnpj.replace(/[^\d]+/g, '');
        if (!this.operacoes) {
            return;
        }
        for (var _i = 0, _a = this.operacoes; _i < _a.length; _i++) {
            var operacao = _a[_i];
            if (operacao.dataOperacao >= data && (operacao.situacao == situacao || this.situacao == 'Todas')
                && (operacao.cpfCnpj.startsWith(cpfCnpjPuro) || cpfCnpjPuro == null) && (operacao.idOperacao.toString().startsWith(numProposta) || numProposta == null)) {
                operacao.exibir = true;
                this.semResultado = false;
            }
            else {
                operacao.exibir = false;
            }
        }
    };
    OperacaoPage.prototype._verificaCss = function () {
        for (var _i = 0, _a = this.operacoes; _i < _a.length; _i++) {
            var opr = _a[_i];
            switch (opr.idEstadoOperacao) {
                case Util.OPERACAO_CANCELADA:
                    opr.cssClass = "cancelada";
                    break;
                case Util.OPERACAO_EM_ANALISE:
                    opr.cssClass = "analise";
                    break;
                case Util.OPERACAO_EM_AJUSTE:
                    opr.cssClass = "prospeccao";
                    break;
                default:
                    opr.cssClass = "aprovada";
                    opr.situacao = "Proposta";
                    this._validaCssSituacaoCredito(opr);
                    break;
            }
        }
    };
    OperacaoPage.prototype._validaCssSituacaoCredito = function (operacao) {
        this._podeAbrirTelaProposta = false;
        if (operacao.idSituacaoCredito != null) {
            switch (operacao.idSituacaoCredito) {
                case Util.SITUACAO_PROPOSTA_CREDITO:
                    operacao.cssClass = "aprovada";
                    operacao.situacao = "Proposta";
                    break;
                case Util.SITUACAO_CONTRATO_DE_CREDITO:
                    operacao.cssClass = "aprovada";
                    operacao.situacao = "Contrato";
                    break;
                case Util.SITUACAO_CONTRATO_LIQUIDADO:
                    operacao.cssClass = "encerrada";
                    operacao.situacao = "Encerrada";
                    break;
                case Util.SITUACAO_CONTRATO_BAIXADO_PARA_ACERTO:
                    operacao.cssClass = "encerrada";
                    operacao.situacao = "Encerrada";
                    break;
                case Util.SITUACAO_CONTRATO_TRANSFERIDO:
                    operacao.cssClass = "aprovada";
                    operacao.situacao = "Aprovada";
                    break;
                case Util.SITUACAO_ABERTO:
                    operacao.cssClass = "aprovada";
                    operacao.situacao = "Aprovada";
                    break;
                case Util.SITUACAO_PROPOSTA_CANCELADA:
                    operacao.cssClass = "cancelada";
                    operacao.situacao = "Cancelada";
                    break;
                case Util.SITUACAO_PROPOSTA_INDEFERIDA:
                    operacao.cssClass = "cancelada";
                    operacao.situacao = "Cancelada";
                    break;
                case Util.PROPOSTA_DISPONIVEL_PARA_ASSINATURA:
                    operacao.cssClass = "aprovada";
                    operacao.situacao = "Assinatura";
                    break;
            }
        }
        else {
            operacao.cssClass = "aprovada";
        }
    };
    OperacaoPage.prototype.showAlert = function (customParams) {
        var params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
        var alert = this.alertCtrl.create(params);
        alert.present();
    };
    OperacaoPage = __decorate([
        Component({
            templateUrl: 'operacao.html'
        }),
        __metadata("design:paramtypes", [Http, NavController, NavParams, MensagemServicoProvider,
            AlertController, PopoverController, Events])
    ], OperacaoPage);
    return OperacaoPage;
}());
export { OperacaoPage };
//# sourceMappingURL=operacao.js.map