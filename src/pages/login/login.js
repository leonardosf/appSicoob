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
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Configuracoes } from '../../providers/configuracao/configuracoes';
import { Storage } from '@ionic/storage';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, http, menu, alertCtrl, mensagem, storage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.mensagem = mensagem;
        this.storage = storage;
        this.user = null;
        this.senha = null;
        this.lembrarUsuario = false;
        this.menu.swipeEnable(false);
        this.menu.close();
        this.carregarInformacoesDoUsuario();
    }
    LoginPage.prototype.logar = function (f) {
        if (f.valid) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', Configuracoes.getAuthorizationToken());
            var options = new RequestOptions({ headers: headers });
            var params = 'grant_type=password&username=sicoob.com.br/' + encodeURIComponent(this.user) + '&password=' + encodeURIComponent(this.senha);
            // this.http.post(Configuracoes.getUrlLogin(), params, options).map(res => res.json()).
            // subscribe((data) => {
            //   Configuracoes.setAccessToken(data.access_token);
            this.autorizarAcesso();
            // },
            // (erro) =>{
            //   this.mensagem.erroAlerta("Atenção", erro);
            // });
        }
    };
    LoginPage.prototype.autorizarAcesso = function () {
        // this.http.get(Paths.AUTORIZACOES).subscribe(
        //   () => {
        // SET PERFIL PARA PROTOTICO
        this.perfil = this.user;
        this.verificarVersaoApp();
        // },
        // (erro) =>{
        //   this.mensagem.erroAlerta("Atenção", erro);
        // });
    };
    LoginPage.prototype.armazenarInformacoesDoUsuario = function () {
        this.storage.set("lembrarUsuario", this.lembrarUsuario);
        this.storage.set("usuario", this.lembrarUsuario ? this.user : '');
        this.mensagem.setUserLogado(this.user);
    };
    LoginPage.prototype.verificarVersaoApp = function () {
        // this.http.get(Paths.VERSAO).map(res => res.json()).
        // subscribe((data) => {
        //   this.versao = data;
        //   if(this.versao.numVersao === Util.VERSAO_ATUAL){
        this.navCtrl.push(HomePage);
        this.armazenarInformacoesDoUsuario();
        //   }else{
        //     this.mensagem.mensagemAlerta("Atenção", "O aplicativo encontra-se desatualizado. Favor realizar atualização!");
        //   }
        // },
        // (erro) =>{
        //   this.mensagem.erroAlerta("Atenção", erro);      
        // });
    };
    LoginPage.prototype.carregarInformacoesDoUsuario = function () {
        var _this = this;
        this.storage.get("lembrarUsuario").then(function (lembrar) {
            _this.lembrarUsuario = lembrar;
        });
        this.storage.get("usuario").then(function (usuario) {
            _this.user = usuario;
        });
    };
    LoginPage = __decorate([
        Component({
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController, Http, MenuController,
            AlertController, MensagemServicoProvider,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map