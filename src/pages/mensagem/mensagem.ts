import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Paths } from '../../app/paths';
import { MensagemDetalhePage } from '../../app/paginas'
import { LoadingController, NavController, AlertController } from 'ionic-angular';
import { MensagemDTO } from '../../model/MensagemDTO';


@Component({
  templateUrl: 'mensagem.html',
})
export class MensagemPage {
  private mensagens:Array<MensagemDTO>;
  private temResultado:boolean=true;
  public filtroMensagem:string = "todos";
  private totalLidas:number = 0;
  private totalNaoLidas:number = 0;
  private total:number = 0;

  constructor(private http: Http, private loadingCtrl: LoadingController, private nav: NavController, public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.consultarMensagens();
  }

  private consultarMensagens(){
    // this.http.get(Paths.MENSAGENS).map(res => res.json()).subscribe(
    //   (dados) => {

    //     if(dados == null || dados == undefined || dados.length <=0){
    //       this.temResultado = false;
    //     }else{
    //       this.mensagens = dados;
    //       this._verificaQuantidade();
    //     }
    //   }
    // );
  }

  private _verificaQuantidade(){
    this.total = 0;
    this.totalLidas = 0;
    this.totalNaoLidas = 0;

    for(let msg of this.mensagens){
      if(!msg.bolExcluido){
        if(msg.bolLido){
          this.totalLidas++;
        }
        if(!msg.bolLido){
          this.totalNaoLidas++;
        }

        this.total++;
      }
    }

    if(this.total == 0){
      this.temResultado = false;
      return;
    }
  }

  excluir(mensagem:MensagemDTO){
    if(!mensagem.bolExcluido){
      mensagem.bolExcluido = true;
      this._sendUpdate(mensagem);
    }
  }

  detalhar(mensagem:MensagemDTO){
    if(!mensagem.bolLido){
      mensagem.bolLido = true;
      this._sendUpdate(mensagem);
    }
    this.nav.push(MensagemDetalhePage, {mensagem: mensagem});
  }

  private _sendUpdate(mensagem:MensagemDTO){
     this.http.put(Paths.MENSAGENS , JSON.stringify(mensagem), null).map(res => res.json()).
        subscribe((data) => {
          this._verificaQuantidade();
        });
    }

  showAlert(customParams){

    let params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });

    let alert = this.alertCtrl.create(params);
    alert.present();
  }
}
