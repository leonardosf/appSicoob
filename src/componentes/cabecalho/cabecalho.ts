import { Component, Input } from '@angular/core';
import { AlertController, App } from 'ionic-angular';
import { ItensMenu } from '../../app/itens.menu';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';

@Component({
    selector: 'mcc-cabecalho',
    templateUrl: 'cabecalho.html',
    inputs: ['titulo', 'subtitulo']
})
export class Cabecalho {
    @Input()
    private trocaPagina:any;
    @Input()
    private icoVoltar:boolean = true;
    @Input()
    private icoHome:boolean = false;

    itens: Array<{ titulo: string, icone: string, pagina: any }>;

    constructor(public alertCtrl: AlertController, public app: App, private mensagem: MensagemServicoProvider) {
        let itensMenu:ItensMenu = new ItensMenu();
        this.itens = itensMenu.home().construir();
    }

    ngOnInit() {
        let itensMenu: ItensMenu = new ItensMenu();
        this.itens = itensMenu.home().construir();
    }
    exibirAjuda() {
        let alert = this.alertCtrl.create({
            title: 'Microcrédito',
            message: '<p>Modalidade de empréstimo que tem por objetivo financiar atividades econômicas a micro empreendedores informais, pequenos empresários formais e a população de baixa renda que desempenham alguma atividade produtiva. </p><p> O Aplicativo Sicoob Microcrédito possibilita às Cooperativas do Sicoob promover a comercialização de crédito, no local onde é realizada a atividade econômica do associado e, ainda, acompanhar a condução da operação.</p>',
            cssClass: 'ajuda-modal',
            buttons: ['OK']
        });
        alert.present();
    }

    mudarPagina(menu) {
        this.app.getActiveNav().push(menu.pagina);
        this.app.getActiveNav().remove(0, this.app.getActiveNav().getViews().length);
    }

    abrir(menu) {

        if (this.trocaPagina == 'true') {
            this.mudarPagina(menu);

        } else if (this.trocaPagina == null || this.trocaPagina == undefined) {
            this.mudarPagina(menu);
        }
        else {


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

    isAtiva(menu){
        if(this.app.getActiveNav().getActive().component.name == 'SimuladorPage' &&
            this.app.getActiveNav().getPrevious().component.name == 'PropostaPage' && 
            menu.ativa[0] == 'SelecionarClientePage'){
                return true;
        }

        let atual:string = this.app.getActiveNav().getActive().component.name;
        return menu.ativa.indexOf(atual) > -1;
    }

    voltar() {
        this.app.getActiveNav().pop();
    }
}
