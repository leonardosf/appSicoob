var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Util } from "./../../app/util";
import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { TomadorLSE } from "../../model/TomadorLSE";
import { ParamPath, Paths } from "../../app/paths";
import { PropostaPage } from "../../app/paginas";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
var SelecionarClientePage = /** @class */ (function () {
    function SelecionarClientePage(http, nav, alertCtrl, navParams, mensagem) {
        //    this.recuperarEstadosOperacao();
        this.http = http;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.mensagem = mensagem;
        this.tomador = new TomadorLSE();
        this.tipoPessoa = "CPF";
        this.inputMaskCPF = Util.mask.CPF;
        this.inputMaskCNPJ = Util.mask.CNPJ;
        this.exibirConteudoTomador = true;
        this.habilitaBotaoNovo = true;
        if (this.navParams.get("cpfCnpj")) {
            //tela sendo chamada
            this.cpfCnpj = this.navParams.get("cpfCnpj");
            this.consultaPessoaCapes();
        }
        this.preencherInformacoesCliente();
    }
    SelecionarClientePage.prototype.preencherInformacoesCliente = function () {
        this.ultimaRenovacao = new Date();
        this.consultaRealizada = new Date();
        this.riscoCliente = 'A';
        this.pd = '?';
        this.riscoBacen = 'Risco Inexistente';
    };
    SelecionarClientePage.prototype.consultaPessoaCapes = function () {
        if (!this.cpfCnpj || this.cpfCnpj == null || this.cpfCnpj == '') {
            this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
            return;
        }
        if (!Util.validarCPFCNPJ(this.cpfCnpj)) {
            var tipo = this.cpfCnpj.length <= 14 ? "CPF" : "CNPJ";
            this.mensagem.mensagemAlerta(tipo + ' inválido!', 'Informe ' + tipo + ' válido!');
            return;
        }
        this._consultaPessoaCapes();
    };
    SelecionarClientePage.prototype._consultaPessoaCapes = function () {
        var _this = this;
        var cpfCnpjLimpo = this.cpfCnpj.replace("/", "");
        var param = new ParamPath();
        param.adicionar('cpfCnpj', cpfCnpjLimpo);
        param.adicionar('consultaProposta', "true");
        this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(function (res) { return res.json(); }).
            subscribe(function (data) {
            _this.tomador = data;
            _this.tomador.numCpfCnpj = _this.cpfCnpj;
            if (_this.tomador.idPessoa == null) {
                _this.showAlert({
                    title: 'Cadastro não localizado!',
                    message: 'Para solicitar Microcrédito é necessário o cadastro do Tomador no CAPES.',
                    buttons: ['Nova Consulta']
                });
            }
            else if (!_this.tomador.bolAssociado) {
                _this.exibirConteudoTomador = false;
                _this.cpfCnpj = "";
                _this.showAlert({
                    title: 'Operacação não permitida!',
                    message: 'O Tomador não é cliente.',
                    buttons: ['Nova Consulta']
                });
            }
            else {
                //this._verificaEstadoOperacao();
                if (_this._validaRegraNegocio()) {
                }
            }
        });
    };
    SelecionarClientePage.prototype.disparaConsultaITX = function () {
        var cpfCnpjLimpo = this.tomador.numCpfCnpj.replace("/", "");
        var param = ParamPath.parametro('cpfCnpj', cpfCnpjLimpo);
        this.http.head(Paths.getURL(Paths.TOMADORES_NOTA_RISCO, param)).
            subscribe(function (data) { console.log(data); });
    };
    /*
    * Alterar tomador.numcpfCnpj para codTipoPessoa
    * Alterar Constante Ultil.COD_TIPO_PESSOA_FISICA e Ultil.CODIGO_TIPO_PESSOA_JURICA para 0 e 1 respectivamente
    * Comparar tomador.codTipoPessoa com Ultil.
    */
    SelecionarClientePage.prototype._validaRegraNegocio = function () {
        console.log(this.tomador);
        this.exibirConteudoTomador = true;
        if (!this.tomador.autorizaConsultaBacen) {
            this.showAlert({
                title: 'Operação não permitida!',
                message: 'Tomador não autoriza consulta ao BACEN!',
                buttons: ['Nova Consulta']
            });
            this.exibirConteudoTomador = false;
            this.cpfCnpj = "";
            return false;
        }
        if (!this.tomador.bolAssociado) {
            if (this.tomador.numCpfCnpj.length == 14) {
                if ((this.tomador.dataNascimentoPessoaFisica == null) || (this.tomador.dataNascimentoPessoaFisica == undefined)) {
                    this.showAlert({
                        title: 'Operação não permitida!',
                        message: 'Tomador sem data de nascimento no CAPES!',
                        buttons: ['Nova Consulta']
                    });
                    this.exibirConteudoTomador = false;
                    this.cpfCnpj = "";
                    return false;
                }
            }
            else if (this.tomador.numCpfCnpj.length == 18) {
                this.showAlert({
                    title: 'Operação não permitida!',
                    message: 'Tomador não é associado!',
                    buttons: ['Nova Consulta']
                });
                this.cpfCnpj = "";
                this.exibirConteudoTomador = false;
                return false;
            }
            return true;
        }
        if (!this.tomador.proposta.novo) {
            if (this.tomador.proposta.idEstadoOperacao != Util.OPERACAO_EM_AJUSTE) {
                this.showAlert({
                    title: 'Operação não permitida!',
                    message: 'O tomador já possui uma proposta em andamento. Não é possível cadastrar uma nova!',
                    buttons: ['Nova Consulta']
                });
                this.exibirConteudoTomador = false;
                this.cpfCnpj = "";
                return false;
            }
        }
    };
    SelecionarClientePage.prototype.abrePropostaPage = function () {
        /***
         * A proposta pode ser editada pelo agente de microcrédito que realizou o cadastro
         * ou em casos onde o agente responsavel encontra-se inativo ou com sua virgencia de acesso interrompida
         *
         */
        if ((this.tomador.proposta != null || this.tomador.proposta != undefined) &&
            !this.tomador.proposta.podeSerEditada) {
            this.showAlert({
                title: 'Operação não permitida!',
                message: 'Proposta captada por outro agente de microcrédito!',
                buttons: ['Nova Consulta']
            });
            return false;
        }
        this.disparaConsultaITX();
        this.nav.push(PropostaPage, { tomador: this.tomador });
    };
    SelecionarClientePage.prototype.showAlert = function (customParams) {
        var params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
        var alert = this.alertCtrl.create(params);
        alert.present();
    };
    SelecionarClientePage = __decorate([
        Component({
            templateUrl: 'SelecionarCliente.html'
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            AlertController,
            NavParams,
            MensagemServicoProvider])
    ], SelecionarClientePage);
    return SelecionarClientePage;
}());
export { SelecionarClientePage };
//# sourceMappingURL=SelecionarCliente.js.map