var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MensagensErro } from '../app/mensagens.erro';
import { TomadorLSE } from '../model/TomadorLSE';
var MensagemServicoProvider = /** @class */ (function () {
    function MensagemServicoProvider(toastCtrl, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
    }
    MensagemServicoProvider.prototype.setUserLogado = function (nome) {
        this.user = nome;
    };
    MensagemServicoProvider.prototype.getUserLogado = function () {
        return this.user;
    };
    MensagemServicoProvider.prototype.setFaseAtualProposta = function (fase) {
        this.faseAtualProposta = fase;
    };
    MensagemServicoProvider.prototype.getFaseAtualProposta = function () {
        return this.faseAtualProposta;
    };
    MensagemServicoProvider.prototype.setInicioProposta = function (menu) {
        this.inicioProposta = menu;
    };
    MensagemServicoProvider.prototype.getInicioProposta = function () {
        return this.inicioProposta;
    };
    MensagemServicoProvider.prototype.getTomador = function () {
        this.tomador = new TomadorLSE();
        this.tomador.idPessoa = 1;
        this.tomador.nomePessoa = 'Carlos Costa';
        this.tomador.numCpfCnpj = '999.999.999-99';
        return this.tomador;
    };
    MensagemServicoProvider.prototype.erroAlerta = function (titulo, error) {
        this.mensagemAlerta(titulo, this.getMensagem(error));
    };
    MensagemServicoProvider.prototype.mensagemAlerta = function (titulo, mensagem, customParams) {
        if (customParams === void 0) { customParams = null; }
        this.mensagem('mensage-alert', titulo, mensagem, customParams);
    };
    MensagemServicoProvider.prototype.mensagemSucesso = function (titulo, mensagem, customParams) {
        if (customParams === void 0) { customParams = null; }
        this.mensagem('mensage-sucesso', titulo, mensagem, customParams);
    };
    MensagemServicoProvider.prototype.mensagem = function (classe, titulo, mensagem, customParams) {
        if (customParams === void 0) { customParams = null; }
        var params = Object.assign({ cssClass: 'mensage ' + classe, title: titulo, message: mensagem, buttons: ['OK'] }, customParams);
        var alert = this.alertCtrl.create(params);
        alert.present();
    };
    MensagemServicoProvider.prototype.mensagemToast = function (mensagem) {
        var toast = this.toastCtrl.create({
            message: mensagem.toString(),
            duration: 5000,
            position: 'top'
        });
        toast.present();
    };
    MensagemServicoProvider.prototype.getMensagem = function (error) {
        return MensagensErro.getMensagem(error);
    };
    MensagemServicoProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController, AlertController])
    ], MensagemServicoProvider);
    return MensagemServicoProvider;
}());
export { MensagemServicoProvider };
//# sourceMappingURL=mensagem.servico.js.map