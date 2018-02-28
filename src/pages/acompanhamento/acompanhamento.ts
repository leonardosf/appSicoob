import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AcompanhamentoDetalhesPage, FiltroAcompanhamentoPage, AcompanhamentoRegistrarPage } from '../../app/paginas';
import {ParamPath, Paths} from '../../app/paths';
import { Http } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'acompanhamento.html'
})

export class AcompanhamentoPage {
  private acompanhamentos: Array<any>;
  private visitas: Array<any>;
  private nomeFiltro;
  private cpfCnpjFiltro;
  private order = 'nomePessoa';
  private reverse = false;
  private ordernacao = 'Nome';
  private semResultado: boolean = false;
  private exibirFiltro: boolean = true;

  constructor(private http: Http, private loadingCtrl: LoadingController, private nav: NavController,
    private mensagem: MensagemServicoProvider, private popoverCtrl: PopoverController, private events: Events) {
  }

  public ionViewDidEnter() {
    this.http.get(Paths.VISITAS).map(res => res.json()).subscribe((dados) => {
      if (dados && dados.length > 0) {
        this.acompanhamentos = dados;
        for (let acompanhamento of this.acompanhamentos) {
          acompanhamento.exibir = true;
        }
      } else {
        this.semResultado = true;
        this.exibirFiltro = false;
        return;
      }
    });
  }

  public registrar(acompanhamento) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.nav.push(AcompanhamentoRegistrarPage, { acompanhamento: acompanhamento });
    loading.dismiss();
  }

  public detalhar(acompanhamento) {
    let param:ParamPath = ParamPath.parametro('idOperacao', acompanhamento.idOperacao.toString());

    this.http.get(Paths.getURL(Paths.OPERACOES_VISITAS, param)).map(res => res.json()).subscribe((dados) => {
      if (dados && dados.length > 0) {
        this.visitas = dados;
        this.nav.push(AcompanhamentoDetalhesPage, {acompanhamento: acompanhamento, visitas: this.visitas});
      } else {
        this.nav.push(AcompanhamentoRegistrarPage, {acompanhamento: acompanhamento});
      }
    });
  }

  public abrirFiltros(event) {
    this.events.unsubscribe('filtroAcompanhamento:filtrarPorNome');
    this.events.subscribe('filtroAcompanhamento:filtrarPorNome', (nome) => {
      this.filtrarPorNome(nome);
    });

    this.events.unsubscribe('filtroAcompanhamento:filtrarPorCpfCnpj');
    this.events.subscribe('filtroAcompanhamento:filtrarPorCpfCnpj', (cpfCnpj) => {
      this.filtrarPorCpfCnpj(cpfCnpj);
    });

    this.events.unsubscribe('ordemAcompanhamento:ordernar');
    this.events.subscribe('ordemAcompanhamento:ordernar', (valor, reverse) => {
      this.ordernar(valor, reverse);
    });

    let popover = this.popoverCtrl.create(FiltroAcompanhamentoPage, {
      nome: this.nomeFiltro,
      cpfCnpj: this.cpfCnpjFiltro,
      order: this.order,
      reverse: this.reverse
    });
    popover.present({ ev: event });
  }

  public filtrarPorNome(nome) {
    this.semResultado = true;
    this.nomeFiltro = nome;
    if (nome) {
      nome = nome.toUpperCase();
    }

    if (!this.acompanhamentos) {
      return;
    }

    for (let acompanhamento of this.acompanhamentos) {
      if (acompanhamento.nomePessoa.toUpperCase().startsWith(nome) || nome == null) {
        acompanhamento.exibir = true;
        this.semResultado = false;
      } else {
        acompanhamento.exibir = false;
      }
    }
  }

  public filtrarPorCpfCnpj(cpfCnpj) {
    this.semResultado = true;
    this.cpfCnpjFiltro = cpfCnpj;
    let cpfCnpjPuro = cpfCnpj == null ? null : cpfCnpj.replace(/[^\d]+/g, '');
    for (let acompanhamento of this.acompanhamentos) {
      if (acompanhamento.numCpfCnpj.startsWith(cpfCnpjPuro) || cpfCnpjPuro == null) {
        acompanhamento.exibir = true;
        this.semResultado = false;
      } else {
        acompanhamento.exibir = false;
      }
    }
  }

  public ordernar(valor, reverse) {
    this.order = valor;

    if ('nomePessoa' == valor) {
      this.ordernacao = 'Nome';
    }

    this.reverse = reverse;
  }
}
