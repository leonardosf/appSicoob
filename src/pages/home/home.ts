import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Platform, App, NavParams, NavController } from 'ionic-angular';
import { ItensMenu } from '../../app/itens.menu';
import { LoginPage } from '../../app/paginas';
import { Paths } from '../../app/paths';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { TomadorLSE } from '../../model/TomadorLSE';
import { PageGeneric } from '../gerenic/pageGeneric';

@Component({
    templateUrl: 'home.html'
})
export class HomePage {
    private menus;
    private menusAux;
    public cpfCnpj: string;
    public teste;
    public perfil:String;
    quantidadeMensagensNaoLidas = 0;

    constructor(public app: App,
        public nav: NavController,
        private navParams: NavParams,
        private http: Http,
        private platform: Platform,
        public pageGeneric:PageGeneric,
        private mensagem: MensagemServicoProvider) {

        this.carregarQuantidadeMensagensNaoLidas();
        this.menu();
        if (this.platform.is('android')) {
            this.platform.registerBackButtonAction(() => {
                this.sairDaAplicacao();
            });
        }
    }

    private menu() {
        let itensMenu: ItensMenu = new ItensMenu();
        this.menus = itensMenu.simular().operacoes().construir();

        this.perfil = this.mensagem.getUserLogado();
       
        // REMOVER APOS APRESENTAÇÃO DO PROTOTIPO
        if(this.perfil.toUpperCase() != "lojista".toUpperCase()) {
            this.teste = "none";
        }
        

        let itensMenuAux: ItensMenu = new ItensMenu();
        this.menusAux = itensMenuAux.mensagens().construir();
    }

    abrir(menu) {
        if(menu.pagina == "OperacaoPage"){
            this.mensagem.setInicioProposta("MesaOperacacoes");
        }
        this.app.getActiveNav().push(menu.pagina);
    }

    sair() {
        this.app.getActiveNav().push(LoginPage);
    }

    sairDaAplicacao() {
        let view = this.nav.getActive();
        if (view.component.name == "HomePage") {
            let params = {
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => {
                            this.platform.exitApp();
                        }
                    },
                    {
                        text: 'Não',
                        handler: () => {
                            return;
                        }
                    }
                ]
            };
            this.mensagem.mensagemAlerta('Alerta', 'Tem certeza que deseja sair?', params);
        } else {
            this.nav.pop();
        }
    }

    private carregarQuantidadeMensagensNaoLidas(): void {

        // this.http.get(Paths.MENSAGENS_TOTAL_NAO_LIDAS).map(res => res.json()).subscribe(
        //     (dados) => {
        //         this.quantidadeMensagensNaoLidas = dados;
        //     }
        // );
        
    }
}
