import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {ParamPath, Paths} from '../../app/paths';
import { Http } from '@angular/http';
import { FiltroOperacaoPage, PropostaPage } from '../../app/paginas';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import 'rxjs/Rx';
import { Operacao } from '../../model/Operacao';
import { Util } from '../../app/util';
import { TomadorLSE } from '../../model/TomadorLSE';
import { EstadoOperacao } from '../../model/EstadoOperacao';
import { SimuladorDetalhePage } from "../simulador/simulador-detalhe";
import { LinhaCredito } from "../../model/LinhaCredito";
import { GarantiaPage } from "../garantia/garantia";
import {DocumentacaoPage} from "../documentacao/documentacao";
import { DocumentacaoHomePage } from '../documentacao/documentacao-home';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PageGeneric } from '../gerenic/pageGeneric';


@Component({
    templateUrl: 'operacao.html'
})

export class OperacaoPage {
  private operacoes:Array<Operacao>;
  private situacao:any;
  private cpfCnpj:any;
  private numProposta:any;
  private dias:number = 30;
  private estadosOperacao:Array<EstadoOperacao>;
  private semResultado:boolean=false;
  private _podeAbrirTelaProposta:boolean = false;
  private _tomador:TomadorLSE;
  private primeiraAberturaDeTela =  true;
  private exibirFiltro: boolean = true;
  private pageGeneric:PageGeneric = new PageGeneric();

    constructor(private http: Http, private nav: NavController, public navParams: NavParams, private mensagem:MensagemServicoProvider,
            private alertCtrl: AlertController, private popoverCtrl: PopoverController, private events: Events) {
        this._tomador = mensagem.getTomador();
  }

  ionViewDidEnter(){
    this.recuperarOperacoes();
    this.situacao = 'Todas';
  }

    ngOnInit() {
        this._tomador = this.mensagem.getTomador();
    }

  private recuperarOperacoes(){
    // this.http.get(Paths.OPERACOES).map(res => res.json()).subscribe(
    //   (dados) => {
        this.recuperarEstadosOperacao();

    //     if(dados.length == 0){
    //       this.semResultado = true;
    //       this.exibirFiltro = false;
    //       return;
    //     }

    //     this.operacoes = dados;

    //     for(let operacao of this.operacoes){
    //       operacao.exibir = true;
    //     }
    //     this._verificaCss();
    //   }
    // );

    let lstProposta:Array<Operacao>;
    let operacao:Operacao = new Operacao();
    let operacao2:Operacao = new Operacao();
    let operacao3:Operacao = new Operacao();
    
    operacao.idOperacao = 1234;
    operacao.nome = 'Carlos Costa';
    operacao.cpfCnpj = '99999999999';
    operacao.dataOperacao = new Date;
    operacao.situacao = 'Cadastro';
    operacao.dataHoraUltimaVisita = new Date;
    operacao.idTipopendencia = 1234;
    operacao.idEstadoOperacao = 1;
    operacao.exibir = true;
    operacao.idSituacaoCredito = 1;
    operacao.cssClass = 'aprovada';
    operacao.documento = true;
    operacao.idLinhaCredito = 1234;

    operacao2.idOperacao = 12345;
    operacao2.nome = 'Leonardo Soares';
    operacao2.cpfCnpj = '88888888888';
    operacao2.dataOperacao = new Date;
    operacao2.situacao = 'Documentação';
    operacao2.dataHoraUltimaVisita = new Date;
    operacao2.idTipopendencia = 12345;
    operacao2.idEstadoOperacao = 1;
    operacao2.exibir = true;
    operacao2.idSituacaoCredito = 1;
    operacao2.cssClass = 'cancelada';
    operacao2.documento = true;
    operacao2.idLinhaCredito = 12345;

    operacao3.idOperacao = 123456;
    operacao3.nome = 'Rafael Rodrigues';
    operacao3.cpfCnpj = '77777777777';
    operacao3.dataOperacao = new Date;
    operacao3.situacao = 'Garantia';
    operacao3.dataHoraUltimaVisita = new Date;
    operacao3.idTipopendencia = 123456;
    operacao3.idEstadoOperacao = 1;
    operacao3.exibir = true;
    operacao3.idSituacaoCredito = 1;
    operacao3.cssClass = 'prospeccao';
    operacao3.documento = true;
    operacao3.idLinhaCredito = 123456;

    lstProposta = [operacao,operacao2, operacao3];

    this.operacoes = lstProposta;
  }

