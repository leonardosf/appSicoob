var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from "@angular/http";
import { NavParams, NavController } from "ionic-angular";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Component } from "@angular/core";
import { GarantiaIncluirPage } from "./garantia-incluir";
import { GarantiaDTO } from "../../model/GarantiaDTO";
import { OperacaoPage } from "../../app/paginas";
import { EstudoPage } from "../estudo/estudo";
var GarantiaPage = /** @class */ (function () {
    function GarantiaPage(http, navParams, nav, mensagem) {
        this.http = http;
        this.navParams = navParams;
        this.nav = nav;
        this.mensagem = mensagem;
        this.garantia = new GarantiaDTO();
        this.garantias = new Array();
        this.trocaPagina = true;
        this.tomador = navParams.get('tomador');
        this.nomePessoa = this.tomador.nomePessoa;
        this.numCpfCnpj = this.tomador.numCpfCnpj;
        this.realExigido = 1000;
        this.percRealExigido = 100;
        this.realAlcancado = 1000;
        this.percRealAlcancado = 100;
        this.pessoalExigido = 1;
        this.garantias = navParams.get('garantias');
        console.log(this.garantias);
        if (this.garantias) {
            this.pessoalAlcancado = this.garantias.length;
        }
        else {
            this.garantias = new Array();
            this.pessoalAlcancado = 0;
        }
        this.isMesa = navParams.get('isMesa');
        this.definirBotao();
    }
    GarantiaPage.prototype.definirBotao = function () {
        if (this.isMesa) {
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
        else {
            this.tituloBotao = 'Gravar';
            this.botaoEncaminhar = true;
        }
    };
    GarantiaPage.prototype.voltar = function () {
        this.nav.pop();
        // let tikGarantia:Boolean = true;
        // let tikProposta:Boolean = true;
        // let tikDocumentacao:Boolean = true;
        // this.nav.push(OperacaoPage, {"tomador":this.tomador, tikGarantia, tikProposta, tikDocumentacao});
    };
    GarantiaPage.prototype.incluirGarantia = function () {
        // this.nav.push(GarantiaIncluirPage,  {"isMesa": true });
        this.nav.push(GarantiaIncluirPage, { "garantias": this.garantias });
    };
    GarantiaPage.prototype.cancelar = function () {
        this.nav.push(OperacaoPage, { "tomador": this.tomador });
    };
    GarantiaPage.prototype.botaoHabilitado = function () {
        if (this.tituloBotao == 'Cancelar') {
            this.enviarParaMesa();
        }
        else {
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
    };
    GarantiaPage.prototype.enviarParaEstudo = function () {
        this.mensagem.setFaseAtualProposta("Estudo");
        this.nav.push(EstudoPage, { "tomador": this.tomador });
    };
    GarantiaPage.prototype.enviarParaMesa = function () {
        this.nav.push(OperacaoPage, { "tomador": this.tomador });
    };
    GarantiaPage = __decorate([
        Component({
            templateUrl: 'garantia.html'
        }),
        __metadata("design:paramtypes", [Http, NavParams,
            NavController, MensagemServicoProvider])
    ], GarantiaPage);
    return GarantiaPage;
}());
export { GarantiaPage };
//# sourceMappingURL=garantia.js.map