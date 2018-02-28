import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'relatorio-detalhes.html'
})
export class RelatorioDetalhesPage {
  private cabecalho:any;
  private relatorio:any;
  private tituloPagina:string="Relatório | Detalhes";

  constructor(private params: NavParams, private http: Http, public nav: NavController,
              private mensagem: MensagemServicoProvider, public events: Events,
              private loadingCtrl: LoadingController) {
    this.cabecalho = params.data.cabecalho;
    this.relatorio = params.data.relatorio;
    if (params.data.visita) {
      this.tituloPagina="Visita | Detalhes financeiros";
    }
  }

  public ionViewDidEnter(){
    
  }

  public voltar(){
    this.nav.pop();
  }

  
}