  private recuperarEstadosOperacao(){
    // this.http.get(Paths.ESTADOS_OPERACAO).map(res => res.json()).subscribe((data) => {

    //   this.estadosOperacao = data;
    //     this.estadosOperacao.splice(0,0, {
    //       "idEstadoOperacao":0,
    //       "descricao": "Todas",
    //       "bolSisbr": false,
    //       "bolMobile": true,
    //       "bolAtivo": true,
    //       "dataHoraInclusao":null,
    //       "idUsuarioInclusao": "app",
    //       });
    // });

    let estado:EstadoOperacao = new EstadoOperacao();
    let estado1:EstadoOperacao = new EstadoOperacao();
    let estado2:EstadoOperacao = new EstadoOperacao();
    let estado3:EstadoOperacao = new EstadoOperacao();

    estado.idEstadoOperacao = 0;
    estado.descricao = 'Todas';
    estado.bolSisbr = false;
    estado.bolMobile = true;
    estado.bolAtivo = true;
    estado.dataHoraInclusao = new Date;
    estado.idUsuarioInclusao = '0';

    estado1.idEstadoOperacao = 1;
    estado1.descricao = 'Cadastro';
    estado1.bolSisbr = false;
    estado1.bolMobile = true;
    estado1.bolAtivo = true;
    estado1.dataHoraInclusao = new Date;
    estado1.idUsuarioInclusao = '1';

    estado2.idEstadoOperacao = 2;
    estado2.descricao = 'Documentação';
    estado2.bolSisbr = false;
    estado2.bolMobile = true;
    estado2.bolAtivo = true;
    estado2.dataHoraInclusao = new Date;
    estado2.idUsuarioInclusao = '2';

    estado3.idEstadoOperacao = 3;
    estado3.descricao = 'Garantia';
    estado3.bolSisbr = false;
    estado3.bolMobile = true;
    estado3.bolAtivo = true;
    estado3.dataHoraInclusao = new Date;
    estado3.idUsuarioInclusao = '3';

    this.estadosOperacao = [estado, estado1, estado2, estado3];
  }

  public abrirFiltros(event){
    this.events.unsubscribe('filtroOperacoes:filtro');
    this.events.subscribe('filtroOperacoes:filtro', (dias, situacao, cpfCnpj, numProposta) => {
      this.filtrar(dias, situacao, cpfCnpj, numProposta);
    });

    let popover = this.popoverCtrl.create(FiltroOperacaoPage, {
      estadosOperacao:this.estadosOperacao,
      dias:this.dias,
      situacao:this.situacao,
      cpfCnpj:this.cpfCnpj,
      numProposta:this.numProposta
    });
    popover.present({ev: event});
  }

