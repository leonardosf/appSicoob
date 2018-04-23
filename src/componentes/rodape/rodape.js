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
import { App, Keyboard } from 'ionic-angular';
import { ItensMenu } from '../../app/itens.menu';
import { AlertController } from 'ionic-angular';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PageGeneric } from '../../pages/gerenic/pageGeneric';
import { LinhaCredito } from '../../model/LinhaCredito';
import { SimuladorDetalhePage } from '../../app/paginas';
var Rodape = /** @class */ (function () {
    function Rodape(app, keyboard, alertCtrl, mensagem, pageGeneric) {
        this.app = app;
        this.keyboard = keyboard;
        this.alertCtrl = alertCtrl;
        this.mensagem = mensagem;
        this.pageGeneric = pageGeneric;
        this.tomador = this.pageGeneric.getTomador();
        this.faseAtualProposta = mensagem.getFaseAtualProposta();
    }
    // ngOnInit(){
    //     // let itensMenu:ItensMenu = new ItensMenu();
    //     // this.itens = itensMenu.menuRodaPeProposta().menuRodaPeDocumentacao().construir();
    //     this.faseAtualProposta = this.mensagem.getFaseAtualProposta();
    //     console.log("FaseAtual="+this.faseAtualProposta);
    // }
    Rodape.prototype.ngAfterViewInit = function () {
        var itensMenu = new ItensMenu();
        this.faseAtualProposta = this.mensagem.getFaseAtualProposta();
        console.log(this.app.getActiveNav().getActive());
        if (this.mensagem.getInicioProposta() == "MenuSimulacao") {
            console.log("Fluxo Pelo Menu Simulação");
            itensMenu = new ItensMenu();
            switch (this.faseAtualProposta) {
                case "Cadastro": {
                    this.itens = itensMenu.iconRodaPeCadastro().construir();
                    break;
                }
                case "Documentacao": {
                    this.itens = itensMenu.iconRodaPeCadastro().iconRodaPeDocumentacao().construir();
                    break;
                }
                case "Garantia": {
                    this.itens = itensMenu.iconRodaPeCadastro().iconRodaPeDocumentacao().iconRodaPeGarantia().construir();
                    break;
                }
                case "Estudo": {
                    this.itens = itensMenu.iconRodaPeCadastro().iconRodaPeDocumentacao().iconRodaPeGarantia().iconRodaPeEstudo().construir();
                    break;
                }
            }
        }
        else {
            //FLUXO QUANDO A PROPOSTA VIER DO MENU MESA OPERAÇOES
            console.log("Fluxo Pelo Menu Mesa Operações");
            itensMenu = new ItensMenu();
            switch (this.faseAtualProposta) {
                case "Cadastro": {
                    this.itens = itensMenu.iconRodaPeCadastro().construir();
                    break;
                }
                case "Documentacao": {
                    this.itens = itensMenu.iconRodaPeCadastro().iconRodaPeDocumentacao().construir();
                    break;
                }
                case "Garantia": {
                    this.itens = itensMenu.iconRodaPeCadastro().iconRodaPeDocumentacao().iconRodaPeGarantia().construir();
                    break;
                }
                case "Estudo": {
                    this.itens = itensMenu.iconRodaPeCadastro().iconRodaPeDocumentacao().iconRodaPeGarantia().iconRodaPeEstudo().construir();
                    break;
                }
            }
        }
    };
    Rodape.prototype.mudarPagina = function (menu) {
        if (menu.pagina == SimuladorDetalhePage) {
            this.app.getActiveNav().push(menu.pagina, { "tomador": this.tomador,
                nomePessoa: 'Carlos Costa',
                numCpfCnpj: '999.999.999-99',
                tomadorLSE: this.tomador,
                capacidadePagamento: 4,
                linhaDeCredito: (new LinhaCredito(1 + ";" + new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ")),
                parcela: { quantidadeParcelas: '12', maiorValorParcela: 500.00, percentualTaxaJuros: 1.3, primeiroVencimento: '07/03',
                    valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual: 24 },
                valorOperacao: '5000',
                idNsuSimulacao: '1',
                primeiroVencimento: '07/03/2018',
                idOperacaoMicrocredito: '1',
                identificadorLinhacredito: 'Linha de Crédito 1',
                isExcluir: true
            });
        }
        else {
            this.app.getActiveNav().push(menu.pagina, { "tomador": this.tomador });
        }
        this.app.getActiveNav().remove(0, this.app.getActiveNav().getViews().length);
    };
    Rodape.prototype.abrir = function (menu) {
        var _this = this;
        if (this.trocaPagina != undefined) {
            if (this.trocaPagina == 'true') {
                this.mudarPagina(menu);
            }
            else if (this.trocaPagina == null) {
                this.mudarPagina(menu);
            }
            else if (this.trocaPagina == undefined) {
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
        }
    };
    Rodape.prototype.isAtiva = function (menu) {
        if (this.app.getActiveNav().getActive().component.name == 'SimuladorPage' &&
            this.app.getActiveNav().getPrevious().component.name == 'PropostaPage' &&
            menu.ativa[0] == 'SelecionarClientePage') {
            return true;
        }
        var atual = this.app.getActiveNav().getActive().component.name;
        return menu.ativa.indexOf(atual) > -1;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Rodape.prototype, "trocaPagina", void 0);
    Rodape = __decorate([
        Component({
            selector: 'mcc-rodape',
            templateUrl: 'rodape.html',
            inputs: ['menuDocumentacao'],
        }),
        __metadata("design:paramtypes", [App, Keyboard, AlertController, MensagemServicoProvider,
            PageGeneric])
    ], Rodape);
    return Rodape;
}());
export { Rodape };
//# sourceMappingURL=rodape.js.map