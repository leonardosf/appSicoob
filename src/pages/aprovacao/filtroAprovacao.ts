import { Component } from "@angular/core";
import { ViewController, Events } from "ionic-angular";

@Component({
    templateUrl: 'filtroAprovacao.html'
})

export class filtroAprovacaoPage {

    private grupoAlcadas;
    private nomeTomador;
    private valorOperacao;
    private cpfCnpj;
    private tipoProduto;
    private periodo;
    private cooperativa;
    private numProposta;
    private lstGrupoAlcadas:Array<any>;

    constructor(private events: Events, public viewCtrl: ViewController) {

    }

    ngOnInit() {
        this.grupoAlcadas = 'Todas';
        this.itensGrupoAlcadas();
    }

    public filtrarSituacao() {
        this.filtrar();
        this.fechar();
    }

    public filtrar() {
        this.events.publish('filtroOperacoes:filtro', this.grupoAlcadas, this.nomeTomador, this.valorOperacao,
                            this.cpfCnpj, this.tipoProduto, this.periodo, this.cooperativa, this.numProposta);
    }

    public fechar() {
        this.viewCtrl.dismiss();
    }

    public itensGrupoAlcadas() {
        this.lstGrupoAlcadas = new Array<any>();
        this.lstGrupoAlcadas.push('Todos','N1','N2','N3','N4');
    }
}