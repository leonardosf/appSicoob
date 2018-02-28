import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, NavController } from 'ionic-angular';
import { MensagemDTO } from '../../model/MensagemDTO';
import { Paths } from '../../app/paths';


@Component({
  templateUrl: 'mensagem.detalhe.html',
})
export class MensagemDetalhePage {
  private mensagem:MensagemDTO;

  constructor(private http: Http, private params: NavParams, private _nav: NavController) {
    this.mensagem = params.data.mensagem;
      
  }


  voltar(){
    this._nav.pop();
  }

   public excluir(){
     this.mensagem.bolExcluido = true;

    //  this.http.put(Paths.MENSAGENS , JSON.stringify(this.mensagem), null).map(res => res.json()).
    //     subscribe((data) => {

    //     console.log(data);
    //     this.voltar();
    //     });
    }
}
