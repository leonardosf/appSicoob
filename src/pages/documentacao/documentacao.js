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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Paths, ParamPath } from '../../app/paths';
import { Imagem } from '../../model/Imagem';
import { Http } from '@angular/http';
import { Transfer } from '@ionic-native/transfer';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Observable } from 'rxjs/Rx';
import { PropostaPage } from '../microcredito/proposta';
import { DocumentoServico } from '../../providers/documento-servico/documento-servico';
import { Configuracoes } from '../../providers/configuracao/configuracoes';
import { Operacao } from '../../model/Operacao';
import { GarantiaPage, DocumentacaoHomePage } from '../../app/paginas';
var DocumentacaoPage = /** @class */ (function () {
    function DocumentacaoPage(navCtrl, navParams, mensagem, http, transfer, loadingCtrl, nav, documentoServico, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mensagem = mensagem;
        this.http = http;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.documentoServico = documentoServico;
        this.alertCtrl = alertCtrl;
        this.anexarDocumentos = true;
        this.fachadas = new Array();
        this.instalacoes = new Array();
        this.outros = new Array();
        this.tipoDocumento = 'fachada';
        this.tomador = mensagem.getTomador();
        this.tituloFase = this.navParams.get('tituloDocumento');
    }
    DocumentacaoPage.prototype.ionViewDidEnter = function () {
        this.recuperarImagens();
    };
    DocumentacaoPage.prototype.recuperarImagens = function () {
        // let param:ParamPath = ParamPath.parametro('idOperacao', this.tomador.proposta.idOperacaoCredito.toString());
        // this.http.get(Paths.getURL(Paths.OPERACOES_IMAGENS, param)).map(res => res.json()).subscribe(
        //   (dados) => {
        //     if(dados){
        //       this.fachadas = this.getImagensTipo('FACHADA', dados);
        //       this.instalacoes = this.getImagensTipo('INSTAL', dados);
        //       this.outros = this.getImagensTipo('DIEM', dados);
        //     }else{
        //       this.novaImagem(this.fachadas);
        //       this.novaImagem(this.instalacoes);
        //       this.novaImagem(this.outros);
        //     }
        //   },
        //   (error) => {
        //     this.mensagem.mensagemAlerta('Atenção', 'Erro ao recuperar documentos!');
        //   }
        // );
        this.novaImagem(this.fachadas);
        this.novaImagem(this.instalacoes);
        this.novaImagem(this.outros);
    };
    //Duplicado
    DocumentacaoPage.prototype.novaImagem = function (documentos) {
        if (documentos.length >= 6) {
            return;
        }
        documentos.push(Imagem.getNovaImagem());
    };
    DocumentacaoPage.prototype.getImagensTipo = function (tipo, dados) {
        var imagens = new Array();
        for (var _i = 0, dados_1 = dados; _i < dados_1.length; _i++) {
            var imagem = dados_1[_i];
            if (imagem.nome.indexOf(tipo) > -1) {
                imagens.push(new Imagem(imagem.idImagem, imagem.nome, imagem.caminho, imagem.source));
            }
        }
        this.novaImagem(imagens);
        return imagens;
    };
    DocumentacaoPage.prototype.atualizarDocumentoOperacao = function () {
        var operacao = new Operacao();
        operacao.idOperacao = this.tomador.proposta.idOperacaoCredito;
        operacao.documento = this.anexarDocumentos;
        this.http.put(Paths.OPERACOES, operacao).subscribe(function () { });
    };
    DocumentacaoPage.prototype.confirmarExclusao = function () {
        var _this = this;
        var param = {
            title: 'Excluir Imagens!',
            message: 'Confirma a exclusão da imagem?',
            cssClass: 'mensage mensage-alert',
            buttons: [
                { text: 'Não' },
                { text: 'Sim',
                    handler: function () {
                        _this.removerImagens();
                    }
                }
            ],
        };
        var alert = this.alertCtrl.create(param);
        alert.present();
    };
    DocumentacaoPage.prototype.removerImagens = function () {
        var _this = this;
        var param = ParamPath.parametro('idOperacao', this.tomador.proposta.idOperacaoCredito.toString());
        this.http.delete(Paths.getURL(Paths.OPERACOES_REMOVER_IMAGENS, param)).subscribe(function (data) {
            _this.atualizarDocumentoOperacao();
            _this.redirecionarParaProposta();
        });
    };
    DocumentacaoPage.prototype.enviarDocumentacao = function () {
        // if(! this.anexarDocumentos && this.temImagem()){
        //   this.confirmarExclusao();
        //   return;
        // }
        // this.atualizarDocumentoOperacao();
        // let requisicoes:Array<Observable<any>> = new Array<Observable<any>>();
        // requisicoes = requisicoes.concat(this.montarRequisicoes(this.fachadas, 'FACHADA'));
        // requisicoes = requisicoes.concat(this.montarRequisicoes(this.instalacoes, 'INSTAL'));
        // requisicoes = requisicoes.concat(this.montarRequisicoes(this.outros, 'DIEM'));
        // if(requisicoes.length == 0){ //Sem imagens nova para envio
        //   this.redirecionarParaProposta();
        //   return;
        // }
        // let loading = this.loadingCtrl.create();
        // loading.present();
        // Observable.forkJoin(requisicoes).subscribe(
        //   (results) => {
        //     this.resultadoEnvioImagens(results);
        //     loading.dismiss();
        //   }
        // );
        this.nav.push(DocumentacaoHomePage, { tomador: this.tomador, "gravarEncaminhar": "Encaminhar" });
    };
    DocumentacaoPage.prototype.enviarParaGarantia = function () {
        this.nav.push(GarantiaPage, { tomador: this.tomador, "isMesa": false });
    };
    DocumentacaoPage.prototype.resultadoEnvioImagens = function (retornos) {
        var sucessos = 0;
        for (var _i = 0, retornos_1 = retornos; _i < retornos_1.length; _i++) {
            var retorno = retornos_1[_i];
            if (!retorno.error) {
                sucessos++;
            }
        }
        if (sucessos == retornos.length) {
            this.redirecionarParaProposta();
        }
        else {
            var erros = retornos.length - sucessos;
            if (erros == 1) {
                this.mensagem.mensagemAlerta('Atenção', erros + ' imagem não foi enviada!');
            }
            else {
                this.mensagem.mensagemAlerta('Atenção', erros + ' imagens não foram enviadas!');
            }
        }
    };
    DocumentacaoPage.prototype.redirecionarParaProposta = function () {
        this.nav.push(PropostaPage, { "tomador": this.tomador });
    };
    DocumentacaoPage.prototype.montarRequisicoes = function (imagens, tipo) {
        var retorno = new Array();
        var fileTransfer = this.transfer.create();
        var _loop_1 = function (imagem) {
            if (!imagem.isNovaImagem()) {
                return "continue";
            }
            var params = {};
            params['descricao'] = tipo;
            params['idDocumento'] = imagem.idImagem;
            params['identificador'] = this_1.tomador.proposta.idOperacaoCredito;
            var headers = { 'Authorization': 'Bearer ' + Configuracoes.getAccessToken() };
            options = {
                mimeType: "multipart/form-data",
                params: params,
                headers: headers
            };
            var requisicao = Observable.fromPromise(fileTransfer.upload(imagem.caminho, Paths.DOCUMENTACOES_UPLOAD, options).then(function (dados) {
                console.log('sucesso' + imagem.caminho);
                imagem.nome = '';
                imagem.novaImagem(false);
                return Observable.never();
            }).catch(function (erro) {
                console.log(erro);
                imagem.novaImagem(true);
                imagem.nome = 'Não Enviada';
                return Observable.throw(true);
            }));
            retorno.push(requisicao);
        };
        var this_1 = this, options;
        for (var _i = 0, imagens_1 = imagens; _i < imagens_1.length; _i++) {
            var imagem = imagens_1[_i];
            _loop_1(imagem);
        }
        return retorno;
    };
    DocumentacaoPage.prototype.temImagem = function () {
        if (this.fachadas.length == 1 && this.instalacoes.length == 1 && this.outros.length == 1) {
            return false;
        }
        return true;
    };
    DocumentacaoPage.prototype.voltar = function () {
        this.nav.pop();
    };
    DocumentacaoPage = __decorate([
        Component({
            templateUrl: 'documentacao.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, MensagemServicoProvider,
            Http, Transfer, LoadingController, NavController,
            DocumentoServico, AlertController])
    ], DocumentacaoPage);
    return DocumentacaoPage;
}());
export { DocumentacaoPage };
//# sourceMappingURL=documentacao.js.map