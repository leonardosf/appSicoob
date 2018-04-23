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
import { DocumentacaoPage } from "./documentacao";
import { Documento } from "../../model/Documento";
import { FaseDocumento } from "../../model/FaseDocumento";
import { GarantiaPage } from "../../app/paginas";
import { OperacaoPage } from "../operacao/operacao";
var DocumentacaoHomePage = /** @class */ (function () {
    function DocumentacaoHomePage(http, navParams, nav, mensagem) {
        this.http = http;
        this.navParams = navParams;
        this.nav = nav;
        this.mensagem = mensagem;
        this.faseDocumento = new Array();
        this.documentos = new Array();
        this.trocaPagina = true;
        this.tomador = mensagem.getTomador();
        console.log(this.tomador);
        this.nomePessoa = this.tomador.nomePessoa;
        this.numCpfCnpj = this.tomador.numCpfCnpj;
        this.documentos.push(new Documento(1, 'CPF', 'Cadastro de Pessoa Física do tomador', 'cpf.png'));
        this.documentos.push(new Documento(2, 'RG', 'Documento de identidade do tomador', 'rg.png'));
        this.faseDocumento.push(new FaseDocumento('Documentação', this.documentos));
        this.documentos = new Array();
        this.documentos.push(new Documento(3, 'Título de Eleitor', 'Título de Eleitor do tomador', null));
        this.faseDocumento.push(new FaseDocumento('Garantia Real', this.documentos));
        this.isMesa = navParams.get('isMesa');
        this.definirBotao();
    }
    ;
    DocumentacaoHomePage.prototype.definirBotao = function () {
        if (this.isMesa) {
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
        else {
            this.tituloBotao = 'Gravar';
            this.botaoEncaminhar = true;
        }
    };
    DocumentacaoHomePage.prototype.abreTelaDocumentacao = function (tituloFase) {
        this.nav.push(DocumentacaoPage, { tomador: this.tomador, tituloDocumento: tituloFase });
    };
    DocumentacaoHomePage.prototype.enviarParaGarantia = function () {
        this.mensagem.setFaseAtualProposta("Garantia");
        this.nav.push(GarantiaPage, { tomador: this.tomador, "isMesa": false });
    };
    DocumentacaoHomePage.prototype.gravarDocumento = function () {
        if (this.tituloBotao == 'Cancelar') {
            this.nav.push(OperacaoPage, { "tomador": this.tomador });
        }
        else {
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
    };
    DocumentacaoHomePage = __decorate([
        Component({
            templateUrl: 'documentacao-home.html'
        }),
        __metadata("design:paramtypes", [Http, NavParams,
            NavController, MensagemServicoProvider])
    ], DocumentacaoHomePage);
    return DocumentacaoHomePage;
}());
export { DocumentacaoHomePage };
//# sourceMappingURL=documentacao-home.js.map