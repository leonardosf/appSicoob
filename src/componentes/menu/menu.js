var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Util } from '../../app/util';
import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { LoginPage } from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
var Menu = /** @class */ (function () {
    function Menu(app, http, events, mensagem) {
        var _this = this;
        this.app = app;
        this.http = http;
        this.events = events;
        this.mensagem = mensagem;
        this.agente = null;
        this.versao = Util.VERSAO_ATUAL;
        this.events.subscribe('menu:carregarUsuario', function () {
            _this.carregarUsuario();
        });
    }
    Menu.prototype.carregarUsuario = function () {
        if (this.agente != null) {
            return;
        }
        // this.http.get(Paths.AGENTES).map(res => res.json()).subscribe(
        //     (dados) => {
        //         this.agente = dados;
        //     },
        //     (erro) => {
        //         this.mensagem.erroAlerta('Atenção', erro);
        //         if(erro.status == 401){
        //             this.sair();
        //         }
        //     }
        // );
    };
    Menu.prototype.sair = function () {
        this.app.getRootNav().setPages([
            { page: LoginPage }
        ]);
        this.agente = null;
        this.app.getActiveNav().popToRoot();
    };
    Menu = __decorate([
        Component({
            selector: 'mcc-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [App, Http, Events, MensagemServicoProvider])
    ], Menu);
    return Menu;
}());
export { Menu };
//# sourceMappingURL=menu.js.map