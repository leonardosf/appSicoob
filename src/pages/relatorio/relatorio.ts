import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RelatorioDetalhesPage } from '../../app/paginas';
import { ParamPath, Paths } from '../../app/paths';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Util } from "./../../app/util";
import { LinhaCredito } from '../../model/LinhaCredito';

@Component({
  templateUrl: 'relatorio.html'
})

export class RelatorioPage {
  private situacoes: Array<SituacaoFinanceira>;
  private operacoes: Array<any>;
  private semResultado: boolean = false;
  private exibirFiltro: boolean = true;
  private exibirResultado: boolean = false;
  private cpfCnpj: string;
  private nome: string;
  private situacaoFinanceira: number;
  private linhasDeCredito: Array<LinhaCredito> = Array<LinhaCredito>();
  private _linhasTemp:Array<LinhaCredito>;
  private linhaSelecionada:any = 0;
  private _nomeComercialLinhaPesquisada:string;

  constructor(private http: Http, private loadingCtrl: LoadingController, private nav: NavController,
    private mensagem: MensagemServicoProvider, private popoverCtrl: PopoverController, private events: Events) {
      this.situacoes = Array<SituacaoFinanceira>();
      this.situacoes.push(new SituacaoFinanceira('t', 'Todas')); 
      this.situacoes.push(new SituacaoFinanceira('a', 'Adimplente'));
      this.situacoes.push(new SituacaoFinanceira('i', 'Inadimplente'));
      this.linhasDeCredito.push(new LinhaCredito(-99, 'Todas'));     
      this.carregarLinhasCredito();      
  }

  private carregarLinhasCredito(){
    this.http.get(Paths.LINHA).map(res => res.json()).subscribe((data) => {

      this._linhasTemp = data;
      this._linhasTemp.forEach((el)=>{        
        this.linhasDeCredito.push(new LinhaCredito(el.idLinhaCredito + ";" + el.dataCadastroLinhaCredito , el.nomeComercialLinhaCredito));
      });      
 
    });
  }

  private getNomeComercialLinhaPesquisada():void{
    let nomeComercial:string;
      this.linhasDeCredito.forEach((linha)=>{
        if(linha.idLinhaCredito == this.linhaSelecionada){
          nomeComercial = linha.nomeComercialLinhaCredito;
        }        
      });
    this._nomeComercialLinhaPesquisada = nomeComercial;
    console.log("Nome linha :" + this._nomeComercialLinhaPesquisada);
  }

  public pesquisar() {
    this.getNomeComercialLinhaPesquisada();
    if(this.cpfCnpj && !Util.validarCPFCNPJ(this.cpfCnpj)){
      let tipo:string = this.cpfCnpj.length <= 14 ? "CPF" : "CNPJ";

      this.mensagem.mensagemAlerta(tipo+' inválido!', 'Informe '+tipo+' válido!');
      return;
    }
    let param:URLSearchParams  = new URLSearchParams();
    if (this.cpfCnpj) {
      param.set('numCpfCnpj', this.cpfCnpj);
    }
    if (this.nome) {
      this.nome = this.nome.replace(new RegExp('%', 'g'),"");
      param.set('nomeTomador', this.nome);
    }
    if (this.situacaoFinanceira) {
      param.set('situacaoFinanceira', this.situacaoFinanceira.toString());
    }
    if(this.linhaSelecionada){
      param.set('idLinhaCredito', this.linhaSelecionada.toString());
    }
    let requestOptions = new RequestOptions();
    requestOptions.search = param;
    this.http.get(Paths.RELATORIOS_CONSULTA, requestOptions).map(res => res.json()).subscribe((dados) => {
      if (dados && dados.length > 0) {
        this.operacoes = dados;
        console.log(this.operacoes);
        this.exibirFiltro = false;
        this.exibirResultado = true;
      } else {
        this.semResultado = true;
        this.exibirFiltro = false;
        this.exibirResultado = false;
        return;
      }
    });
  }

  public carregarNovaPesquisa() {
    this.semResultado = false;
    this.exibirResultado = false;
    this.exibirFiltro = true;
  }

  public detalhar(operacao) {
    let param:ParamPath = ParamPath.parametro('idOperacaoCredito', operacao.idOperacaoCredito.toString());

    this.http.get(Paths.getURL(Paths.RELATORIOS_DETALHE, param)).map(res => res.json()).subscribe((dados) => {
      if (dados) {
        this.limpar();
        this.nav.push(RelatorioDetalhesPage, {cabecalho: operacao, relatorio: dados});
      }
    });
  }

  public limpar() {
    this.cpfCnpj = null;
    this.nome = null;
    this.situacaoFinanceira = null;
    this.linhaSelecionada = null;
    this._nomeComercialLinhaPesquisada = "";
  }

  public recuperarSituacao(situacaoFinanceira) {
    let descricaoSituacao = "";
    for (var i = 0; i < this.situacoes.length; i++) {
      if (situacaoFinanceira==this.situacoes[i].id) {
        descricaoSituacao = this.situacoes[i].descricao;
      }
    }
    return descricaoSituacao;
  }

}

export class SituacaoFinanceira
{
    constructor(id:string, descricao:string) {
        this.id=id;
        this.descricao=descricao;
    }

    id:string;
    descricao:string;
}