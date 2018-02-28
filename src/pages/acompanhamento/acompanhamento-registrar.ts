import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { AcompanhamentoDocumentoPage, RelatorioDetalhesPage } from '../../app/paginas';
import { ParamPath, Paths } from '../../app/paths';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';

@Component({
  templateUrl: 'acompanhamento-registrar.html'
})
export class AcompanhamentoRegistrarPage {
  private acompanhamento:any;
  public quantidadeCaracteresDescricao:any="0/500";

  constructor(private params: NavParams, public nav: NavController, 
    private loadingCtrl: LoadingController, private http: Http) {
    this.acompanhamento = params.data.acompanhamento;
  }

  public contarCaracteresDescricao() {
    this.quantidadeCaracteresDescricao = this.acompanhamento.visitaAgenda.descricao.length.toString() + "/500";
  }

  public voltar(){
    this.nav.pop();
  }

  public abrirDocumentos(){
    this.nav.push(AcompanhamentoDocumentoPage, {acompanhamento : this.acompanhamento});
  }

  public detalharContrato(){
    let param:ParamPath = ParamPath.parametro('idOperacaoCredito', this.acompanhamento.idOperacaoCredito.toString());
    
        this.http.get(Paths.getURL(Paths.RELATORIOS_DETALHE, param)).map(res => res.json()).subscribe((dados) => {
          if (dados) {
            this.nav.push(RelatorioDetalhesPage, {cabecalho: this.acompanhamento, relatorio: dados, visita: true});
          }
    });
  }
}
