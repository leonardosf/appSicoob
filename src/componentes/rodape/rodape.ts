import { Component, Input } from '@angular/core';
import { App, Keyboard } from 'ionic-angular';
import { ItensMenu } from '../../app/itens.menu';
import { AlertController } from 'ionic-angular';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { TomadorLSE } from '../../model/TomadorLSE';
import { PageGeneric } from '../../pages/gerenic/pageGeneric';
import { LinhaCredito } from '../../model/LinhaCredito';
import { SimuladorDetalhePage, EstudoPage } from '../../app/paginas';

@Component({
    selector: 'mcc-rodape',
    templateUrl: 'rodape.html',
    inputs: ['menuDocumentacao'],
})
export class Rodape {
    @Input()
    private trocaPagina:any;
    itensMenu:ItensMenu;
    private tomador:TomadorLSE = this.pageGeneric.getTomador();
    faseAtualProposta: String;

    itens: Array<{titulo: string, icone: string, pagina: any}>;

    constructor(public app: App, public keyboard: Keyboard, public alertCtrl: AlertController, private mensagem: MensagemServicoProvider,
                private pageGeneric:PageGeneric){
        this.faseAtualProposta = mensagem.getFaseAtualProposta();
    }

    // ngOnInit(){
    //     // let itensMenu:ItensMenu = new ItensMenu();
    //     // this.itens = itensMenu.menuRodaPeProposta().menuRodaPeDocumentacao().construir();
    //     this.faseAtualProposta = this.mensagem.getFaseAtualProposta();

    //     console.log("FaseAtual="+this.faseAtualProposta);
    // }
    
    ngAfterViewInit() {

        let itensMenu: ItensMenu = new ItensMenu();
        this.faseAtualProposta = this.mensagem.getFaseAtualProposta();

        //FLUXO QUANDO A PROPOSTA VIER DO MENU SIMULAÇÃO
        if (this.mensagem.getInicioProposta() == "MenuSimulacao") {

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
        } else if(this.mensagem.getInicioProposta() == "Aprovacao") {

             //FLUXO QUANDO A PROPOSTA VIER DA MENU APROVAÇÕES
             itensMenu = new ItensMenu();

            this.itens = itensMenu.iconRodaPeEstudo().iconRodaPeDocumentacao().iconRodaPeImprimir().construir();

        } else {

            //FLUXO QUANDO A PROPOSTA VIER DA MENU MESA OPERAÇOES
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
    }

    mudarPagina(menu){

        if(menu.pagina == SimuladorDetalhePage) {

            this.app.getActiveNav().push(menu.pagina, {"tomador": this.tomador,
                                                        nomePessoa: 'Carlos Costa',
                                                        numCpfCnpj: '999.999.999-99',
                                                        tomadorLSE: this.tomador,
                                                        capacidadePagamento: 4,
                                                        linhaDeCredito: (new LinhaCredito(1 + ";"+ new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ")),
                                                        parcela: {quantidadeParcelas : '12', maiorValorParcela:500.00,  percentualTaxaJuros:1.3, primeiroVencimento: '07/03',
                                                        valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual:24  },
                                                        valorOperacao: '5000',
                                                        idNsuSimulacao: '1',
                                                        primeiroVencimento: '07/03/2018',
                                                        idOperacaoMicrocredito: '1',
                                                        identificadorLinhacredito: 'Linha de Crédito 1',
                                                        isExcluir: true
                                                    });
        } else if(menu.pagina == EstudoPage){
            this.app.getActiveNav().push(menu.pagina, {"tomador": this.tomador, showRodape: true});
        } else {
            this.app.getActiveNav().push(menu.pagina, {"tomador": this.tomador});
        }

        // this.app.getActiveNav().remove(0, this.app.getActiveNav().getViews().length);
    }

    abrir(menu){

        if(this.trocaPagina !=  undefined) {

            if(this.trocaPagina == 'true'){
                this.mudarPagina(menu);
    
            }else if(this.trocaPagina == null){
                this.mudarPagina(menu);
            }
            else if(this.trocaPagina ==  undefined){
    
    
                let params = {
                        buttons: [
                            {
                            text: 'Não',
                            role: 'cancel',
                                handler: () => {
                                    return;
                                }
                            },
                            {
                            text: 'Sim',
                                handler: () => {
                                    this.mudarPagina(menu);
                                }
                            }
                        ]
                    };
                    this.mensagem.mensagemAlerta('Atenção', 'Você deseja mudar de tela?', params);
            
            }
        }

    }
    

    isAtiva(menu){
        if(this.app.getActiveNav().getActive().component.name == 'SimuladorPage' &&
            this.app.getActiveNav().getPrevious().component.name == 'PropostaPage' && 
            menu.ativa[0] == 'SelecionarClientePage'){
                return true;
        }

        let atual:string = this.app.getActiveNav().getActive().component.name;
        return menu.ativa.indexOf(atual) > -1;
    }

}
