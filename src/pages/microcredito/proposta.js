var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TomadorLSE } from "./../../model/TomadorLSE";
import { NavController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { LsePage } from "../../app/paginas";
import { Http } from "@angular/http";
import { ParamPath, Paths } from "../../app/paths";
import { Util } from '../../app/util';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { SelecionarClientePage } from './SelecionarCliente';
import { SimuladorDetalhePage } from "../simulador/simulador-detalhe";
import { LinhaCredito } from "../../model/LinhaCredito";
import { GarantiaPage } from "../garantia/garantia";
import { DocumentacaoHomePage } from "../documentacao/documentacao-home";
var PropostaPage = /** @class */ (function () {
    function PropostaPage(http, navParams, nav, mensagem) {
        this.http = http;
        this.navParams = navParams;
        this.nav = nav;
        this.mensagem = mensagem;
        this.documentosIsDisabled = true;
        this.botaoEnviarDisabled = true;
        this.simulacaoPreenchida = navParams.get("tikProposta");
        this.documentosPreenchidos = navParams.get("tikDocumentacao");
        this.garantiaPreenchida = navParams.get("tikGarantia");
        // this.tomador = navParams.get("tomador");
        this.tomador = new TomadorLSE;
        // localStorage.setItem("tomador", JSON.stringify(this.tomador));
        this._consultaPessoaCapes();
    }
    PropostaPage.prototype.abreTelaLSE = function () {
        this.nav.push(LsePage, { tomador: this.tomador, "questionarioRespondido": this._carregarQuestionarioRespondido });
    };
    PropostaPage.prototype.abreTelaSimulacao = function () {
        // this.nav.push(SimuladorPage);
        this.nav.push(SimuladorDetalhePage, { tomador: this.tomador,
            nomePessoa: 'Carlos Costa',
            numCpfCnpj: '999.999.999-99',
            tomadorLSE: this.tomador,
            capacidadePagamento: 4,
            linhaDeCredito: (new LinhaCredito(1 + ";" + new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ")),
            parcela: { quantidadeParcelas: '12', maiorValorParcela: 500.00, percentualTaxaJuros: 1.3, primeiroVencimento: '07/03',
                valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual: 24 },
            valorOperacao: '5000',
            idNsuSimulacao: '1',
            primeiroVencimento: new Date('07/03/2018'),
            idOperacaoMicrocredito: '1',
            identificadorLinhacredito: 'Linha de Crédito 1',
            isExcluir: true
        });
    };
    PropostaPage.prototype.abreTelaGarantia = function () {
        // this.nav.push(SimuladorPage);
        this.nav.push(GarantiaPage, { "tomador": this.tomador, "isMesa": false });
    };
    PropostaPage.prototype.abrirDocumentacao = function () {
        this.nav.push(DocumentacaoHomePage, { "tomador": this.tomador });
    };
    PropostaPage.prototype._consultaPessoaCapes = function () {
        var cpfCnpjLimpo = '999999999999';
        var param = new ParamPath();
        param.adicionar('cpfCnpj', cpfCnpjLimpo);
        param.adicionar('consultaProposta', "true");
        this.tomador.idPessoa = 1;
        this.tomador.idInstituicao = 1;
        this.tomador.nomePessoa = 'Carlos';
        this.tomador.numCpfCnpj = '999.999.999-99';
        this.tomador.codTipoPessoa = 1;
        this.tomador.nomeApelido = 'Bolinha';
        this.tomador.showDetails = true;
        this.tomador.show = true;
        this.tomador.codigoAtividadeEconomica = 1;
        this.tomador.autorizaConsultaBacen = true;
        this.tomador.dataInclusaoSistema = new Date;
        this.tomador.dataRenovacaoCadastral = new Date;
        this.tomador.dataNascimentoPessoaFisica = new Date;
        this.tomador.bolAssociado = true;
        this.tomador.hasDocument = false;
        this._verificaRegrasDeNegocio();
        // this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).
        // subscribe((data) => {
        //   this.tomador = data;
        //   this._verificaRegrasDeNegocio();
        // });
    };
    PropostaPage.prototype.enviarProposta = function () {
        var _this = this;
        this.http.post(Paths.PROPOSTAS, JSON.stringify(this.tomador.proposta), null).map(function (res) { return res.json(); }).
            subscribe(function (data) {
            _this.mensagem.mensagemAlerta('Dados enviados com sucesso!', 'Proposta enviada para análise!');
            _this.nav.push(SelecionarClientePage);
        });
    };
    PropostaPage.prototype._verificaRegrasDeNegocio = function () {
        if (this.tomador.proposta != null && (!this.tomador.proposta.novo)) {
            this._carregarQuestionarioRespondido = true;
            switch (this.tomador.proposta.idEstadoOperacao) {
                case Util.OPERACAO_EM_ANALISE:
                    this._controleOperacaoEmAnalise();
                    break;
                case Util.OPERACAO_EM_AJUSTE:
                    this._controleOperacaoEmAjuste();
                    break;
            }
        }
        else {
            this._controleNovoContrato();
        }
    };
    PropostaPage.prototype._verificaPendencia = function () {
        switch (this.tomador.proposta.idTipoPendencia) {
            case Util.SEM_PENDENCIA:
                this._controleSemPendencia();
                break;
            case Util.AJUSTE_LSE_SIMULACAO:
                this._controlePendenciaLSESimulacao();
                break;
            case Util.AJUSTE_DOCUMENTOS:
                this._controlePendenciaDocumentos();
                break;
            case Util.AJUSTE_NA_SIMULACAO:
                this._controlePendenciaSimulacao();
                break;
            case Util.AJUSTE_NA_SIMULACAO_E_DOCUMENTOS:
                this._controlePendenciaSimulacaoDocumentos();
                break;
            case Util.AJUSTE_EM_TODOS:
                this._pendenciaEmTodos();
                break;
            default:
                this.todosHabilitados();
                break;
        }
    };
    PropostaPage.prototype.verificaBotaoEnviar = function () {
        if (this.lsePreenchido && this.simulacaoPreenchida && this.documentosPreenchidos) {
            this.botaoEnviarDisabled = false;
        }
    };
    //CONTROLES DE TELA
    PropostaPage.prototype._controleNovoContrato = function () {
        // this.lseIsDisabled = false;
        // this.lsePreenchido = false;
        // this.simulacaoIsDisabled = true;
        // this.simulacaoPreenchida = false;
        // this.documentosIsDisabled = true;
        // this.documentosPreenchidos = false;
        // this.lsePreenchido = false;
        // this.simulacaoPreenchida = false;
        // this.documentosPreenchidos = false;
        this.lseIsDisabled = false;
        this.lsePreenchido = true;
        this.simulacaoIsDisabled = false;
        // this.simulacaoPreenchida = false;
        this.documentosIsDisabled = false;
        // this.documentosPreenchidos = false;
        this.lsePreenchido = false;
        // this.simulacaoPreenchida = false;
        // this.documentosPreenchidos = false;
    };
    PropostaPage.prototype._pendenciaEmTodos = function () {
        this.lsePreenchido = false;
        this.simulacaoPreenchida = false;
        this.documentosPreenchidos = false;
        this._simulacaoDesabilitada();
        this._lseHabilitado();
        this._documentoDesabilitado();
    };
    PropostaPage.prototype._controleOperacaoEmAnalise = function () {
        this.lseIsDisabled = true;
        this.documentosIsDisabled = true;
        this.lsePreenchido = true;
        this.lsePreenchido = true;
        this.simulacaoPreenchida = true;
        this.documentosPreenchidos = true;
    };
    PropostaPage.prototype._controleOperacaoEmAjuste = function () {
        this.lseIsDisabled = false;
        this.lsePreenchido = true;
        this.simulacaoIsDisabled = false;
        //this.simulacaoPreenchida = this.tomador.proposta.idSimulacao != null;
        if (this.tomador.proposta != null) {
            this.lsePreenchido = true;
        }
        if (this.tomador.proposta.idSimulacao != null) {
            this._simulacaoHabilitada();
            this.simulacaoPreenchida = true;
            this._documentosHabilitado();
        }
        //verificar documentos
        if (this.tomador.hasDocument) {
            //this._documentosHabilitado();
            this.documentosPreenchidos = true;
        }
        else {
            //this._documentoDesabilitado();
            this.documentosPreenchidos = false;
        }
        if (this.tomador.proposta.idTipoPendencia != null) {
            this._verificaPendencia();
        }
        this.verificaBotaoEnviar();
    };
    PropostaPage.prototype._controleSemPendencia = function () {
        this.todosHabilitados();
        this.lsePreenchido = true;
        this.simulacaoPreenchida = true;
        this.documentosPreenchidos = true;
    };
    PropostaPage.prototype._controlePendenciaLSESimulacao = function () {
        this._lseHabilitado();
        this._simulacaoDesabilitada();
        this._documentoDesabilitado();
        this.documentosPreenchidos = false;
        this.lsePreenchido = false;
        this.simulacaoPreenchida = false;
    };
    PropostaPage.prototype._controlePendenciaDocumentos = function () {
        this._lseDesabilitado();
        this._simulacaoDesabilitada();
        this._documentosHabilitado();
        this.lsePreenchido = true;
        this.simulacaoPreenchida = true;
        this.documentosPreenchidos = false;
    };
    PropostaPage.prototype._controlePendenciaSimulacaoDocumentos = function () {
        this._lseDesabilitado();
        this.lsePreenchido = true;
        this.simulacaoPreenchida = false;
        this.documentosPreenchidos = false;
        this._simulacaoHabilitada();
        this._documentoDesabilitado();
    };
    PropostaPage.prototype._controlePendenciaSimulacao = function () {
        this._lseHabilitado();
        this._simulacaoHabilitada();
        this._documentoDesabilitado();
        this.lsePreenchido = true;
        this.simulacaoPreenchida = false;
        this.documentosPreenchidos = true;
    };
    PropostaPage.prototype._lseHabilitado = function () {
        this.lseIsDisabled = false;
    };
    PropostaPage.prototype._lseDesabilitado = function () {
        this.lseIsDisabled = true;
    };
    PropostaPage.prototype._simulacaoHabilitada = function () {
        this.simulacaoIsDisabled = false;
    };
    PropostaPage.prototype._simulacaoDesabilitada = function () {
        this.simulacaoIsDisabled = true;
    };
    PropostaPage.prototype._documentosHabilitado = function () {
        this.documentosIsDisabled = false;
    };
    PropostaPage.prototype._documentoDesabilitado = function () {
        this.documentosIsDisabled = true;
    };
    PropostaPage.prototype.todosHabilitados = function () {
        this.lseIsDisabled = false;
        this.simulacaoIsDisabled = false;
        this.documentosIsDisabled = false;
    };
    PropostaPage = __decorate([
        Component({
            templateUrl: 'proposta.html'
        }),
        __metadata("design:paramtypes", [Http,
            NavParams,
            NavController,
            MensagemServicoProvider])
    ], PropostaPage);
    return PropostaPage;
}());
export { PropostaPage };
//# sourceMappingURL=proposta.js.map