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
import { SimuladorPage } from "../../app/paginas";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Endereco } from "../../model/Endereco";
import { Telefone } from "../../model/Telefone";
import { LimiteTomador } from "../../model/LimiteTomador";
var SelecionarClienteSimuladorPage = /** @class */ (function () {
    function SelecionarClienteSimuladorPage(http, nav, alertCtrl, navParams, mensagem) {
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
        this.limiteCliente = new Array();
    }
    SelecionarClienteSimuladorPage.prototype.consultaPessoaCapes = function () {
        if (!this.cpfCnpj || this.cpfCnpj == null || this.cpfCnpj == '') {
            this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
            return;
        }
        // if(!Util.validarCPFCNPJ(this.cpfCnpj)){
        //   let tipo:string = this.cpfCnpj.length <= 14 ? "CPF" : "CNPJ";
        //   this.mensagem.mensagemAlerta(tipo+' inválido!', 'Informe '+tipo+' válido!');
        //   return;
        // }
        this._consultaPessoaCapes();
        this.preencherInformacoesCliente();
    };
    SelecionarClienteSimuladorPage.prototype.preencherInformacoesCliente = function () {
        this.ultimaRenovacao = new Date();
        this.consultaRealizada = new Date();
        this.riscoCliente = 'R1';
        this.pd = '10%';
        this.riscoBacen = 'A';
        this.limiteCliente.push(new LimiteTomador('Cartão de Crédito', 35000, 32500, 2500));
        this.limiteCliente.push(new LimiteTomador('Cheque Especial', 100000, 100000, 0));
    };
    SelecionarClienteSimuladorPage.prototype._consultaPessoaCapes = function () {
        // let cpfCnpjLimpo = this.cpfCnpj.replace("/", "");
        // let param:ParamPath = new ParamPath();
        // param.adicionar('cpfCnpj', cpfCnpjLimpo);
        // param.adicionar('consultaProposta', "true");
        // this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).
        // subscribe((data) => {
        //   this.tomador = data;
        //   this.tomador.numCpfCnpj = this.cpfCnpj;
        //   if(this.tomador.idPessoa == null){
        //     this.showAlert({
        //       title: 'Cadastro não localizado!',
        //       message: 'Para solicitar Microcrédito é necessário o cadastro do Tomador no CAPES.',
        //       buttons: ['Nova Consulta']
        //     });
        //   }else {
        //     this._validaRegraNegocio();
        //   }
        // });
        this.tomador.nomePessoa = "Carlos",
            this.tomador.numCpfCnpj = "999.999.999-99";
        this.tomador.codTipoPessoa = 1;
        this.tomador.nomeApelido = "Carlos";
        this.tomador.idPessoa = 1;
        this.tomador.dataRenovacaoCadastral = new Date();
        this.tomador.dataInclusaoSistema = new Date();
        this.tomador.dataNascimentoPessoaFisica = new Date();
        var end = new Endereco();
        end.descricao = "Sudoeste";
        end.bairro = "Sudoeste";
        this.tomador.endereco = [end];
        var tel = new Telefone();
        this.tomador.telefones = [tel];
    };
    /*
    * Alterar tomador.numcpfCnpj para codTipoPessoa
    * Alterar Constante Ultil.COD_TIPO_PESSOA_FISICA e Ultil.CODIGO_TIPO_PESSOA_JURICA para 0 e 1 respectivamente
    * Comparar tomador.codTipoPessoa com Ultil.
    */
    SelecionarClienteSimuladorPage.prototype._validaRegraNegocio = function () {
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
    };
    SelecionarClienteSimuladorPage.prototype.abreSimulacaoPage = function () {
        this.mensagem.setInicioProposta("MenuSimulacao");
        this.nav.push(SimuladorPage, { tomadorAvulso: this.tomador });
    };
    SelecionarClienteSimuladorPage.prototype.showAlert = function (customParams) {
        var params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
        var alert = this.alertCtrl.create(params);
        alert.present();
    };
    SelecionarClienteSimuladorPage = __decorate([
        Component({
            templateUrl: 'SelecionarClienteSimulador.html'
        }),
        __metadata("design:paramtypes", [Http,
            NavController,
            AlertController,
            NavParams,
            MensagemServicoProvider])
    ], SelecionarClienteSimuladorPage);
    return SelecionarClienteSimuladorPage;
}());
export { SelecionarClienteSimuladorPage };
//# sourceMappingURL=SelecionarClienteSimulador.js.map