var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Imagem } from '../../model/Imagem';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ModalController, Platform, Events, ActionSheetController } from 'ionic-angular';
import { ImagemView } from './imagemview';
import { ParamPath, Paths } from '../../app/paths';
import { Http } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { DocumentoServico } from '../../providers/documento-servico/documento-servico';
var Documento = /** @class */ (function () {
    function Documento(camera, photo, modalCtrl, http, mensagem, plt, events, documentoServico, actionSheetCtrl) {
        this.camera = camera;
        this.photo = photo;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.mensagem = mensagem;
        this.plt = plt;
        this.events = events;
        this.documentoServico = documentoServico;
        this.actionSheetCtrl = actionSheetCtrl;
        this.maxImagens = 6;
        if (this.plt.is('ios')) {
            this.quality = 45;
        }
        else {
            this.quality = 70;
        }
    }
    Documento.prototype.configurarImagem = function (imagem) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Adicionar Imagem',
            buttons: [
                {
                    text: 'Tirar Foto',
                    handler: function () {
                        _this.sourceTypeImage = _this.camera.PictureSourceType.CAMERA;
                        console.log("tirar foto");
                        var options = {
                            quality: _this.quality,
                            targetWidth: 1024,
                            destinationType: _this.camera.DestinationType.FILE_URI,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            cameraDirection: _this.camera.Direction.BACK,
                            correctOrientation: true,
                            sourceType: _this.sourceTypeImage
                        };
                        _this.camera.getPicture(options).then(function (imagemURL) {
                            imagem.novaImagem(true);
                            var criarNovo = !imagem.caminho;
                            imagem.caminho = imagemURL;
                            if (criarNovo) {
                                _this.novaImagem();
                            }
                            imagem.source = null;
                            _this.fecharImageView();
                        });
                    }
                }, {
                    text: 'Buscar na Galeria',
                    handler: function () {
                        _this.sourceTypeImage = _this.camera.PictureSourceType.PHOTOLIBRARY;
                        var options = {
                            quality: _this.quality,
                            targetWidth: 1024,
                            destinationType: _this.camera.DestinationType.FILE_URI,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            cameraDirection: _this.camera.Direction.BACK,
                            correctOrientation: true,
                            sourceType: _this.sourceTypeImage
                        };
                        _this.camera.getPicture(options).then(function (imagemURL) {
                            imagem.novaImagem(true);
                            var criarNovo = !imagem.caminho;
                            imagem.caminho = imagemURL;
                            if (criarNovo) {
                                _this.novaImagem();
                            }
                            imagem.source = null;
                            _this.fecharImageView();
                        });
                    }
                }, {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    Documento.prototype.abrirCamera = function (imagem) {
        this.configurarImagem(imagem);
    };
    Documento.prototype.novaImagem = function () {
        if (this.documentos.length >= this.maxImagens) {
            return;
        }
        var ultimaImagem = this.documentos[this.documentos.length - 1];
        if (ultimaImagem.caminho == null) {
            return;
        }
        this.documentos.push(Imagem.getNovaImagem());
    };
    Documento.prototype.abrirImagem = function (imagem, index) {
        this.desregistrarEventos();
        this.registrarEventos();
        this.documentoServico.carregar(imagem);
        this.modal = this.modalCtrl.create(ImagemView, { imagem: imagem, index: index }, { cssClass: 'modal-imagem' });
        this.modal.present();
    };
    Documento.prototype.removerImagem = function (index) {
        var _this = this;
        var imagem = this.documentos[index];
        if (imagem.idImagem == null) {
            this.documentos.splice(index, 1);
            this.novaImagem();
            this.fecharImageView();
            return;
        }
        var param = ParamPath.parametro('idImagem', imagem.idImagem.toString());
        this.http.delete(Paths.getURL(Paths.IMAGENS, param)).map(function (res) { return res.json(); }).subscribe(function (dados) {
            _this.documentos.splice(index, 1);
            _this.novaImagem();
            _this.fecharImageView();
        }, function (error) {
            _this.mensagem.mensagemAlerta('Atenção', 'A imagem não pode ser excluida!');
        });
    };
    Documento.prototype.desregistrarEventos = function () {
        this.events.unsubscribe('alterarImagem');
        this.events.unsubscribe('excluirImagem');
    };
    Documento.prototype.fecharImageView = function () {
        if (this.modal != null) {
            this.desregistrarEventos();
            this.modal.dismiss();
        }
    };
    Documento.prototype.registrarEventos = function () {
        var _this = this;
        this.events.subscribe('excluirImagem', function (index) {
            _this.removerImagem(index);
        });
        this.events.subscribe('alterarImagem', function (imagem) {
            _this.abrirCamera(imagem);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Documento.prototype, "documentos", void 0);
    Documento = __decorate([
        Component({
            selector: 'documento',
            templateUrl: 'documento.html',
        }),
        __metadata("design:paramtypes", [Camera, PhotoViewer, ModalController,
            Http, MensagemServicoProvider, Platform, Events,
            DocumentoServico, ActionSheetController])
    ], Documento);
    return Documento;
}());
export { Documento };
//# sourceMappingURL=documento.js.map