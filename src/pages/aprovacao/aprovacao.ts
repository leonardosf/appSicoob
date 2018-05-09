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
    private nomeTomador:String;
    private valorOperacao:Number;
    private cpfCnpj:String;
    private tipoProduto:String;
    private periodo:Date;
    private cooperativa:Number;
    private numProposta:Number;
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
            nomeTomador: this.nomeTomador,
            valorOperacao: this.valorOperacao,
            cpfCnpj: this.cpfCnpj,
            tipoProduto: this.tipoProduto,
            periodo: this.periodo,
            cooperativa: this.cooperativa,
            numProposta: this.numProposta
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
        let numProposta = 12345678;
        let operacao;
        this.operacoes = new Array<Operacao>();

        for (let i=0; i <= 5; i++) {
            operacao = new Operacao();
            operacao.idOperacao = idOperacao + i;
            operacao.nome = 'Carlos Costa';
            operacao.cpfCnpj = '99999999999';
            operacao.dataOperacao = new Date;
            operacao.situacao = 'Nível 2';
            operacao.dataHoraUltimaVisita = new Date;
            operacao.idTipopendencia = 1234;
            operacao.idEstadoOperacao = 1;
            operacao.exibir = true;
            operacao.idSituacaoCredito = 1;
            operacao.cssClass = 'aprovada';
            operacao.documento = true;
            operacao.idLinhaCredito = 1234;
            operacao.numProposta = numProposta+i;

            this.operacoes.push(operacao);
        }
    }

    public abrirProposta(operacao) {

        this.mensagem.setFaseAtualProposta("Aprovacao");
        this.nav.push(DetalheAprovacaoPage, {"tomador": this._tomador});
    }
}