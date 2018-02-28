import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TomadorLSE } from '../../model/TomadorLSE';
import { Paths, ParamPath } from '../../app/paths';
import { Imagem } from '../../model/Imagem';
import { Http } from '@angular/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Observable } from 'rxjs/Rx';
import { PropostaPage } from '../microcredito/proposta';
import { DocumentoServico } from '../../providers/documento-servico/documento-servico';
import { Configuracoes } from '../../providers/configuracao/configuracoes';
import { Operacao } from '../../model/Operacao';
import { GarantiaPage, DocumentacaoHomePage } from '../../app/paginas';

@Component({
  templateUrl: 'documentacao.html',
})
export class DocumentacaoPage {
  
  public anexarDocumentos:boolean=true;
  public fachadas:Array<Imagem>=new Array<Imagem>();
  public instalacoes:Array<Imagem>=new Array<Imagem>();
  public outros:Array<Imagem>=new Array<Imagem>();

  public tomador:TomadorLSE;
  public tipoDocumento:string='fachada';
  public tituloFase: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagem: MensagemServicoProvider,
    private http: Http, private transfer: Transfer, private loadingCtrl: LoadingController, public nav: NavController,
    private documentoServico:DocumentoServico, public alertCtrl: AlertController) {
    this.tomador = mensagem.getTomador();
    this.tituloFase = this.navParams.get('tituloDocumento');
  }

  ionViewDidEnter(){
    this.recuperarImagens();
  }

  public recuperarImagens(){
    // let param:ParamPath = ParamPath.parametro('idOperacao', this.tomador.proposta.idOperacaoCredito.toString());

    // this.http.get(Paths.getURL(Paths.OPERACOES_IMAGENS, param)).map(res => res.json()).subscribe(
    //   (dados) => {
    //     if(dados){
    //       this.fachadas = this.getImagensTipo('FACHADA', dados);
    //       this.instalacoes = this.getImagensTipo('INSTAL', dados);
    //       this.outros = this.getImagensTipo('DIEM', dados);
    //     }else{
    //       this.novaImagem(this.fachadas);
    //       this.novaImagem(this.instalacoes);
    //       this.novaImagem(this.outros);
    //     }
    //   },
    //   (error) => {
    //     this.mensagem.mensagemAlerta('Atenção', 'Erro ao recuperar documentos!');
    //   }
    // );

    this.novaImagem(this.fachadas);
    this.novaImagem(this.instalacoes);
    this.novaImagem(this.outros);
  }

  //Duplicado
  private novaImagem(documentos:Array<Imagem>){
    if(documentos.length >= 6 ){
        return;
    }

    documentos.push(Imagem.getNovaImagem());
  }

  private getImagensTipo(tipo:string, dados:Array<Imagem>):Array<Imagem>{
    let imagens:Array<Imagem>=new Array<Imagem>();
    for(let imagem of dados){
      if(imagem.nome.indexOf(tipo) > -1){
        imagens.push(new Imagem(imagem.idImagem, imagem.nome, imagem.caminho, imagem.source));
      }
    }

    this.novaImagem(imagens);

    return imagens;
  }


  private atualizarDocumentoOperacao(){
    let operacao:Operacao = new Operacao();
    operacao.idOperacao = this.tomador.proposta.idOperacaoCredito;
    operacao.documento = this.anexarDocumentos;

    this.http.put(Paths.OPERACOES, operacao).subscribe(()=>{});
  }

  private confirmarExclusao(){
    let param = {
      title: 'Excluir Imagens!',
      message: 'Confirma a exclusão da imagem?',
      cssClass: 'mensage mensage-alert',
      buttons: [
          { text: 'Não' },
          { text: 'Sim',
            handler: () => {
              this.removerImagens();
            }
          }
      ],
    }

    let alert = this.alertCtrl.create(param);
    alert.present();
  }

  private removerImagens(){
    let param:ParamPath = ParamPath.parametro('idOperacao', this.tomador.proposta.idOperacaoCredito.toString());

    this.http.delete(Paths.getURL(Paths.OPERACOES_REMOVER_IMAGENS, param)).subscribe(
      (data) => {
        this.atualizarDocumentoOperacao();
        this.redirecionarParaProposta();
      }
    );
  }

  public enviarDocumentacao(){
    // if(! this.anexarDocumentos && this.temImagem()){
    //   this.confirmarExclusao();
    //   return;
    // }


    // this.atualizarDocumentoOperacao();

    // let requisicoes:Array<Observable<any>> = new Array<Observable<any>>();
    // requisicoes = requisicoes.concat(this.montarRequisicoes(this.fachadas, 'FACHADA'));
    // requisicoes = requisicoes.concat(this.montarRequisicoes(this.instalacoes, 'INSTAL'));
    // requisicoes = requisicoes.concat(this.montarRequisicoes(this.outros, 'DIEM'));

    // if(requisicoes.length == 0){ //Sem imagens nova para envio
    //   this.redirecionarParaProposta();
    //   return;
    // }

    // let loading = this.loadingCtrl.create();
    // loading.present();

    // Observable.forkJoin(requisicoes).subscribe(
    //   (results) => {
    //     this.resultadoEnvioImagens(results);
    //     loading.dismiss();
    //   }
    // );
    
    this.nav.push(DocumentacaoHomePage, {tomador: this.tomador, "gravarEncaminhar":"Encaminhar"});
  }

  enviarParaGarantia() {
    this.nav.push(GarantiaPage, {tomador: this.tomador,"isMesa": false});
  }

  private resultadoEnvioImagens(retornos){
    let sucessos:number=0;

    for(let retorno of retornos){
      if(!retorno.error){
        sucessos++;
      }
    }

    if(sucessos == retornos.length){
      this.redirecionarParaProposta();
    }else{
      let erros:number = retornos.length-sucessos;
      if(erros == 1){
        this.mensagem.mensagemAlerta('Atenção', erros + ' imagem não foi enviada!');
      }else{
        this.mensagem.mensagemAlerta('Atenção', erros + ' imagens não foram enviadas!');
      }
    }
  }

  private redirecionarParaProposta(){
    this.nav.push(PropostaPage, {"tomador":this.tomador});
  }

  private montarRequisicoes(imagens:Array<Imagem>, tipo:string):Array<Observable<any>>{
    let retorno:Array<Observable<any>> = new Array<Observable<any>>();

    let fileTransfer: TransferObject = this.transfer.create();

    for(let imagem of imagens){
      if(!imagem.isNovaImagem()){
        continue;
      }

      let params = {};
      params['descricao'] = tipo;
      params['idDocumento'] = imagem.idImagem;
      params['identificador'] = this.tomador.proposta.idOperacaoCredito;

      let headers={'Authorization':'Bearer ' + Configuracoes.getAccessToken()};

      var options = {
          mimeType: "multipart/form-data",
          params : params,
          headers : headers
        };

        let requisicao = Observable.fromPromise(
        fileTransfer.upload(imagem.caminho, Paths.DOCUMENTACOES_UPLOAD, options).then(
          (dados) => {
            console.log('sucesso'+imagem.caminho);
            imagem.nome = '';
            imagem.novaImagem(false);
            return Observable.never();
          }).catch(
            (erro) => {
              console.log(erro);
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

  public temImagem(){
    if(this.fachadas.length == 1 && this.instalacoes.length == 1 && this.outros.length == 1){
      return false;
    }

    return true;
  }

  public voltar() {
    this.nav.pop();
  }
}
