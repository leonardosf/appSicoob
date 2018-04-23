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
import { Http } from '@angular/http';
import { NavParams, NavController } from 'ionic-angular';
import { Questionario } from '../../model/Questionario';
import { ParamPath, Paths } from '../../app/paths';
import { TomadorLSE } from '../../model/TomadorLSE';
import 'rxjs/Rx';
import { PropostaPage } from '../microcredito/proposta';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Util } from '../../app/util';
var LsePage = /** @class */ (function () {
    function LsePage(http, navParams, nvCtrl, mensagem) {
        this.http = http;
        this.navParams = navParams;
        this.nvCtrl = nvCtrl;
        this.mensagem = mensagem;
        this.questionario = new Questionario();
        this.tomador = new TomadorLSE();
        this.shownItem = null;
        this.preguntasTotal = 0;
        this.preguntasRespostas = 0;
        this.btnIsDisabled = true;
        this.trocaPagina = true;
        this.tomador = navParams.get('tomador');
        this.abreFormularioRespondido = navParams.get("questionarioRespondido");
        this._verificaTipoQuestionario();
        if (this.abreFormularioRespondido) {
            this._getQuestionarioRespondido();
            this.btnIsDisabled = false;
        }
        else {
            this._getQuestionario();
        }
    }
    LsePage.prototype._getQuestionario = function () {
        var _this = this;
        var param = ParamPath.parametro('codTipoPessoa', this._tipoContrato.toString());
        this.http.get(Paths.getURL(Paths.TOMADORES_QUESTIONARIOS, param)).map(function (res) { return res.json(); }).
            subscribe(function (dados) {
            _this.questionario = null;
            _this.questionario = dados;
            _this.preguntasTotal = _this.questionario.perguntas.length;
            _this.trataIndicePerguntas();
            _this._iniciarDesmonstradoresDeContragemDeCaracteres(_this.questionario);
        });
    };
    LsePage.prototype._iniciarDesmonstradoresDeContragemDeCaracteres = function (questionario) {
        for (var _i = 0, _a = questionario.perguntas; _i < _a.length; _i++) {
            var pergunta = _a[_i];
            if (pergunta.tipo == "TEXTO") {
                if (this.abreFormularioRespondido) {
                    this.contarCaracteres(pergunta);
                }
                else {
                    pergunta.quantidadeCaracteres = "0/500";
                }
            }
        }
    };
    LsePage.prototype.contarCaracteres = function (pergunta) {
        if (pergunta.tipo == "TEXTO") {
            pergunta.quantidadeCaracteres = pergunta.resposta.length.toString() + "/500";
        }
    };
    LsePage.prototype._getQuestionarioRespondido = function () {
        var _this = this;
        var param = ParamPath.parametro('idOperacao', this.tomador.proposta.idOperacaoCredito.toString());
        this.http.get(Paths.getURL(Paths.OPERACOES_QUESTIONARIOS, param)).map(function (res) { return res.json(); }).
            subscribe(function (dados) {
            _this.questionario = null;
            _this.questionario = dados;
            _this.preguntasTotal = _this.questionario.perguntas.length;
            _this.trataIndicePerguntas();
            _this._iniciarDesmonstradoresDeContragemDeCaracteres(_this.questionario);
            _this.countRespostas();
        });
    };
    LsePage.prototype.countRespostas = function () {
        var contador = 1;
        for (var _i = 0, _a = this.questionario.perguntas; _i < _a.length; _i++) {
            var pergunta = _a[_i];
            if ((pergunta.resposta != null && pergunta.resposta != "")) {
                this.preguntasRespostas = contador;
                pergunta.cssClass = "success";
                contador++;
                if (!this.abreFormularioRespondido) {
                    this.btnIsDisabled = (this.preguntasRespostas == this.preguntasTotal) ? false : true;
                }
            }
            else {
                pergunta.cssClass = "";
            }
            if (pergunta.resposta != null) {
                this.trocaPagina = false;
            }
        }
    };
    LsePage.prototype.trataIndicePerguntas = function () {
        var contador = 1;
        for (var _i = 0, _a = this.questionario.perguntas; _i < _a.length; _i++) {
            var pergunta = _a[_i];
            if (contador <= 9) {
                contador = "0" + contador.toString();
            }
            pergunta.id = contador;
            contador++;
        }
    };
    LsePage.prototype._verificaTipoQuestionario = function () {
        if (this.tomador.numCpfCnpj.length == 11) {
            this._tipoContrato = Util.TIPO_PESSOA_FISICA;
        }
        else {
            this._tipoContrato = Util.TIPO_PESSOA_JURIDICA;
        }
    };
    LsePage.prototype.enviar = function () {
        var _this = this;
        if (this.abreFormularioRespondido) {
            this.questionario.idOperacao = this.tomador.proposta.idOperacaoCredito;
        }
        this.questionario.idTomador = this.tomador.idPessoa;
        this.questionario.tipoContrato = this._tipoContrato;
        this.questionario.tomadorAssociado = this.tomador.bolAssociado;
        this.questionario.tipoPessoa = this.tomador.codTipoPessoa;
        this.http.post(Paths.LSES, JSON.stringify(this.questionario), null).map(function (res) { return res.json(); }).
            subscribe(function (data) {
            _this.nvCtrl.push(PropostaPage, { "tomador": _this.tomador });
        }, function (error) {
            _this.mensagem.erroAlerta('Atenção', error);
        });
    };
    LsePage = __decorate([
        Component({
            templateUrl: 'lse.html'
        }),
        __metadata("design:paramtypes", [Http, NavParams, NavController, MensagemServicoProvider])
    ], LsePage);
    return LsePage;
}());
export { LsePage };
//# sourceMappingURL=lse.js.map