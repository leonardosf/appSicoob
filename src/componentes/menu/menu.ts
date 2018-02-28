import { Util } from '../../app/util';
import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import {LoginPage} from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Paths } from '../../app/paths';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

@Component({
    selector: 'mcc-menu',
    templateUrl: 'menu.html',
})
export class Menu {
    private agente=null;
    versao:string = Util.VERSAO_ATUAL;

    constructor(private app: App, private http: Http, private events: Events, private mensagem: MensagemServicoProvider){
        this.events.subscribe('menu:carregarUsuario', () => {
            this.carregarUsuario();
        });
    }

    public carregarUsuario(){
        if(this.agente != null){
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
    }

    public sair(){
        this.app.getRootNav().setPages([
            { page: LoginPage }
        ]);
        this.agente = null;
        this.app.getActiveNav().popToRoot();
    }
}
