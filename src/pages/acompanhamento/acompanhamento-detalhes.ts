import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { AcompanhamentoRegistrarPage } from '../../app/paginas';

@Component({
  templateUrl: 'acompanhamento-detalhes.html'
})
export class AcompanhamentoDetalhesPage {
  private visitas:any;
  private acompanhamento:any;

  constructor(private params: NavParams, private http: Http, public nav: NavController,
              private mensagem: MensagemServicoProvider, public events: Events,
              private loadingCtrl: LoadingController) {
    this.acompanhamento = params.data.acompanhamento;
    this.visitas = params.data.visitas;
  }

  public ionViewDidEnter(){
    
  }

  public registrar() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.nav.push(AcompanhamentoRegistrarPage, { acompanhamento: this.acompanhamento });
    loading.dismiss();
  }

  public voltar(){
    this.nav.pop();
  }

  
}
