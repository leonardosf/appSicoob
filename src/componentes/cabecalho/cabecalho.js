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
import { AlertController, App } from 'ionic-angular';
import { ItensMenu } from '../../app/itens.menu';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
var Cabecalho = /** @class */ (function () {
    function Cabecalho(alertCtrl, app, mensagem) {
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.mensagem = mensagem;
        this.icoVoltar = true;
        this.icoHome = false;
        var itensMenu = new ItensMenu();
        this.itens = itensMenu.home().construir();
    }
    Cabecalho.prototype.ngOnInit = function () {
        var itensMenu = new ItensMenu();
        this.itens = itensMenu.home().construir();
    };
    Cabecalho.prototype.exibirAjuda = function () {
        var alert = this.alertCtrl.create({
            title: 'Microcrédito',
            message: '<p>Modalidade de empréstimo que tem por objetivo financiar atividades econômicas a micro empreendedores informais, pequenos empresários formais e a população de baixa renda que desempenham alguma atividade produtiva. </p><p> O Aplicativo Sicoob Microcrédito possibilita às Cooperativas do Sicoob promover a comercialização de crédito, no local onde é realizada a atividade econômica do associado e, ainda, acompanhar a condução da operação.</p>',
            cssClass: 'ajuda-modal',
            buttons: ['OK']
        });
        alert.present();
    };
    Cabecalho.prototype.mudarPagina = function (menu) {
        this.app.getActiveNav().push(menu.pagina);
        this.app.getActiveNav().remove(0, this.app.getActiveNav().getViews().length);
    };
    Cabecalho.prototype.abrir = function (menu) {
        var _this = this;
        if (this.trocaPagina == 'true') {
            this.mudarPagina(menu);
        }
        else if (this.trocaPagina == null || this.trocaPagina == undefined) {
            this.mudarPagina(menu);
        }
        else {
            var params = {
                buttons: [
                    {
                        text: 'Não',
                        role: 'cancel',
                        handler: function () {
                            return;
                        }
                    },
                    {
                        text: 'Sim',
                        handler: function () {
                            _this.mudarPagina(menu);
                        }
                    }
                ]
            };
            this.mensagem.mensagemAlerta('Atenção', 'Você deseja mudar de tela?', params);
        }
    };
    Cabecalho.prototype.isAtiva = function (menu) {
        if (this.app.getActiveNav().getActive().component.name == 'SimuladorPage' &&
            this.app.getActiveNav().getPrevious().component.name == 'PropostaPage' &&
            menu.ativa[0] == 'SelecionarClientePage') {
            return true;
        }
        var atual = this.app.getActiveNav().getActive().component.name;
        return menu.ativa.indexOf(atual) > -1;
    };
    Cabecalho.prototype.voltar = function () {
        this.app.getActiveNav().pop();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Cabecalho.prototype, "trocaPagina", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Cabecalho.prototype, "icoVoltar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Cabecalho.prototype, "icoHome", void 0);
    Cabecalho = __decorate([
        Component({
            selector: 'mcc-cabecalho',
            templateUrl: 'cabecalho.html',
            inputs: ['titulo', 'subtitulo']
        }),
        __metadata("design:paramtypes", [AlertController, App, MensagemServicoProvider])
    ], Cabecalho);
    return Cabecalho;
}());
export { Cabecalho };
//# sourceMappingURL=cabecalho.js.map