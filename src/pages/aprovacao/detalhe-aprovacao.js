var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { EstudoPage } from "../estudo/estudo";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { ParecerEstudoDTO } from "../../model/ParecerEstudoDTO";
import { ParecerAnaliseTecnicaDTO } from "../../model/ParecerAnaliseTecnicaDTO";
var DetalheAprovacaoPage = /** @class */ (function () {
    function DetalheAprovacaoPage(navParams, nav, mensagem) {
        this.navParams = navParams;
        this.nav = nav;
        this.mensagem = mensagem;
        this.itensParecer = [];
        this.abaAprovacao = 'resumoProposta';
        this.acaoParecer = [];
        this.botaoConfirmar = true;
        this.campoAcaoParecer = false;
        this.tomador = navParams.get('tomador');
        this.comporDTOParecer();
        this.comporItens();
        this.comporAcaoParecer();
    }
    DetalheAprovacaoPage.prototype.comporDTOParecer = function () {
        this.parecerEstudoDTO = new ParecerEstudoDTO();
        this.parecerEstudoDTO.dataInicio = new Date("04/10/2018");
        this.parecerEstudoDTO.dataTermino = new Date;
        this.parecerEstudoDTO.usuario = 'usuarioTeste';
        this.parecerEstudoDTO.estado = 'Encaminhada para análise técnica';
        this.parecerEstudoDTO.parecerNegocial = 'teste parecer teste parecer';
    };
    DetalheAprovacaoPage.prototype.comporAcaoParecer = function () {
        this.acaoParecer = [
            {
                descricao: 'Submeter'
            },
            {
                descricao: 'Devolver'
            },
            {
                descricao: 'Aprovar'
            },
            {
                descricao: 'Reprovar'
            }
        ];
    };
    DetalheAprovacaoPage.prototype.comporItens = function () {
        this.itensParecer.push({ titulo: 'Estudo',
            icon: 'mc-icon-pessoa',
            dto: this.parecerEstudoDTO,
            expanded: false
        });
        // this.itensParecer = [
        //     {
        //         titulo: 'Estudo',
        //         icon: 'mc-icon-pessoa',
        //         dto: this.parecerEstudoDTO,
        //         expanded: false
        //     },
        //     {
        //         titulo: 'Análise Tecnica',
        //         icon: 'mc-icon-anotacoes',
        //         dto: '',
        //         expanded: false
        //     }
        // ]
    };
    DetalheAprovacaoPage.prototype.expandItem = function (item) {
        this.itensParecer.map(function (listItem) {
            if (item == listItem && item.dto) {
                listItem.expanded = !item.expanded;
            }
            return listItem;
        });
    };
    DetalheAprovacaoPage.prototype.atualizaAcaoParecer = function () {
        this.botaoConfirmar = false;
    };
    DetalheAprovacaoPage.prototype.confirmar = function () {
        var novoParecer;
        this.parecerAnaliseTecnicaDTO = new ParecerAnaliseTecnicaDTO();
        this.parecerAnaliseTecnicaDTO.dataInicio = new Date;
        this.parecerAnaliseTecnicaDTO.dataTermino = new Date;
        this.parecerAnaliseTecnicaDTO.usuario = 'usuarioTeste';
        this.parecerAnaliseTecnicaDTO.estado = 'Devolvida para estudo';
        this.parecerAnaliseTecnicaDTO.parecerNegocial = this.parecerNegocial;
        novoParecer = { titulo: 'Análise técnica',
            icon: 'mc-icon-anotacoes',
            dto: this.parecerAnaliseTecnicaDTO,
            expanded: false
        };
        this.itensParecer.push(novoParecer);
        this.parecerNegocial = "";
        this.botaoConfirmar = true;
        this.campoAcaoParecer = true;
    };
    DetalheAprovacaoPage.prototype.abrirEstudoProposta = function () {
        console.log(this.mensagem.getTomador);
        this.nav.push(EstudoPage, { tomador: this.mensagem.getTomador() });
    };
    DetalheAprovacaoPage.prototype.imprimir = function () {
    };
    DetalheAprovacaoPage = __decorate([
        Component({
            templateUrl: 'detalhe-aprovacao.html'
        }),
        __metadata("design:paramtypes", [NavParams, NavController, MensagemServicoProvider])
    ], DetalheAprovacaoPage);
    return DetalheAprovacaoPage;
}());
export { DetalheAprovacaoPage };
//# sourceMappingURL=detalhe-aprovacao.js.map