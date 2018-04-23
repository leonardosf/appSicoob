var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Platform, App, NavParams, NavController } from 'ionic-angular';
import { ItensMenu } from '../../app/itens.menu';
import { LoginPage } from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PageGeneric } from '../gerenic/pageGeneric';
import { OperacaoPage } from '../operacao/operacao';
var HomePage = /** @class */ (function () {
    function HomePage(app, nav, navParams, http, platform, pageGeneric, mensagem) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navParams = navParams;
        this.http = http;
        this.platform = platform;
        this.pageGeneric = pageGeneric;
        this.mensagem = mensagem;
        this.quantidadeMensagensNaoLidas = 0;
        this.carregarQuantidadeMensagensNaoLidas();
        this.menu();
        if (this.platform.is('android')) {
            this.platform.registerBackButtonAction(function () {
                _this.sairDaAplicacao();
            });
        }
    }
    HomePage.prototype.menu = function () {
        var itensMenu = new ItensMenu();
        this.menus = itensMenu.simular().operacoes().aprovacao().construir();
        this.perfil = this.mensagem.getUserLogado();
        // REMOVER APOS APRESENTAÇÃO DO PROTOTIPO
        if (this.perfil.toUpperCase() != "lojista".toUpperCase()) {
            this.teste = "none";
        }
        var itensMenuAux = new ItensMenu();
        this.menusAux = itensMenuAux.mensagens().construir();
    };
    HomePage.prototype.abrir = function (menu) {
        if (menu.pagina == OperacaoPage) {
            this.mensagem.setInicioProposta("MesaOperacacoes");
        }
        this.app.getActiveNav().push(menu.pagina);
    };
    HomePage.prototype.sair = function () {
        this.app.getActiveNav().push(LoginPage);
    };
    HomePage.prototype.sairDaAplicacao = function () {
        var _this = this;
        var view = this.nav.getActive();
        if (view.component.name == "HomePage") {
            var params = {
                buttons: [
                    {
                        text: 'Sim',
                        handler: function () {
                            _this.platform.exitApp();
                        }
                    },
                    {
                        text: 'Não',
                        handler: function () {
                            return;
                        }
                    }
                ]
            };
            this.mensagem.mensagemAlerta('Alerta', 'Tem certeza que deseja sair?', params);
        }
        else {
            this.nav.pop();
        }
    };
    HomePage.prototype.carregarQuantidadeMensagensNaoLidas = function () {
        // this.http.get(Paths.MENSAGENS_TOTAL_NAO_LIDAS).map(res => res.json()).subscribe(
        //     (dados) => {
        //         this.quantidadeMensagensNaoLidas = dados;
        //     }
        // );
    };
    HomePage = __decorate([
        Component({
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [App,
            NavController,
            NavParams,
            Http,
            Platform,
            PageGeneric,
            MensagemServicoProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map