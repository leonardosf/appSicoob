import {Util} from "./../../app/util";
import {Component} from "@angular/core";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {Http} from "@angular/http";
import {TomadorLSE} from "../../model/TomadorLSE";
import {ParamPath, Paths} from "../../app/paths";
import {SimuladorPage} from "../../app/paginas";
import {MensagemServicoProvider} from "../../providers/mensagem.servico";
import { Endereco } from "../../model/Endereco";
import { Telefone } from "../../model/Telefone";
import { LimiteTomador } from "../../model/LimiteTomador";

@Component({
  templateUrl: 'SelecionarClienteSimulador.html'
})
export class SelecionarClienteSimuladorPage {
  tomador:TomadorLSE = new TomadorLSE();
  cpfCnpj:string;
  tipoPessoa: string = "CPF";
  inputMaskCPF: string = Util.mask.CPF;
  inputMaskCNPJ: string = Util.mask.CNPJ;
  cpfCnpjFormatado:String;
  textoEstadoOperacao:string;
  exibirConteudoTomador:boolean = true;
  habilitaBotaoNovo:boolean = true;
  ultimaRenovacao: Date;
  consultaRealizada: Date;
  riscoCliente: string;
  pd: string;
  riscoBacen: string;
  limiteCliente: Array<LimiteTomador> = new Array<LimiteTomador>();

  constructor(
    public http: Http,
    public nav: NavController,
    public alertCtrl: AlertController,
    private navParams:NavParams,
    private mensagem:MensagemServicoProvider
  ) {
  }

  consultaPessoaCapes(){
    if(!this.cpfCnpj || this.cpfCnpj == null || this.cpfCnpj == ''){
      this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
      return;
    }

    // if(!Util.validarCPFCNPJ(this.cpfCnpj)){
    //   let tipo:string = this.cpfCnpj.length <= 14 ? "CPF" : "CNPJ";

    //   this.mensagem.mensagemAlerta(tipo+' inválido!', 'Informe '+tipo+' válido!');
    //   return;
    // }
    this._consultaPessoaCapes();
    this.preencherInformacoesCliente();
  }

  preencherInformacoesCliente(){

    this.ultimaRenovacao = new Date();
    this.consultaRealizada = new Date();
    this.riscoCliente = 'R1';
    this.pd = '10%';
    this.riscoBacen = 'A' ;
    this.limiteCliente.push(new LimiteTomador('Cartão de Crédito',35000,32500,2500));
    this.limiteCliente.push(new LimiteTomador('Cheque Especial',100000,100000,0));
  }

  _consultaPessoaCapes(){
    // let cpfCnpjLimpo = this.cpfCnpj.replace("/", "");

    // let param:ParamPath = new ParamPath();
    // param.adicionar('cpfCnpj', cpfCnpjLimpo);
    // param.adicionar('consultaProposta', "true");

    // this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).
    // subscribe((data) => {
    //   this.tomador = data;
    //   this.tomador.numCpfCnpj = this.cpfCnpj;

    //   if(this.tomador.idPessoa == null){
    //     this.showAlert({
    //       title: 'Cadastro não localizado!',
    //       message: 'Para solicitar Microcrédito é necessário o cadastro do Tomador no CAPES.',
    //       buttons: ['Nova Consulta']
    //     });
    //   }else {
    //     this._validaRegraNegocio();
    //   }
    // });

        this.tomador.nomePessoa = "Carlos",
        this.tomador.numCpfCnpj = "999.999.999-99";
        this.tomador.codTipoPessoa = 1;
        this.tomador.nomeApelido = "Carlos";
        this.tomador.idPessoa = 1;
        this.tomador.dataRenovacaoCadastral = new Date();
        this.tomador.dataInclusaoSistema = new Date();
        this.tomador.dataNascimentoPessoaFisica = new Date();

        let end : Endereco = new Endereco();
        end.descricao = "Sudoeste";
        end.bairro = "Sudoeste";
        this.tomador.endereco = [end];
        let tel : Telefone = new Telefone();
        this.tomador.telefones = [tel];
    
  }

/*
* Alterar tomador.numcpfCnpj para codTipoPessoa
* Alterar Constante Ultil.COD_TIPO_PESSOA_FISICA e Ultil.CODIGO_TIPO_PESSOA_JURICA para 0 e 1 respectivamente
* Comparar tomador.codTipoPessoa com Ultil.
*/
  private _validaRegraNegocio(){
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
  }

  abreSimulacaoPage(){
    this.mensagem.setInicioProposta("MenuSimulacao");
    this.nav.push(SimuladorPage, {tomadorAvulso: this.tomador});
  }

  showAlert(customParams){
    let params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
    let alert = this.alertCtrl.create(params);
    alert.present();
  }
}
