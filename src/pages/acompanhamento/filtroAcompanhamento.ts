import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';


@Component({
    templateUrl: 'filtroAcompanhamento.html'
})

export class FiltroAcompanhamentoPage {
  private nome;
  private cpfCnpj;
  private reverse;
  private order;
  private consultaNome;
  private consultaCpfCnpj;

  constructor(private navParams: NavParams, private events: Events, private viewCtrl: ViewController) {}

  ngOnInit() {
    if (this.navParams.data) {
     this.nome = this.navParams.data.nome;
     this.cpfCnpj = this.navParams.data.cpfCnpj;
     this.order = this.navParams.data.order;
     this.reverse = this.navParams.data.reverse;
    }

    if(this.nome){
      this.consultaCpfCnpj = true;
    }

    if(this.cpfCnpj){
      this.consultaNome = true;
    }
  }

  public limparNome(){
    this.nome = '';
  }

  public filtrarNome(){
    if(this.nome == ''){
      this.nome = null;
      this.consultaCpfCnpj = false;
    }else{
      this.consultaCpfCnpj = true;
    }
    this.events.publish('filtroAcompanhamento:filtrarPorNome', this.nome);
  }

  public limparCpfCnpj(){
    this.cpfCnpj = '';
  }

  public filtrarCpfCnpj(){
    if(this.cpfCnpj == ''){
      this.cpfCnpj = null;
      this.consultaNome = false;
    }else{
      this.consultaNome = true;
    }
    this.events.publish('filtroAcompanhamento:filtrarPorCpfCnpj', this.cpfCnpj);
  }

  public ordernar(valor){
    this.order = valor;
    this.reverse = !this.reverse;
    this.events.publish('ordemAcompanhamento:ordernar', this.order, this.reverse);
  }

  fechar(){
    this.viewCtrl.dismiss();
  }
}
