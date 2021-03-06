import { Component } from '@angular/core';
import { ToastController, NavParams, NavController, Events, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Paths } from '../../app/paths';
import { TomadorLSE } from '../../model/TomadorLSE';
import { SimuladorPage, PropostaPage, DocumentacaoPage, OperacaoPage } from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { DocumentacaoHomePage } from '../documentacao/documentacao-home';
import { PageGeneric } from '../gerenic/pageGeneric';
import { TipoGarantia } from '../../model/TipoGarantia';
import { Conta } from '../../model/Conta';

@Component({
    templateUrl: 'simulador-detalhe.html'
})
export class SimuladorDetalhePage {
    tomador: any;
    tomadorLSE: TomadorLSE;
    linhaDeCredito: any;
    identificadorLinhacredito:any;
    nomeLinhaDeCredito: String;
    parcela: any;
    // capacidadePagamento: Number;
    valorOperacao: Number;
    primeiroVencimento: Date;
    simulacaoPage: SimuladorPage;
	idOperacaoMicrocredito: Number;
    idNsuSimulacao: String;
    tituloPagina: String;
    tituloBotao: String;
    nomePessoa: String;
    numCpfCnpj: String;
    tipoCriterio: String ='credito';
    tipoCriteriosCredito:  Array<TipoGarantia> = new Array<TipoGarantia>();
    tipoDeCriterioCredito: number;
    tipoCriteriosDebito:  Array<TipoGarantia> = new Array<TipoGarantia>();
    contasCredito:  Array<Conta> = new Array<Conta>();
    contaDeCredito: number;
    contaDeDebito: number;
    contasDebito:  Array<Conta> = new Array<Conta>();
    tipoDeCriterioDebito: number;
    isExcluir: boolean;
    botaoEncaminhar: boolean;
    iconMenu:any;
    trocaPagina:boolean = true;
    private pageGeneric:PageGeneric = new PageGeneric();
    

    constructor(
        private http: Http, public events: Events,
        private toastCtrl: ToastController, public nav: NavController,
        public navParams: NavParams, private mensagem: MensagemServicoProvider,
        private alertCtrl: AlertController){

        this.idOperacaoMicrocredito = navParams.get('idOperacaoMicrocredito');
        this.tomador = navParams.get('tomador');
        this.nomePessoa = navParams.get('nomePessoa');
        this.numCpfCnpj = navParams.get('numCpfCnpj');
        this.tomadorLSE = navParams.get('tomadorLSE');
        this.linhaDeCredito = navParams.get('linhaDeCredito');
        this.identificadorLinhacredito = navParams.get('identificadorLinhacredito');
        this.parcela = navParams.get('parcela');
        this.primeiroVencimento = navParams.get('primeiroVencimento');
        // this.capacidadePagamento = navParams.get('capacidadePagamento');
        this.valorOperacao = navParams.get('valorOperacao');
        this.idNsuSimulacao = navParams.get('idNsuSimulacao');
        this.isExcluir = navParams.get('isExcluir');
        this.tipoCriteriosCredito.push(new TipoGarantia(1 , "CONTA CORRENTE"));
        this.tipoCriteriosDebito.push(new TipoGarantia(1 , "BOLETO"));

        this.tipoCriteriosCredito.push(new TipoGarantia(2 , "DOC"));
        this.tipoCriteriosDebito.push(new TipoGarantia(2 , "CONTA CORRENTE"));

        this.contasCredito.push(new Conta(756, 1 , 12345));
        this.contasCredito.push(new Conta(756, 14 ,54321));
        this.contasCredito.push(new Conta(756, 20, 98765));

        this.contasDebito.push(new Conta(756, 2 , 14736));
        this.contasDebito.push(new Conta(756, 24 ,96374));
        this.contasDebito.push(new Conta(756, 30, 56789));

        this.tipoCriteriosDebito.push()
        console.log(this.tipoCriteriosCredito);
        console.log(this.tipoCriteriosDebito);
        this.definirTitulo();
        this.definirBotao();
        

    }

    setFaseAtualProposta() {
        this.mensagem.setFaseAtualProposta("Documentacao");
        console.log("setaFase="+this.mensagem.getFaseAtualProposta());
    }

    definirBotao() {
        if(this.isExcluir){
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }else{

            this.tituloBotao = 'Gravar';
            this.botaoEncaminhar = true;
        }
    }

    definirTitulo() {
        if(this.isExcluir){
            this.tituloPagina = 'Cadastro de Proposta de Crédito';
        }else{

            this.tituloPagina = this.tomador ? 'Simulação' : 'Cadastro de Proposta de Crédito';
        }
    }

    novaSimulacao() {
        this.events.publish('simulacao:carregarNovaSimulacao');
        this.nav.pop();
    }

	enviarParaMesa() {
        let valorOperacaoFormatado = this.valorOperacao.toString().replace('.','').replace(',','.');
        // let capacidadePagamentoFormatado = this.capacidadePagamento.toString().replace('.','').replace(',','.');

		// let simulacaoDTO = JSON.stringify({
        //     quantidadeParcelas: this.parcela.quantidadeParcelas,
		// 	valorOperacao: valorOperacaoFormatado,
		// 	capacidadePagamento: capacidadePagamentoFormatado,
		// 	idOperacaoMicrocredito: this.idOperacaoMicrocredito,
        //     idNsuSimulacao: this.idNsuSimulacao,
        //     idLinhaCredito: this.linhaDeCredito.idLinhaCredito,
        //     identificadorLinhacredito: this.identificadorLinhacredito
        // });

        if(this.tituloBotao == 'Cancelar') {
            this.nav.push(OperacaoPage, {"tomador": this.tomadorLSE});
        } else{
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;

        }

		// this.http.post(Paths.SIMULACOES, simulacaoDTO).
		// 	subscribe((data) => {
        //         this.nav.push(PropostaPage, {"tomador": this.tomadorLSE});
		// 	}, (error) => {
        //         this.mensagem.mensagemAlerta('Atenção', JSON.parse(error._body).erro.mensagem);
        //     });
    }

    enviarParaDocumentacao() {
        // this.nav.push(DocumentacaoHomePage, {"tomador": this.tomadorLSE, "gravarEncaminhar":"Gravar"});
        this.setFaseAtualProposta();
        this.nav.push(DocumentacaoHomePage, {"tomador": this.mensagem.getTomador, "isMesa": false});
        
    }

    voltar() {
        this.nav.pop();
    }

    selecionarContaCredito(contas){

        this.contasCredito.map((listItem) => {
            if(contas == listItem ){
                listItem.cssClass = 'buttonSelect';
            } else{
                listItem.cssClass = 'buttonDefault';
            }
 
            return listItem;
 
        });

    }
    selecionarContaDebito(contas){

        this.contasDebito.map((listItem) => {
            if(contas == listItem ){
                listItem.cssClass = 'buttonSelect';
            } else{
                listItem.cssClass = 'buttonDefault';
            }
 
            return listItem;
 
        });

    }
}
