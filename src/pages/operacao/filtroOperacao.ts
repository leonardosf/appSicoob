import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';


@Component({
    templateUrl: 'filtroOperacao.html'
})

export class FiltroOperacaoPage {
  private dias;
  private situacao;
  private cpfCnpj;
  private estadosOperacao;
  private numProposta;
  
  constructor(private navParams: NavParams, private events: Events, public viewCtrl: ViewController) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.estadosOperacao = this.navParams.data.estadosOperacao;
      this.dias = this.navParams.data.dias;
      this.situacao = this.navParams.data.situacao;
      this.cpfCnpj = this.navParams.data.cpfCnpj;
      this.numProposta = this.navParams.data.numProposta;
    }
  }

  public filtrar(){
    this.events.publish('filtroOperacoes:filtro', this.dias, this.situacao, this.cpfCnpj, this.numProposta);
  }

  public filtrarSituacao(){
    this.filtrar();
    this.fechar();
  }

  public limparCpfCnpj(){
    this.cpfCnpj = null;
    this.situacao = 'Todas';
    this.filtrar();
  }

  fechar(){
    this.viewCtrl.dismiss();
  }

  public limparNumProposta(){
    this.numProposta = null;
    this.cpfCnpj = null;
    this.situacao = 'Todas';
    this.filtrar();
  }
}
