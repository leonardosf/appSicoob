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
import { Paths } from '../../app/paths';
import { MensagemDetalhePage } from '../../app/paginas';
import { LoadingController, NavController, AlertController } from 'ionic-angular';
var MensagemPage = /** @class */ (function () {
    function MensagemPage(http, loadingCtrl, nav, alertCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.temResultado = true;
        this.filtroMensagem = "todos";
        this.totalLidas = 0;
        this.totalNaoLidas = 0;
        this.total = 0;
    }
    MensagemPage.prototype.ionViewDidEnter = function () {
        this.consultarMensagens();
    };
    MensagemPage.prototype.consultarMensagens = function () {
        // this.http.get(Paths.MENSAGENS).map(res => res.json()).subscribe(
        //   (dados) => {
        //     if(dados == null || dados == undefined || dados.length <=0){
        //       this.temResultado = false;
        //     }else{
        //       this.mensagens = dados;
        //       this._verificaQuantidade();
        //     }
        //   }
        // );
    };
    MensagemPage.prototype._verificaQuantidade = function () {
        this.total = 0;
        this.totalLidas = 0;
        this.totalNaoLidas = 0;
        for (var _i = 0, _a = this.mensagens; _i < _a.length; _i++) {
            var msg = _a[_i];
            if (!msg.bolExcluido) {
                if (msg.bolLido) {
                    this.totalLidas++;
                }
                if (!msg.bolLido) {
                    this.totalNaoLidas++;
                }
                this.total++;
            }
        }
        if (this.total == 0) {
            this.temResultado = false;
            return;
        }
    };
    MensagemPage.prototype.excluir = function (mensagem) {
        if (!mensagem.bolExcluido) {
            mensagem.bolExcluido = true;
            this._sendUpdate(mensagem);
        }
    };
    MensagemPage.prototype.detalhar = function (mensagem) {
        if (!mensagem.bolLido) {
            mensagem.bolLido = true;
            this._sendUpdate(mensagem);
        }
        this.nav.push(MensagemDetalhePage, { mensagem: mensagem });
    };
    MensagemPage.prototype._sendUpdate = function (mensagem) {
        var _this = this;
        this.http.put(Paths.MENSAGENS, JSON.stringify(mensagem), null).map(function (res) { return res.json(); }).
            subscribe(function (data) {
            _this._verificaQuantidade();
        });
    };
    MensagemPage.prototype.showAlert = function (customParams) {
        var params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
        var alert = this.alertCtrl.create(params);
        alert.present();
    };
    MensagemPage = __decorate([
        Component({
            templateUrl: 'mensagem.html',
        }),
        __metadata("design:paramtypes", [Http, LoadingController, NavController, AlertController])
    ], MensagemPage);
    return MensagemPage;
}());
export { MensagemPage };
//# sourceMappingURL=mensagem.js.map