import { Component } from '@angular/core';
import { NavParams, LoadingController, NavController, AlertController } from 'ionic-angular';
import {ParamPath, Paths} from '../../app/paths';
import { Http } from '@angular/http';
import { Imagem } from '../../model/Imagem';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { HomePage } from '../../app/paginas';
import { Observable } from 'rxjs/Rx';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Configuracoes } from '../../providers/configuracao/configuracoes';

@Component({
  templateUrl: 'acompanhamento-documento.html'
})
export class AcompanhamentoDocumentoPage {
  private acompanhamento;
  private fachadas: Array<Imagem> = new Array<Imagem>();
  private instalacoes: Array<Imagem> = new Array<Imagem>();
  private outros: Array<Imagem> = new Array<Imagem>();
  private tipoDocumento: string;
  private anexarDocumentos: Boolean = true;

  constructor(private http: Http, public navParams: NavParams, public nav: NavController,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private mensagem: MensagemServicoProvider, private transfer: Transfer) {
    this.acompanhamento = navParams.data.acompanhamento;
    this.fachadas.push(Imagem.getNovaImagem());
    this.instalacoes.push(Imagem.getNovaImagem());
    this.outros.push(Imagem.getNovaImagem());
    this.tipoDocumento = "fachada";
  }

  public ionViewDidEnter() {
    let param:ParamPath = new ParamPath();
    param.adicionar('cpfCnpj', this.acompanhamento.numCpfCnpj);
    param.adicionar('consultaProposta', "false");

    this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).subscribe((data) => {
      this.acompanhamento.tomador = data;
    });
  }

  public registrar() {
    if (!this.anexarDocumentos && this.temImagem()) {
      this.confirmarEnvioDescartandoDocumentos();
    } else {
      this.finalizarAcompanhamento();
    }
  }

  private finalizarAcompanhamento() {
      let acompanhamento = this.acompanhamento;
      delete acompanhamento.exibir;
      delete acompanhamento.tomador;
      this.http.post(Paths.VISITAS, JSON.stringify(acompanhamento)).map(res => res.json()).
        subscribe((dados) => {
          this.acompanhamento = dados;
          if (this.anexarDocumentos) {
            this.enviarDocumentacaoParaMesa();
          } else {
            this.sinalizarEnvioComSucesso();
          }
      });
  }

  private confirmarEnvioDescartandoDocumentos() {
    let params = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.finalizarAcompanhamento();
          }
        }
      ]
    };
    this.mensagem.mensagemAlerta('Atenção', 'Os documentos capturados serão descartados, confirma?', params);
  }

  public voltar() {
    this.nav.pop();
  }

  public temImagem() {
    if (this.fachadas.length == 1 && this.instalacoes.length == 1 && this.outros.length == 1) {
      return false;
    }
    return true;
  }

  private sinalizarEnvioComSucesso(){
    let params = {
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.push(HomePage);
          }
        }
      ]
    };
    this.mensagem.mensagemSucesso('Dados enviados com sucesso!', 'Visita registrada', params);
  }

  private enviarDocumentosPlataformaDeCredito() {
    this.acompanhamento.visitaAgenda.idOperacao = this.acompanhamento.idOperacao;

    this.http.put(Paths.VISITAS_ENVIO_IMAGENS, JSON.stringify(this.acompanhamento.visitaAgenda)).map(res => res.json()).
      subscribe((dados) => {
        this.sinalizarEnvioComSucesso();
      }, (error) => {
        this.rollbackEmVisita();
        this.mensagem.mensagemAlerta("Atenção", "Ocorreu um erro ao enviar os documentos para a plataforma de crédito!");
      });
  }

  private rollbackEmVisita() {
    let param:ParamPath = ParamPath.parametro('idVisita', this.acompanhamento.visitaAgenda.idVisitaAgenda);

    this.http.delete(Paths.getURL(Paths.VISITAS_REMOVER, param)).map(res => res.json()).
    subscribe((dados) => {
      this.configurarComoNovaImagem(this.fachadas);
      this.configurarComoNovaImagem(this.instalacoes);
      this.configurarComoNovaImagem(this.outros);
    });
  }

  private configurarComoNovaImagem(imagens:Array<any>){
    for(let imagem of imagens){
      if(imagem.caminho) {
        imagem.novaImagem(true);
      }
    }
  }

  public enviarDocumentacaoParaMesa() {
    if (!this.temImagem()) {
      this.mensagem.mensagemAlerta("Atenção", "Nenhuma imagem foi anexada!");
      return;
    }

    let requisicoes: Array<Observable<any>> = new Array<Observable<any>>();
    requisicoes = requisicoes.concat(this.montarRequisicoes(this.fachadas, 'FACHADA'));
    requisicoes = requisicoes.concat(this.montarRequisicoes(this.instalacoes, 'INSTAL'));
    requisicoes = requisicoes.concat(this.montarRequisicoes(this.outros, 'DIEM'));

    if (requisicoes.length == 0) { //Sem imagens nova para envio
      this.sinalizarEnvioComSucesso();
      return;
    }

    let loading = this.loadingCtrl.create();
    loading.present();

    Observable.forkJoin(requisicoes).subscribe(
      (results) => {
        this.resultadoEnvioImagens(results);
        loading.dismiss();
      }
    );
  }

  private resultadoEnvioImagens(retornos) {
    let sucessos: number = 0;

    for (let retorno of retornos) {
      if (!retorno.error) {
        sucessos++;
      }
    }

    if (sucessos == retornos.length) {
      this.enviarDocumentosPlataformaDeCredito();
      return;
    } else {
      this.rollbackEmVisita();
      let erros: number = retornos.length - sucessos;
      if (erros == 1) {
        this.mensagem.mensagemAlerta('Atenção', erros + ' imagem não foi enviada!');
      } else {
        this.mensagem.mensagemAlerta('Atenção', erros + ' imagens não foram enviadas!');
      }
    }
  }

  private montarRequisicoes(imagens: Array<Imagem>, tipo: string): Array<Observable<any>> {
    let retorno: Array<Observable<any>> = new Array<Observable<any>>();

    let fileTransfer: TransferObject = this.transfer.create();

    for (let imagem of imagens) {
      if (!imagem.isNovaImagem()) {
        continue;
      }

      let params = {};
      params['descricao'] = tipo;
      params['idDocumento'] = imagem.idImagem;
      params['identificador'] = this.acompanhamento.idOperacao;
      params['identificadorVisita'] = this.acompanhamento.visitaAgenda.idVisitaAgenda;


      let headers={'Authorization':'Bearer ' + Configuracoes.getAccessToken()};

      var options = {
        mimeType: "multipart/form-data",
        params: params,
        headers : headers
      };

      let requisicao = Observable.fromPromise(
        fileTransfer.upload(imagem.caminho, Paths.VISITAS_UPLOAD, options).then(
          (dados) => {
            imagem.nome = '';
            imagem.novaImagem(false);
            return Observable.never();
          }).catch(
          (erro) => {
            imagem.novaImagem(true);
            imagem.nome = 'Não Enviada';
            return Observable.throw(true);
          }
          )
      );

      retorno.push(requisicao);
    }
    return retorno;
  }
}
