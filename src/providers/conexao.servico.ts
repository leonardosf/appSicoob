import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
import { MensagemServicoProvider } from './mensagem.servico';

@Injectable()
export class ConexaoServicoProvider {
  private conectado=true;

  constructor(private network: Network, private mensagem: MensagemServicoProvider) {
  }

  public registrarServicoConexao(){
    this.network.onConnect().subscribe(() => {
      if(!this.conectado){
        this.mensagem.mensagemToast('Conexão estabelecida.');
      }
      this.conectado = true;
    });


    this.network.onDisconnect().subscribe(() => {
      if(this.conectado){
        this.mensagem.mensagemToast('Sem conexão com a internet.');
      }
      this.conectado = false;
    });    
  }

  public isConectado():boolean{
    return this.conectado
  }

  public getTipoConexao():string{
    return this.network.type;
  }
}
