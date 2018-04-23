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
import { NavParams, LoadingController, Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
var ImagemView = /** @class */ (function () {
    function ImagemView(params, viewCtrl, loadingCtrl, events) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.timestamp = new Date().getTime();
        this.imagem = this.params.get('imagem');
        this.index = this.params.get('index');
    }
    ImagemView.prototype.removerImagem = function () {
        this.events.publish('excluirImagem', this.index);
    };
    ImagemView.prototype.abrirCamera = function () {
        this.events.publish('alterarImagem', this.imagem);
    };
    ImagemView.prototype.fechar = function () {
        this.viewCtrl.dismiss();
    };
    ImagemView.prototype.carregada = function () {
        if (this.loading != null) {
            this.loading.dismiss();
        }
    };
    ImagemView = __decorate([
        Component({
            templateUrl: 'imagemview.html',
        }),
        __metadata("design:paramtypes", [NavParams, ViewController, LoadingController, Events])
    ], ImagemView);
    return ImagemView;
}());
export { ImagemView };
//# sourceMappingURL=imagemview.js.map