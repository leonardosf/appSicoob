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
import { NavParams, LoadingController, NavController, AlertController } from 'ionic-angular';
import { ParamPath, Paths } from '../../app/paths';
import { Http } from '@angular/http';
import { Imagem } from '../../model/Imagem';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { HomePage } from '../../app/paginas';
import { Observable } from 'rxjs/Rx';
import { Transfer } from '@ionic-native/transfer';
import { Configuracoes } from '../../providers/configuracao/configuracoes';
var AcompanhamentoDocumentoPage = /** @class */ (function () {
    function AcompanhamentoDocumentoPage(http, navParams, nav, loadingCtrl, alertCtrl, mensagem, transfer) {
        this.http = http;
        this.navParams = navParams;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.mensagem = mensagem;
        this.transfer = transfer;
        this.fachadas = new Array();
        this.instalacoes = new Array();
        this.outros = new Array();
        this.anexarDocumentos = true;
        this.acompanhamento = navParams.data.acompanhamento;
        this.fachadas.push(Imagem.getNovaImagem());
        this.instalacoes.push(Imagem.getNovaImagem());
        this.outros.push(Imagem.getNovaImagem());
        this.tipoDocumento = "fachada";
    }
    AcompanhamentoDocumentoPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var param = new ParamPath();
        param.adicionar('cpfCnpj', this.acompanhamento.numCpfCnpj);
        param.adicionar('consultaProposta', "false");
        this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.acompanhamento.tomador = data;
        });
    };
    AcompanhamentoDocumentoPage.prototype.registrar = function () {
        if (!this.anexarDocumentos && this.temImagem()) {
            this.confirmarEnvioDescartandoDocumentos();
        }
        else {
            this.finalizarAcompanhamento();
        }
    };
    AcompanhamentoDocumentoPage.prototype.finalizarAcompanhamento = function () {
        var _this = this;
        var acompanhamento = this.acompanhamento;
        delete acompanhamento.exibir;
        delete acompanhamento.tomador;
        this.http.post(Paths.VISITAS, JSON.stringify(acompanhamento)).map(function (res) { return res.json(); }).
            subscribe(function (dados) {
            _this.acompanhamento = dados;
            if (_this.anexarDocumentos) {
                _this.enviarDocumentacaoParaMesa();
            }
            else {
                _this.sinalizarEnvioComSucesso();
            }
        });
    };
    AcompanhamentoDocumentoPage.prototype.confirmarEnvioDescartandoDocumentos = function () {
        var _this = this;
        var params = {
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        return;
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.finalizarAcompanhamento();
                    }
                }
            ]
        };
        this.mensagem.mensagemAlerta('Atenção', 'Os documentos capturados serão descartados, confirma?', params);
    };
    AcompanhamentoDocumentoPage.prototype.voltar = function () {
        this.nav.pop();
    };
    AcompanhamentoDocumentoPage.prototype.temImagem = function () {
        if (this.fachadas.length == 1 && this.instalacoes.length == 1 && this.outros.length == 1) {
            return false;
        }
        return true;
    };
    AcompanhamentoDocumentoPage.prototype.sinalizarEnvioComSucesso = function () {
        var _this = this;
        var params = {
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        _this.nav.push(HomePage);
                    }
                }
            ]
        };
        this.mensagem.mensagemSucesso('Dados enviados com sucesso!', 'Visita registrada', params);
    };
    AcompanhamentoDocumentoPage.prototype.enviarDocumentosPlataformaDeCredito = function () {
        var _this = this;
        this.acompanhamento.visitaAgenda.idOperacao = this.acompanhamento.idOperacao;
        this.http.put(Paths.VISITAS_ENVIO_IMAGENS, JSON.stringify(this.acompanhamento.visitaAgenda)).map(function (res) { return res.json(); }).
            subscribe(function (dados) {
            _this.sinalizarEnvioComSucesso();
        }, function (error) {
            _this.rollbackEmVisita();
            _this.mensagem.mensagemAlerta("Atenção", "Ocorreu um erro ao enviar os documentos para a plataforma de crédito!");
        });
    };
    AcompanhamentoDocumentoPage.prototype.rollbackEmVisita = function () {
        var _this = this;
        var param = ParamPath.parametro('idVisita', this.acompanhamento.visitaAgenda.idVisitaAgenda);
        this.http.delete(Paths.getURL(Paths.VISITAS_REMOVER, param)).map(function (res) { return res.json(); }).
            subscribe(function (dados) {
            _this.configurarComoNovaImagem(_this.fachadas);
            _this.configurarComoNovaImagem(_this.instalacoes);
            _this.configurarComoNovaImagem(_this.outros);
        });
    };
    AcompanhamentoDocumentoPage.prototype.configurarComoNovaImagem = function (imagens) {
        for (var _i = 0, imagens_1 = imagens; _i < imagens_1.length; _i++) {
            var imagem = imagens_1[_i];
            if (imagem.caminho) {
                imagem.novaImagem(true);
            }
        }
    };
    AcompanhamentoDocumentoPage.prototype.enviarDocumentacaoParaMesa = function () {
        var _this = this;
        if (!this.temImagem()) {
            this.mensagem.mensagemAlerta("Atenção", "Nenhuma imagem foi anexada!");
            return;
        }
        var requisicoes = new Array();
        requisicoes = requisicoes.concat(this.montarRequisicoes(this.fachadas, 'FACHADA'));
        requisicoes = requisicoes.concat(this.montarRequisicoes(this.instalacoes, 'INSTAL'));
        requisicoes = requisicoes.concat(this.montarRequisicoes(this.outros, 'DIEM'));
        if (requisicoes.length == 0) {
            this.sinalizarEnvioComSucesso();
            return;
        }
        var loading = this.loadingCtrl.create();
        loading.present();
        Observable.forkJoin(requisicoes).subscribe(function (results) {
            _this.resultadoEnvioImagens(results);
            loading.dismiss();
        });
    };
    AcompanhamentoDocumentoPage.prototype.resultadoEnvioImagens = function (retornos) {
        var sucessos = 0;
        for (var _i = 0, retornos_1 = retornos; _i < retornos_1.length; _i++) {
            var retorno = retornos_1[_i];
            if (!retorno.error) {
                sucessos++;
            }
        }
        if (sucessos == retornos.length) {
            this.enviarDocumentosPlataformaDeCredito();
            return;
        }
        else {
            this.rollbackEmVisita();
            var erros = retornos.length - sucessos;
            if (erros == 1) {
                this.mensagem.mensagemAlerta('Atenção', erros + ' imagem não foi enviada!');
            }
            else {
                this.mensagem.mensagemAlerta('Atenção', erros + ' imagens não foram enviadas!');
            }
        }
    };
    AcompanhamentoDocumentoPage.prototype.montarRequisicoes = function (imagens, tipo) {
        var retorno = new Array();
        var fileTransfer = this.transfer.create();
        var _loop_1 = function (imagem) {
            if (!imagem.isNovaImagem()) {
                return "continue";
            }
            var params = {};
            params['descricao'] = tipo;
            params['idDocumento'] = imagem.idImagem;
            params['identificador'] = this_1.acompanhamento.idOperacao;
            params['identificadorVisita'] = this_1.acompanhamento.visitaAgenda.idVisitaAgenda;
            var headers = { 'Authorization': 'Bearer ' + Configuracoes.getAccessToken() };
            options = {
                mimeType: "multipart/form-data",
                params: params,
                headers: headers
            };
            var requisicao = Observable.fromPromise(fileTransfer.upload(imagem.caminho, Paths.VISITAS_UPLOAD, options).then(function (dados) {
                imagem.nome = '';
                imagem.novaImagem(false);
                return Observable.never();
            }).catch(function (erro) {
                imagem.novaImagem(true);
                imagem.nome = 'Não Enviada';
                return Observable.throw(true);
            }));
            retorno.push(requisicao);
        };
        var this_1 = this, options;
        for (var _i = 0, imagens_2 = imagens; _i < imagens_2.length; _i++) {
            var imagem = imagens_2[_i];
            _loop_1(imagem);
        }
        return retorno;
    };
    AcompanhamentoDocumentoPage = __decorate([
        Component({
            templateUrl: 'acompanhamento-documento.html'
        }),
        __metadata("design:paramtypes", [Http, NavParams, NavController,
            LoadingController, AlertController,
            MensagemServicoProvider, Transfer])
    ], AcompanhamentoDocumentoPage);
    return AcompanhamentoDocumentoPage;
}());
export { AcompanhamentoDocumentoPage };
//# sourceMappingURL=acompanhamento-documento.js.map