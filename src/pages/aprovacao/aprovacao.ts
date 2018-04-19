import { Component } from "@angular/core";
import { Events, PopoverController, NavController } from 'ionic-angular';
import { EstadoOperacao } from "../../model/EstadoOperacao";
import { Operacao } from "../../model/Operacao";
import { filtroAprovacaoPage } from "./filtroAprovacao";
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { DetalheAprovacaoPage } from "./detalhe-aprovacao";
import { TomadorLSE } from "../../model/TomadorLSE";

@Component({
    templateUrl: 'aprovacao.html'
})

export class AprovacaoPage {

    private estadosOperacao: Array<EstadoOperacao>;
    private operacoes: Array<Operacao>;
    private semResultado: boolean = false;
    private grupoAlcadas: any;
    private _tomador: TomadorLSE;

    constructor(private events: Events, private popoverCtrl: PopoverController, private mensagem: MensagemServicoProvider,
        private nav: NavController) {
        this._tomador = mensagem.getTomador()

    }

    ionViewDidEnter() {
        this.grupoAlcadas = 'Todas';
        this.recuperarOperacoes();
    }

    public abrirFiltros(event) {
        this.events.unsubscribe('filtroOperacoes:filtro');
        this.events.subscribe('filtroOperacoes:filtro', (grupoAlcadas, nomeTomador, valorOperacao, cpfCnpj, tipoProduto, periodo, cooperativa, numProposta) => {
            this.filtrar(grupoAlcadas, nomeTomador, valorOperacao, cpfCnpj, tipoProduto, periodo, cooperativa, numProposta);
        });

        let popover = this.popoverCtrl.create(filtroAprovacaoPage, {
            estadosOperacao: this.estadosOperacao,
        });
        popover.present({ ev: event });
    }

    private filtrar(grupoAlcadas, nomeTomador, valorOperacao, cpfCnpj, tipoProduto, periodo, cooperativa, numProposta) {

        var data = new Date();

        let cpfCnpjPuro = cpfCnpj == null ? null : cpfCnpj.replace(/[^\d]+/g, '');

        if (!this.operacoes) {
            return;
        }

        for (let operacao of this.operacoes) {
            if (operacao.dataOperacao >= data && (operacao.situacao == grupoAlcadas || this.grupoAlcadas == 'Todas')
                && (operacao.cpfCnpj.startsWith(cpfCnpjPuro) || cpfCnpjPuro == null) && (operacao.idOperacao.toString().startsWith(numProposta) || numProposta == null)) {
                operacao.exibir = true;
                this.semResultado = false;
            } else {
                operacao.exibir = false;
            }
        }
    }

    public recuperarOperacoes() {

        let idOperacao = 1234;
        let lstOperacoes;
        this.operacoes = new Array<Operacao>();

        for (let i=0; i <= 5; i++) {
            lstOperacoes = new Operacao();
            lstOperacoes.idOperacao = idOperacao + i;
            lstOperacoes.nome = 'Carlos Costa';
            lstOperacoes.cpfCnpj = '99999999999';
            lstOperacoes.dataOperacao = new Date;
            lstOperacoes.situacao = 'Aprovacao';
            lstOperacoes.dataHoraUltimaVisita = new Date;
            lstOperacoes.idTipopendencia = 1234;
            lstOperacoes.idEstadoOperacao = 1;
            lstOperacoes.exibir = true;
            lstOperacoes.idSituacaoCredito = 1;
            lstOperacoes.cssClass = 'aprovada';
            lstOperacoes.documento = true;
            lstOperacoes.idLinhaCredito = 1234;

            this.operacoes.push(lstOperacoes);
        }
    }

    public abrirProposta(operacao) {

        this.mensagem.setFaseAtualProposta("Aprovacao");
        this.nav.push(DetalheAprovacaoPage, {"tomador": this._tomador});
    }
}