  public abrirProposta(operacao){
    this._verificaRegraDeNegocios(operacao);

    if(this._podeAbrirTelaProposta){
      let param:ParamPath = new ParamPath();
      param.adicionar('cpfCnpj', operacao.cpfCnpj);
      param.adicionar('consultaProposta', "true");

      // this.http.get(Paths.getURL(Paths.TOMADORES, param)).map(res => res.json()).subscribe((data) => {
      //     this._tomador = data;
      //     this.nav.push(PropostaPage, {'tomador': this._tomador});
      // });


      // idPessoa: Number;
      // idInstituicao: Number;
      // nomePessoa:string;
      // numCpfCnpj: string;
      // codTipoPessoa: Number;
      // nomeApelido: string;
      // icon: String;
      // showDetails: Boolean;
      // show: Boolean;
      // codigoAtividadeEconomica: Number;
      // autorizaConsultaBacen: Boolean;
      // dataInclusaoSistema: Date;
      // dataRenovacaoCadastral: Date;
      // telefones: Array<Telefone>;
      // endereco: Array<Endereco>;
      // emailPessoaVO: Email;
      // proposta:PropostaLSE;
      // dataNascimentoPessoaFisica:Date;
      // bolAssociado:boolean;
      // hasDocument:boolean;
      
        if(operacao.situacao == 'Cadastro') {
            this.mensagem.setFaseAtualProposta("Cadastro");
            this.nav.push(SimuladorDetalhePage,
                    {
                        tomador: this._tomador,
                        nomePessoa: 'Carlos Costa',
                        numCpfCnpj: '999.999.999-99',
                        tomadorLSE: this._tomador,
                        capacidadePagamento: 4,
                        linhaDeCredito: (new LinhaCredito(1 + ";"+ new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ")),
                        parcela: {quantidadeParcelas : '12', maiorValorParcela:500.00,  percentualTaxaJuros:1.3, primeiroVencimento: '07/03',
                        valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual:24  },
                        valorOperacao: '5000',
                        idNsuSimulacao: '1',
                        primeiroVencimento: '07/03/2018',
                        idOperacaoMicrocredito: '1',
                        identificadorLinhacredito: 'Linha de Crédito 1',
                        isExcluir: true
                    });

        } else if(operacao.situacao == 'Documentação') {
            this.mensagem.setFaseAtualProposta("Documentacao");
            console.log(this._tomador);
            this.nav.push(DocumentacaoHomePage, {"tomador": this._tomador,"isMesa": true });

        } else if(operacao.situacao == 'Garantia') {
            this.mensagem.setFaseAtualProposta("Garantia");
            this.nav.push(GarantiaPage, {"tomador": this._tomador,"isMesa": true });

        } else {
            
            this.nav.push(PropostaPage, {'tomador': this._tomador});
        }
    }
  }

  private _verificaRegraDeNegocios(operacao:Operacao){


    switch(operacao.idEstadoOperacao){
      case Util.OPERACAO_EM_AJUSTE:
          this._controleOperacaoEmAjuste(operacao);
          break;
      case Util.OPERACAO_EM_PROPOSTA:
          this._controleOperacaoEmProposta(operacao);
          break;

      case Util.SITUACAO_PROPOSTA_CANCELADA:
        this._controleOpercaoCancelada(operacao);
            break;

      case Util.OPERACAO_CANCELADA:
          this._controleOpercaoCancelada(operacao);
          break;

      default:
          this._controleOpercaoEmAnalise(operacao);
          break;
    }
  }


  private _controleOperacaoEmAjuste(operacao:Operacao){
   this._podeAbrirTelaProposta = true;
  }

  private _controleOperacaoEmProposta(operacao:Operacao){

  if(operacao.idSituacaoCredito != null){
        switch(operacao.idSituacaoCredito){

          case Util.SITUACAO_PROPOSTA_CREDITO:
              //operacao.cssClass = "aprovada";
              //operacao.situacao = "Proposta";
                this.showAlert({
                    title: 'Operação em Proposta!',
                    message: 'A operação selecionada encontra-se em Proposta.',
                    buttons: ['OK']
              });
                    this.primeiraAberturaDeTela = false;
              break;

          case Util.SITUACAO_CONTRATO_DE_CREDITO:
              //operacao.cssClass = "aprovada";
              //operacao.situacao = "Contrato";
                this.showAlert({
                    title: 'Operação em Contrato!',
                    message: 'A operação selecionada encontra-se em Contrato.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_CONTRATO_LIQUIDADO:
             // operacao.cssClass = "encerrada";
             // operacao.situacao = "Encerrada";
                this.showAlert({
                    title: 'Operação Encerrada!',
                    message: 'A operação selecionada encontra-se Encerrada.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_CONTRATO_BAIXADO_PARA_ACERTO:
             // operacao.cssClass = "encerrada";
             // operacao.situacao = "Encerrada";
                this.showAlert({
                    title: 'Operação Encerrada!',
                    message: 'A operação selecionada encontra-se Encerrada.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_CONTRATO_TRANSFERIDO:
             // operacao.cssClass = "aprovada";
            //  operacao.situacao = "Aprovada";
                this.showAlert({
                    title: 'Operação Aprovada!',
                    message: 'A operação selecionada encontra-se Aprovada.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_ABERTO:
             // operacao.cssClass = "aprovada";
             // operacao.situacao = "Contrato";
                this.showAlert({
                    title: 'Operação Aprovada!',
                    message: 'A operação selecionada encontra-se Aprovada.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_CREDITO_LIQUIDAR:
             // operacao.cssClass = "aprovada";
            //  operacao.situacao = "Aprovada";
                this.showAlert({
                    title: 'Operação Aprovada!',
                    message: 'A operação selecionada encontra-se Aprovada.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_PROPOSTA_CANCELADA:
            //  operacao.cssClass = "cancelada";
            //  operacao.situacao = "Cancelada";
                this.showAlert({
                    title: 'Operação Cancelada!',
                    message: 'A operação selecionada encontra-se Cancelada.',
                    buttons: ['OK']
              });
              break;

          case Util.SITUACAO_PROPOSTA_INDEFERIDA:
             // operacao.cssClass = "cancelada";
             // operacao.situacao = "Cancelada";
                this.showAlert({
                    title: 'Operação Cancelada!',
                    message: 'A operação selecionada encontra-se Cancelada.',
                    buttons: ['OK']
              });
              break;

          case Util.PROPOSTA_DISPONIVEL_PARA_ASSINATURA:
              this.showAlert({
                title: 'Operação Não Permitida!',
                message: 'A Operação selecionada encontra-se em Contrato e disponível para Assinatura!',
                buttons: ['OK']
              })
              break;
          
        }
      }else{
        //operacao.cssClass = "proposta";
        this.showAlert({
            title: 'Operação em Proposta!',
            message: 'A operação selecionada encontra-se em Proposta.',
            buttons: ['OK']
          });
      }
  }

  private _controleOpercaoEmAnalise(operacao:Operacao){
      this._podeAbrirTelaProposta = false;

      this.showAlert({
          title: 'Operação em Análise!',
          message: 'A operação selecionada encontra-se na Cooperativa para análise.',
          buttons: ['OK']
        });
  }

  private _controleOpercaoCancelada(operacao:Operacao){
    this._podeAbrirTelaProposta = false;

    this.showAlert({
        title: 'Operação Cancelada!',
        message: 'A operação selecionada encontra-se cancelada.',
        buttons: ['OK']
      });
}

  private filtrar(dias, situacao, cpfCnpj, numProposta){
    this.semResultado = true;
    this.dias = dias;
    this.situacao = situacao;
    this.cpfCnpj = cpfCnpj;
    this.numProposta = numProposta;

    this.dias = dias;
    var data = new Date();
    data.setDate(data.getDate() - this.dias);

    let cpfCnpjPuro = cpfCnpj == null ? null : cpfCnpj.replace(/[^\d]+/g,'');

    if(!this.operacoes){
      return;
    }

    for(let operacao of this.operacoes){
      if(operacao.dataOperacao >= data && (operacao.situacao == situacao || this.situacao == 'Todas') 
        && (operacao.cpfCnpj.startsWith(cpfCnpjPuro) || cpfCnpjPuro == null) && (operacao.idOperacao.toString().startsWith(numProposta) || numProposta == null)){
        operacao.exibir = true;
        this.semResultado = false;
      }else{
        operacao.exibir = false;
      }
    }
  }

  private _verificaCss(){
    for(let opr of this.operacoes){

        switch(opr.idEstadoOperacao){

            case Util.OPERACAO_CANCELADA:
                opr.cssClass = "cancelada";
                break;

            case Util.OPERACAO_EM_ANALISE:
                opr.cssClass = "analise";
                break;

            case Util.OPERACAO_EM_AJUSTE:
                opr.cssClass = "prospeccao";
                break;

          default :
            opr.cssClass = "aprovada" ;
            opr.situacao = "Proposta";
            this._validaCssSituacaoCredito(opr);
              break;
        }

    }
  }

  private _validaCssSituacaoCredito(operacao:Operacao){

    this._podeAbrirTelaProposta = false;
     if(operacao.idSituacaoCredito != null){
       switch(operacao.idSituacaoCredito){

        case Util.SITUACAO_PROPOSTA_CREDITO:
            operacao.cssClass = "aprovada";
            operacao.situacao = "Proposta";
            break;

        case Util.SITUACAO_CONTRATO_DE_CREDITO:
            operacao.cssClass = "aprovada";
            operacao.situacao = "Contrato";
            break;

        case Util.SITUACAO_CONTRATO_LIQUIDADO:
            operacao.cssClass = "encerrada";
            operacao.situacao = "Encerrada";
            break;

        case Util.SITUACAO_CONTRATO_BAIXADO_PARA_ACERTO:
            operacao.cssClass = "encerrada";
            operacao.situacao = "Encerrada";
            break;

        case Util.SITUACAO_CONTRATO_TRANSFERIDO:
            operacao.cssClass = "aprovada";
            operacao.situacao = "Aprovada";
            break;

        case Util.SITUACAO_ABERTO:
            operacao.cssClass = "aprovada";
            operacao.situacao = "Aprovada";
            break;

        case Util.SITUACAO_PROPOSTA_CANCELADA:
            operacao.cssClass = "cancelada";
            operacao.situacao = "Cancelada";
            break;

        case Util.SITUACAO_PROPOSTA_INDEFERIDA:
            operacao.cssClass = "cancelada";
            operacao.situacao = "Cancelada";
            break;

        case Util.PROPOSTA_DISPONIVEL_PARA_ASSINATURA:
            operacao.cssClass = "aprovada";
            operacao.situacao = "Assinatura";
            break;
       }
     }else{
       operacao.cssClass = "aprovada";
     }
  }

  showAlert(customParams){
    let params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
    let alert = this.alertCtrl.create(params);
    alert.present();
  }

}
