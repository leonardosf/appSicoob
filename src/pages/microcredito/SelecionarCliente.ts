import {Util} from "./../../app/util";
import {Component} from "@angular/core";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {Http} from "@angular/http";
import {TomadorLSE} from "../../model/TomadorLSE";
import {ParamPath, Paths} from "../../app/paths";
import {PropostaPage} from "../../app/paginas";
import {MensagemServicoProvider} from "../../providers/mensagem.servico";


@Component({
  templateUrl: 'SelecionarCliente.html'
})
export class SelecionarClientePage {
  tomador:TomadorLSE = new TomadorLSE();
  cpfCnpj:string;
  tipoPessoa: string = "CPF";
  inputMaskCPF: string = Util.mask.CPF;
  inputMaskCNPJ: string = Util.mask.CNPJ;
  cpfCnpjFormatado:String;
  exibirConteudoTomador:boolean = true;
  habilitaBotaoNovo:boolean = true;

  constructor(
    public http: Http,
    public nav: NavController,
    public alertCtrl: AlertController,
    private navParams:NavParams,
    private mensagem:MensagemServicoProvider
  ) {

//    this.recuperarEstadosOperacao();

    if(this.navParams.get("cpfCnpj")){
      //tela sendo chamada
      this.cpfCnpj = this.navParams.get("cpfCnpj");
      this.consultaPessoaCapes();
    }
  }

  consultaPessoaCapes(){
    if(!this.cpfCnpj || this.cpfCnpj == null || this.cpfCnpj == ''){
      this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
      return;
    }

    if(!Util.validarCPFCNPJ(this.cpfCnpj)){
      let tipo:string = this.cpfCnpj.length <= 14 ? "CPF" : "CNPJ";

      this.mensagem.mensagemAlerta(tipo+' inválido!', 'Informe '+tipo+' válido!');
      return;
    }
    this._consultaPessoaCapes();
  }

  _consultaPessoaCapes(){
    let cpfCnpjLimpo = this.cpfCnpj.replace("/", "");


    let param:ParamPath = new ParamPath();
    param.adicionar('cpfCnpj', cpfCnpjLimpo);
    param.adicionar('consultaProposta', "true");

    this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).

    subscribe((data) => {
      this.tomador = data;
      this.tomador.numCpfCnpj = this.cpfCnpj;

      if(this.tomador.idPessoa == null){
        this.showAlert({
          title: 'Cadastro não localizado!',
          message: 'Para solicitar Microcrédito é necessário o cadastro do Tomador no CAPES.',
          buttons: ['Nova Consulta']
        });
      
      }else if(!this.tomador.bolAssociado){
        this.exibirConteudoTomador = false;
        this.cpfCnpj = "";
        this.showAlert({
          title: 'Operacação não permitida!',
          message: 'O Tomador não é cliente.',
          buttons: ['Nova Consulta']
        });
      
      }else {
          //this._verificaEstadoOperacao();
        if(this._validaRegraNegocio()){
        }

      }
    });
  }

  disparaConsultaITX(){
    let cpfCnpjLimpo = this.tomador.numCpfCnpj.replace("/", "");
    let param:ParamPath = ParamPath.parametro('cpfCnpj', cpfCnpjLimpo);
    this.http.head(Paths.getURL(Paths.TOMADORES_NOTA_RISCO, param)).
    subscribe((data) => {console.log(data)});

  }

/*
* Alterar tomador.numcpfCnpj para codTipoPessoa
* Alterar Constante Ultil.COD_TIPO_PESSOA_FISICA e Ultil.CODIGO_TIPO_PESSOA_JURICA para 0 e 1 respectivamente
* Comparar tomador.codTipoPessoa com Ultil.
*/
  private _validaRegraNegocio(){

    console.log(this.tomador);

    this.exibirConteudoTomador = true;

      if(!this.tomador.autorizaConsultaBacen){
        this.showAlert({
                title: 'Operação não permitida!',
                message: 'Tomador não autoriza consulta ao BACEN!',
                buttons: ['Nova Consulta']
              });
              this.exibirConteudoTomador = false;
              this.cpfCnpj = "";
              return false;
      }

      if(!this.tomador.bolAssociado){
        if(this.tomador.numCpfCnpj.length == 14){//PF

          if(( this.tomador.dataNascimentoPessoaFisica == null) ||  (this.tomador.dataNascimentoPessoaFisica == undefined)){

            this.showAlert({
                title: 'Operação não permitida!',
                message: 'Tomador sem data de nascimento no CAPES!',
                buttons: ['Nova Consulta']
              });
              this.exibirConteudoTomador = false;
              this.cpfCnpj = "";
              return false;
            }

          }else if(this.tomador.numCpfCnpj.length == 18){//PJ
            this.showAlert({
                title: 'Operação não permitida!',
                message: 'Tomador não é associado!',
                buttons: ['Nova Consulta']
              });
              this.cpfCnpj = "";
              this.exibirConteudoTomador = false;
              return false;
          }

        return true;
      }

      if(!this.tomador.proposta.novo){
        if(this.tomador.proposta.idEstadoOperacao != Util.OPERACAO_EM_AJUSTE){
          this.showAlert({
                title: 'Operação não permitida!',
                message: 'O tomador já possui uma proposta em andamento. Não é possível cadastrar uma nova!',
                buttons: ['Nova Consulta']
              });

              this.exibirConteudoTomador = false;
              this.cpfCnpj = "";
              return false;
        }
      }

  }

  abrePropostaPage(){

    /***
     * A proposta pode ser editada pelo agente de microcrédito que realizou o cadastro
     * ou em casos onde o agente responsavel encontra-se inativo ou com sua virgencia de acesso interrompida
     *
     */

    if((this.tomador.proposta!= null || this.tomador.proposta != undefined) &&
      !this.tomador.proposta.podeSerEditada){
      this.showAlert({
        title: 'Operação não permitida!',
        message: 'Proposta captada por outro agente de microcrédito!',
        buttons: ['Nova Consulta']
      });
      return false;
    }


    this.disparaConsultaITX();

    this.nav.push(PropostaPage, {tomador: this.tomador});
  }

  showAlert(customParams){

    let params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });

    let alert = this.alertCtrl.create(params);
    alert.present();
  }
}
