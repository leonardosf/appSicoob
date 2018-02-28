import { Injectable, EventEmitter } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MensagensErro } from '../app/mensagens.erro';
import { TomadorLSE } from '../model/TomadorLSE';

@Injectable()
export class MensagemServicoProvider {

  user : String;
  faseAtualProposta:String;
  tomador:TomadorLSE;
  inicioProposta:String;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController){
  }

  public setUserLogado(nome : String) {
    this.user = nome;
  }

  public getUserLogado() : String {
    return this.user;
  }

  public setFaseAtualProposta(fase:String) {
    this.faseAtualProposta = fase;
  }

  public getFaseAtualProposta():String {
      return this.faseAtualProposta;
  }

  public setInicioProposta(menu:String) {
    this.inicioProposta = menu;
  }

  public getInicioProposta():String {
      return this.inicioProposta;
  }

  getTomador():TomadorLSE {

    this.tomador = new TomadorLSE();
    this.tomador.idPessoa = 1;
    this.tomador.nomePessoa = 'Carlos Costa';
    this.tomador.numCpfCnpj = '999.999.999-99';
    return this.tomador;
}

  public erroAlerta(titulo:string, error){
    this.mensagemAlerta(titulo, this.getMensagem(error));
  }

  public mensagemAlerta(titulo:string, mensagem:string, customParams:any =null ){
    this.mensagem('mensage-alert', titulo, mensagem, customParams);
  }


  public mensagemSucesso(titulo:string, mensagem:string, customParams:any =null ){
    this.mensagem('mensage-sucesso', titulo, mensagem, customParams);
  }

  private mensagem(classe:string, titulo:string, mensagem:string, customParams:any =null){
    let params = Object.assign({cssClass: 'mensage '+classe, title: titulo, message: mensagem, buttons: ['OK'] }, customParams);
    let alert = this.alertCtrl.create(params);

    alert.present();
  }

  public mensagemToast(mensagem:string | String):void{
    
    let toast = this.toastCtrl.create({
      message: mensagem.toString(),
      duration: 5000,
      position: 'top'
    });

    toast.present();
  }

  private getMensagem(error):string{
     return MensagensErro.getMensagem(error);
  }
}
