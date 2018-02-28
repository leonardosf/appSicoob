import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, NavController } from 'ionic-angular';
import { Questionario } from '../../model/Questionario';
import {ParamPath, Paths} from '../../app/paths';
import { TomadorLSE } from '../../model/TomadorLSE';
import 'rxjs/Rx';
import { PropostaPage } from '../microcredito/proposta';
import { CapacidadePagamento } from '../../model/CapacidadePagamento';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Util } from '../../app/util';
import { Pergunta } from '../../model/Pergunta';

@Component({
    templateUrl: 'lse.html'
})
export class LsePage {
    questionario: Questionario = new Questionario();
    tomador:TomadorLSE = new TomadorLSE();
    shownItem = null;
    preguntasTotal: Number =0;
    preguntasRespostas: Number =0;
    btnIsDisabled: Boolean = true;
    capacidadePagamento:CapacidadePagamento;
    private _tipoContrato:number;
    private abreFormularioRespondido:boolean;
    trocaPagina:boolean = true;

    constructor(public http: Http, public navParams: NavParams, private nvCtrl:NavController, private mensagem: MensagemServicoProvider) {
        this.tomador = navParams.get('tomador');

        this.abreFormularioRespondido = navParams.get("questionarioRespondido");
        this._verificaTipoQuestionario();

        if(this.abreFormularioRespondido){

          this._getQuestionarioRespondido();
          this.btnIsDisabled = false;
        }else{
          this._getQuestionario();
        }
    }

  private _getQuestionario(){
    let param:ParamPath = ParamPath.parametro('codTipoPessoa', this._tipoContrato.toString());

      this.http.get(Paths.getURL(Paths.TOMADORES_QUESTIONARIOS , param)).map(res => res.json()).
           subscribe((dados) => {
             this.questionario = null;
            this.questionario = dados;
            this.preguntasTotal = this.questionario.perguntas.length;
           this.trataIndicePerguntas();
           this._iniciarDesmonstradoresDeContragemDeCaracteres(this.questionario);
      });
  }


  private _iniciarDesmonstradoresDeContragemDeCaracteres(questionario:Questionario){

      for(let pergunta of questionario.perguntas){
        if(pergunta.tipo == "TEXTO"){
          if(this.abreFormularioRespondido){
            this.contarCaracteres(pergunta);
          }else{
            pergunta.quantidadeCaracteres = "0/500";
          }
        }
      }
  }

  contarCaracteres(pergunta:Pergunta){
    if(pergunta.tipo == "TEXTO"){
        pergunta.quantidadeCaracteres = pergunta.resposta.length.toString() + "/500";
    }
  }

  private _getQuestionarioRespondido(){
    let param:ParamPath = ParamPath.parametro('idOperacao', this.tomador.proposta.idOperacaoCredito.toString());
    this.http.get(Paths.getURL(Paths.OPERACOES_QUESTIONARIOS, param)).map(res => res.json()).
        subscribe((dados) => {
        this.questionario = null;
        this.questionario = dados;
        this.preguntasTotal = this.questionario.perguntas.length;
        this.trataIndicePerguntas();

        this._iniciarDesmonstradoresDeContragemDeCaracteres(this.questionario);
        this.countRespostas();
      });
  }

  countRespostas(){
     let contador: any = 1;
     for(let pergunta of this.questionario.perguntas){

        if((pergunta.resposta != null && pergunta.resposta != "")){
          this.preguntasRespostas = contador;
          pergunta.cssClass = "success";
          contador++;
          if(!this.abreFormularioRespondido){
            this.btnIsDisabled = (this.preguntasRespostas == this.preguntasTotal)? false : true;
          }
        }else{
          pergunta.cssClass = "";
        }

        if(pergunta.resposta != null){
          this.trocaPagina = false;
        }

     }

  }

  private trataIndicePerguntas(){

    let contador: any = 1;
     for(let pergunta of this.questionario.perguntas){
       if(contador <= 9){
         contador = "0" + contador.toString();
       }
        pergunta.id = contador;
        contador++;
     }
   }

   _verificaTipoQuestionario(){


     if(this.tomador.numCpfCnpj.length == 11){

       this._tipoContrato = Util.TIPO_PESSOA_FISICA;
     }else{

       this._tipoContrato = Util.TIPO_PESSOA_JURIDICA;
     }
   }

  public enviar(){

    if(this.abreFormularioRespondido){
      this.questionario.idOperacao =  this.tomador.proposta.idOperacaoCredito;
    }

    this.questionario.idTomador = this.tomador.idPessoa;
    this.questionario.tipoContrato = this._tipoContrato;
    this.questionario.tomadorAssociado = this.tomador.bolAssociado;
    this.questionario.tipoPessoa = this.tomador.codTipoPessoa;

    this.http.post(Paths.LSES , JSON.stringify(this.questionario), null).map(res => res.json()).
    subscribe((data) => {

       this.nvCtrl.push(PropostaPage, {"tomador":this.tomador});

    },(error)=>{
        this.mensagem.erroAlerta('Atenção', error);
      });

  }

 }
