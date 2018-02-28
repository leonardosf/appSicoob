import {TomadorLSE} from "./../../model/TomadorLSE";
import {NavController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {LsePage} from "../../app/paginas";
import {SimuladorPage} from "../simulador/simulador";
import {Http} from "@angular/http";
import {ParamPath, Paths} from "../../app/paths";
import { Util } from '../../app/util';
import {DocumentacaoPage} from "../documentacao/documentacao";
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { SelecionarClientePage } from './SelecionarCliente';
import { SimuladorDetalhePage } from "../simulador/simulador-detalhe";
import { LinhaCredito } from "../../model/LinhaCredito";
import { GarantiaPage } from "../garantia/garantia";
import { DocumentacaoHomePage } from "../documentacao/documentacao-home";

@Component({
  templateUrl: 'proposta.html'
})
export class PropostaPage {
  tomador: TomadorLSE;
  //controle de exibicao dos passos da proposta
  private lseIsDisabled: Boolean;
  private simulacaoIsDisabled: Boolean;
  private documentosIsDisabled: Boolean = true;
  private botaoEnviarDisabled:Boolean = true;
  private _carregarQuestionarioRespondido:boolean;
  private lsePreenchido:boolean;
  private simulacaoPreenchida:boolean;
  private documentosPreenchidos:boolean;
  private garantiaPreenchida:boolean;

  constructor(
    public http: Http,
    public navParams: NavParams,
    public nav: NavController,
    private mensagem: MensagemServicoProvider
  ) {

    this.simulacaoPreenchida = navParams.get("tikProposta");

    this.documentosPreenchidos = navParams.get("tikDocumentacao");

    this.garantiaPreenchida = navParams.get("tikGarantia");
    
    // this.tomador = navParams.get("tomador");
    this.tomador = new TomadorLSE;
    // localStorage.setItem("tomador", JSON.stringify(this.tomador));
    this._consultaPessoaCapes();
  }

  abreTelaLSE(){

    this.nav.push(LsePage, {tomador: this.tomador,"questionarioRespondido": this._carregarQuestionarioRespondido});
  }

  abreTelaSimulacao(){
    // this.nav.push(SimuladorPage);

    this.nav.push(SimuladorDetalhePage,
      {tomador: this.tomador,
          nomePessoa: 'Carlos Costa',
          numCpfCnpj: '999.999.999-99',
          tomadorLSE: this.tomador,
          capacidadePagamento: 4,
          linhaDeCredito: (new LinhaCredito(1 + ";"+ new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ")),
          parcela: {quantidadeParcelas : '12', maiorValorParcela:500.00,  percentualTaxaJuros:1.3, primeiroVencimento: '07/03',
          valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual:24  },
          valorOperacao: '5000',
          idNsuSimulacao: '1',
          primeiroVencimento: new Date('07/03/2018'),
          idOperacaoMicrocredito: '1',
          identificadorLinhacredito: 'Linha de Crédito 1',
          isExcluir: true
      });
  }

  abreTelaGarantia(){
    // this.nav.push(SimuladorPage);
    this.nav.push(GarantiaPage,{"tomador": this.tomador,"isMesa": false });
    
  }

  abrirDocumentacao(){
    this.nav.push(DocumentacaoHomePage, {"tomador": this.tomador});
  }

  _consultaPessoaCapes(){
    let cpfCnpjLimpo = '999999999999';
    let param:ParamPath = new ParamPath();
    param.adicionar('cpfCnpj', cpfCnpjLimpo);
    param.adicionar('consultaProposta', "true");

    this.tomador.idPessoa = 1;
    this.tomador.idInstituicao = 1;
    this.tomador.nomePessoa = 'Carlos';
    this.tomador.numCpfCnpj = '999.999.999-99';
    this.tomador.codTipoPessoa = 1;
    this.tomador.nomeApelido = 'Bolinha';
    this.tomador.showDetails = true;
    this.tomador.show = true;
    this.tomador.codigoAtividadeEconomica = 1;
    this.tomador.autorizaConsultaBacen = true;
    this.tomador.dataInclusaoSistema = new Date;
    this.tomador.dataRenovacaoCadastral = new Date;
    this.tomador.dataNascimentoPessoaFisica = new Date;
    this.tomador.bolAssociado = true;
    this.tomador.hasDocument = false;
    this._verificaRegrasDeNegocio();

    // this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).
    // subscribe((data) => {
    //   this.tomador = data;
    //   this._verificaRegrasDeNegocio();
    // });
  }

  enviarProposta(){

    this.http.post(Paths.PROPOSTAS , JSON.stringify(this.tomador.proposta), null).map(res => res.json()).
    subscribe((data) => {
        this.mensagem.mensagemAlerta('Dados enviados com sucesso!', 'Proposta enviada para análise!');
        this.nav.push(SelecionarClientePage);
    });

  }

  private _verificaRegrasDeNegocio(){

    if(this.tomador.proposta != null && (!this.tomador.proposta.novo)){

      this._carregarQuestionarioRespondido = true;

      switch(this.tomador.proposta.idEstadoOperacao){
        case Util.OPERACAO_EM_ANALISE:
          this._controleOperacaoEmAnalise();
          break;

        case Util.OPERACAO_EM_AJUSTE:
          this._controleOperacaoEmAjuste();
          break;
      }

    }else{
      this._controleNovoContrato();
    }
  }

  private _verificaPendencia(){
    switch(this.tomador.proposta.idTipoPendencia){

      case  Util.SEM_PENDENCIA:
        this._controleSemPendencia();
        break;

      case Util.AJUSTE_LSE_SIMULACAO:
        this._controlePendenciaLSESimulacao();
        break;

      case Util.AJUSTE_DOCUMENTOS:
        this._controlePendenciaDocumentos();
        break;
      
      case Util.AJUSTE_NA_SIMULACAO:
        this._controlePendenciaSimulacao();
        break;
      
      case Util.AJUSTE_NA_SIMULACAO_E_DOCUMENTOS:
        this._controlePendenciaSimulacaoDocumentos();
        break;

      case Util.AJUSTE_EM_TODOS:
        this._pendenciaEmTodos();
        break;

      default :
        this.todosHabilitados();
        break;
    }
  }

  private verificaBotaoEnviar(){
    if(this.lsePreenchido && this.simulacaoPreenchida && this.documentosPreenchidos){
      this.botaoEnviarDisabled = false;
    }
  }
  //CONTROLES DE TELA
  private _controleNovoContrato(){

    // this.lseIsDisabled = false;
    // this.lsePreenchido = false;
    // this.simulacaoIsDisabled = true;
    // this.simulacaoPreenchida = false;
    // this.documentosIsDisabled = true;
    // this.documentosPreenchidos = false;

    // this.lsePreenchido = false;
    // this.simulacaoPreenchida = false;
    // this.documentosPreenchidos = false;

    this.lseIsDisabled = false;
    this.lsePreenchido = true;
    this.simulacaoIsDisabled = false;
    // this.simulacaoPreenchida = false;
    this.documentosIsDisabled = false;
    // this.documentosPreenchidos = false;

    this.lsePreenchido = false;
    // this.simulacaoPreenchida = false;
    // this.documentosPreenchidos = false;
  }

private _pendenciaEmTodos(){
  this.lsePreenchido = false;
  this.simulacaoPreenchida = false;
  this.documentosPreenchidos = false;
  this._simulacaoDesabilitada();
  this._lseHabilitado();
  this._documentoDesabilitado();
}

  private _controleOperacaoEmAnalise(){
    this.lseIsDisabled = true;
    this.documentosIsDisabled = true;
    this.lsePreenchido = true;
    this.lsePreenchido = true;
    this.simulacaoPreenchida = true;
    this.documentosPreenchidos = true;
  }

  
  private _controleOperacaoEmAjuste(){

    this.lseIsDisabled = false;
    this.lsePreenchido = true;
    this.simulacaoIsDisabled = false;
    //this.simulacaoPreenchida = this.tomador.proposta.idSimulacao != null;

    if(this.tomador.proposta != null){
      this.lsePreenchido = true;
    }

    if(this.tomador.proposta.idSimulacao != null){
      this._simulacaoHabilitada();
      this.simulacaoPreenchida = true;
      this._documentosHabilitado();

    }

    //verificar documentos
    if(this.tomador.hasDocument){
      //this._documentosHabilitado();
      this.documentosPreenchidos = true;
    }else{
      //this._documentoDesabilitado();
      this.documentosPreenchidos = false;
    }

    if(this.tomador.proposta.idTipoPendencia != null){
      this._verificaPendencia();
    }

     this.verificaBotaoEnviar();

  }

  private _controleSemPendencia(){
    this.todosHabilitados();
    this.lsePreenchido = true;
    this.simulacaoPreenchida = true;
    this.documentosPreenchidos = true;

  }

  private _controlePendenciaLSESimulacao(){
    this._lseHabilitado();
    this._simulacaoDesabilitada();
    this._documentoDesabilitado();
    this.documentosPreenchidos = false;
    this.lsePreenchido = false;
    this.simulacaoPreenchida = false;
  }

  private _controlePendenciaDocumentos(){
    this._lseDesabilitado();
    this._simulacaoDesabilitada();
    this._documentosHabilitado();
    this.lsePreenchido = true;
    this.simulacaoPreenchida = true;
    this.documentosPreenchidos = false;
  }

  private _controlePendenciaSimulacaoDocumentos(){
    this._lseDesabilitado();
    this.lsePreenchido = true;
    this.simulacaoPreenchida = false;
    this.documentosPreenchidos = false;
    this._simulacaoHabilitada();
    this._documentoDesabilitado();
    
  }

  private _controlePendenciaSimulacao(){
      this._lseHabilitado();
      this._simulacaoHabilitada();
      this._documentoDesabilitado();
      this.lsePreenchido = true;
      this.simulacaoPreenchida = false;
      this.documentosPreenchidos = true;
  }

  private _lseHabilitado(){
    this.lseIsDisabled = false;
  }

  private _lseDesabilitado(){
    this.lseIsDisabled = true;
  }

  private _simulacaoHabilitada(){
    this.simulacaoIsDisabled = false;
  }

  private _simulacaoDesabilitada(){
    this.simulacaoIsDisabled = true;
  }

  private _documentosHabilitado(){
    this.documentosIsDisabled = false;
  }

  private _documentoDesabilitado(){
    this.documentosIsDisabled = true;
  }

  private todosHabilitados(){
    this.lseIsDisabled = false;
    this.simulacaoIsDisabled = false;
    this.documentosIsDisabled = false;
  }
}
