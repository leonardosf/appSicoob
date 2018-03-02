import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {ParamPath, Paths} from '../../app/paths';
import { ToastController, NavController, Events, NavParams, AlertController } from 'ionic-angular';
import { Util } from './../../app/util';
import { SimuladorDetalhePage, PropostaPage } from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { TomadorLSE } from '../../model/TomadorLSE';
import { LinhaCredito } from '../../model/LinhaCredito';
import { Seguro } from '../../model/Seguro';

@Component({
    templateUrl: 'simulador.html'
})
export class SimuladorPage {
	idOperacaoMicrocredito: Number;
    idNsuSimulacao: String;
    nomePessoa: String;
    numCpfCnpj: string;
    tomador: any;
    tomadorAvulso: TomadorLSE;
    tomadorLSE: TomadorLSE;
    linhas: Array<LinhaCredito> = new Array<LinhaCredito>();
    linhasTemp: Array<LinhaCredito>;
    linhaDeCredito: Number;
    planos: any;
    dias: any;
    financiaTac: boolean = false;
    financiaIof: boolean = false;
    planosAExibir: any;
    valorOperacao: Number;
    primeiroVencimento: Date;
    // capacidadePagamento: Number;
    quantidadeDeParcelas: Number;
    descricaoLinhaCredito: String;
    tituloSimular: String;
    tituloNovaSimulacao: String;
    tituloBotaoExpandir: String;
    exibirGrid: boolean = false;
    tipoPessoa: String = "CPF";
    inputMaskCPF: String = Util.mask.CPF;
    inputMaskCNPJ: String = Util.mask.CNPJ;
    diaVencimento: Number = 0;
    exibirTodosOsPlanos: boolean = false;
    exibirBotaoExpandir: boolean = true;
    tituloPagina: String;
    // capacidadePagamentoSomenteLeitura: boolean = false;
    trocaPagina:boolean = true;
    identificadorLinhacredito:string;
    nomeComercialLinhaCredito:string;
    dataCadastroLinhaCredito:any;
    linhaVerificada:any;
    tipoSeguros:  Array<Seguro> = new Array<Seguro>();
    tipoDeSeguro: number;
    corretorSeguros:  Array<Seguro> = new Array<Seguro>();
    corretorDeSeguro: number;
    seguradoraDeSeguro: number;
    seguradoras: Array<Seguro> = new Array<Seguro>();


    constructor(private http:Http, private toastCtrl: ToastController,
        public nav: NavController, events: Events, public navParams: NavParams,
        private mensagem: MensagemServicoProvider, private alertCtrl: AlertController) {
        this.tituloSimular = "Calcular";
        this.tituloNovaSimulacao = "Nova simulação";
        this.tituloBotaoExpandir = "Exibir todos os prazos";

        this.tipoSeguros.push(new Seguro(1 , "À VISTA"));
        this.tipoSeguros.push(new Seguro(2 , "PARCELADO"));
        this.tipoSeguros.push(new Seguro(3 , "INEXISTENTE"));
        this.corretorSeguros.push(new Seguro(1 , "CORRETORA BOLA"));
        this.corretorSeguros.push(new Seguro(2 , "CORRETORA QUADRADO"));
        this.seguradoras.push(new Seguro(1 , "SEGUROS SAFE"));
        this.seguradoras.push(new Seguro(2 , "SEGUROS MISTOS"));

        this.tomadorLSE = navParams.get('tomador');
        this.tomadorAvulso = navParams.get('tomadorAvulso');
        if (this.tomadorLSE) {
            this.nomePessoa = this.tomadorLSE.nomePessoa;
            let cpfCnpjLimpo = this.tomadorLSE.numCpfCnpj.replace(/[^\d]+/g,'');
            this.numCpfCnpj = cpfCnpjLimpo;
            this.tomador = {idPessoa:this.tomadorLSE.idPessoa};
		    this.idOperacaoMicrocredito = this.tomadorLSE.proposta.idOperacaoCredito;
        } else if (this.tomadorAvulso) {
            this.nomePessoa = this.tomadorAvulso.nomePessoa;
            let cpfCnpjLimpo = this.tomadorAvulso.numCpfCnpj.replace(/[^\d]+/g,'');
            this.numCpfCnpj = cpfCnpjLimpo;
        }
        events.subscribe('simulacao:carregarNovaSimulacao', () => {
            this.carregarNovaSimulacao();
        });
        this.tituloPagina = this.tomador ? 'Proposta | Simulação' : 'Simulação de Emprestimo';
        this.carregarDias();
        this.validarPrimeiroVencimento();
    }

    ionViewWillEnter() {
        this.carregarLinhas();
    }

    validarPrimeiroVencimento() {

        this.primeiroVencimento = new Date(new Date().getTime()+30*24*60*60*1000);
    }

    atualizarTrocaPagina() {
        this.trocaPagina = !(
            this.diaVencimento != null
            || this.valorOperacao != null
            || this.linhaDeCredito != null);
            // || (this.capacidadePagamentoSomenteLeitura==false && this.capacidadePagamento!=null));
    }

    ionViewDidLoad() {
		if (this.tomador!=null) {
			this.carregarClassificacao();
		}
    }

	carregarNovaSimulacao() {
        console.log(this.financiaTac);
        this.exibirGrid = false;
        this.exibirTodosOsPlanos = false;
        this.montarTituloBotaoPrazos();
	}

	carregarClassificacao() {
    let param:ParamPath = ParamPath.parametro('idOperacao', this.idOperacaoMicrocredito.toString());

		this.http.get(Paths.getURL(Paths.OPERACOES_CLASSIFICACAO, param)).map(res => res.json()).
			subscribe((data) => {
                if (data.capacidadePagamento==null) {
                    this.mensagem.mensagemAlerta('Atenção', 'Capacidade de pagamento em processamento.');
                    this.nav.push(PropostaPage, {"tomador":this.tomadorLSE});
                } else if (data.capacidadePagamento==0) {
                    this.mensagem.mensagemAlerta('Atenção', 'O tomador não possui capacidade de pagamento suficiente, informar manualmente.');
                    // this.capacidadePagamento==null;
                    // this.capacidadePagamentoSomenteLeitura=false;
                } else {
                    let valorCapacidadePagamentoFormatada = data.capacidadePagamento.toLocaleString('pt-BR', {minimumFractionDigits:2,maximumFractionDigits:2});
                    if (data.capacidadePagamento>999999.99) {
                        this.mensagemAlerta('Atenção', 'O valor R$ ' + valorCapacidadePagamentoFormatada + ' da capacidade de pagamento excede o limite máximo.');
                        return;
                    }
                    // this.capacidadePagamento = valorCapacidadePagamentoFormatada;
                    // this.capacidadePagamentoSomenteLeitura=true;
                }
			},
      (erro) => {
        this.mensagemAlerta('Atenção', JSON.parse(erro._body).erro.mensagem);
      });
    }

    public mensagemAlerta(titulo, mensagem){
        let customParams = {enableBackdropDismiss: false, title: titulo, message: mensagem, buttons: [{
            text: 'OK',
            handler: () => {
                this.nav.push(PropostaPage, {"tomador": this.tomadorLSE});
            }}]
        };
        let params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
        let alert = this.alertCtrl.create(params);

        alert.present();
    }

    carregarLinhas() {
        // this.http.get(Paths.LINHA).map(res => res.json()).subscribe((data) => {
        //    this.linhasTemp = data;
        //    this.linhasTemp.forEach((linha)=>{
        //        this.linhas.push(new LinhaCredito(linha.idLinhaCredito + ";"+ linha.dataCadastroLinhaCredito, linha.nomeComercialLinhaCredito));
        //    })

        // });
        this.linhas.push(new LinhaCredito(1 + ";"+ new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ"));
    }

    filtrarPlanos(planos) {
        let planosFiltrados = [];
        for (var i = 0; i < this.planos.length; i++) {
            if (this.exibirTodosOsPlanos || this.planos[i].quantidadeParcelas % 12===0) {
                planosFiltrados.push(this.planos[i]);
            }
        }
        return planosFiltrados;
    }

    carregarDias() {
        this.dias = []
        for (var i = 1; i <= 31; i++) {
            this.dias.push(i);
        }
    }

    carregarPlanos() {
        
        let valorOperacaoFormatado = this.valorOperacao.toString().replace('.','').replace(',','.');
        // let capacidadePagamentoFormatado = this.capacidadePagamento.toString().replace('.','').replace(',','.');
         this.verificaLinhaSelecionada();
        this.descricaoLinhaCredito = this.nomeComercialLinhaCredito;
        
        // let params:ParamPath = new ParamPath();
        // params.adicionar('idLinhaCredito', this.linhaDeCredito.toString());
        // params.adicionar('dataCadastroLinhaCredito', this.dataCadastroLinhaCredito);
        // params.adicionar('valorOperacao', valorOperacaoFormatado);
        // params.adicionar('diaVencimento', this.diaVencimento.toString());
        // params.adicionar('capacidadePagamento', capacidadePagamentoFormatado);
        // params.adicionar('numCpfCnpj', this.numCpfCnpj);
        // params.adicionar('idPessoa', this.tomador ? this.tomador.idPessoa : 0);

        // this.http.get(Paths.getURL(Paths.PLANOS_PAGAMENTO, params)).map(res => res.json()).
        //     subscribe((data) => {
		// 		this.idNsuSimulacao = data.idSimulacao;
        //         this.planos = data.parcelasLSE;
        //         this.exibirTodosOsPlanos = this.planos.length <= 12;
        //         this.exibirBotaoExpandir = this.planos.length > 12;
		// 		this.planosAExibir = this.filtrarPlanos(this.planos);
        //         this.exibirGrid = this.planos.length > 0;
        //         if (this.planos.length == 0) {
        //             this.mensagem.mensagemAlerta('Atenção', 'Não foi encontrado plano de pagamento para a simulação informada.');
        //         }
        //     });

        this.idNsuSimulacao = 'IDNSU-123456789';
        this.planos = [{quantidadeParcelas : '12', maiorValorParcela:500.00,  percentualTaxaJuros:1.3, primeiroVencimento: new Date('07/04/2018'),
        valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual:24  }];
        this.exibirTodosOsPlanos = this.planos.length <= 12;
        this.exibirBotaoExpandir = this.planos.length > 12;
        this.planosAExibir = this.filtrarPlanos(this.planos);
        this.exibirGrid = this.planos.length > 0;
    }

    validarForm(form) {
        return this.quantidadeDeParcelas == null || !form.valid;
    }

    limparPlanos() {
        this.planos = null;
        this.quantidadeDeParcelas = null;
    }

    exibirTodos() {
        console.log(this.financiaTac);
        this.exibirTodosOsPlanos = !this.exibirTodosOsPlanos;
        this.planosAExibir = this.filtrarPlanos(this.planos);
        this.montarTituloBotaoPrazos();
    }

    montarTituloBotaoPrazos() {
        this.tituloBotaoExpandir = this.exibirTodosOsPlanos ? "Exibir prazos parciais" : "Exibir todos os prazos";
    }

    simular(form) {
        if (form.valid) {
            this.quantidadeDeParcelas = null;
            this.exibirTodosOsPlanos = false;
            this.carregarPlanos();
        }
    }

    limpar(form) {
        this.trocaPagina = true;
        this.quantidadeDeParcelas = null;
        // if (this.capacidadePagamentoSomenteLeitura==false) {
        //     this.capacidadePagamento = null;
        // }
        this.primeiroVencimento = null;
        this.diaVencimento = null;
        this.valorOperacao = null;
        this.planos = null;
        this.planosAExibir = null;
        this.linhaDeCredito = null;
        this.tipoDeSeguro = null;
        this.seguradoraDeSeguro = null;
        this.corretorDeSeguro = null;
        this.financiaTac = null;
        this.financiaIof = null;
    }

    verificaLinhaSelecionada() {
        

        this.linhas.forEach((linhaElement)=>{
            console.log(linhaElement);
            if (this.linhaDeCredito === linhaElement.idLinhaCredito) {
                let linhaOrganizada = linhaElement.idLinhaCredito.split(";");                
                
                this.linhaDeCredito = linhaOrganizada[0];
                this.dataCadastroLinhaCredito = linhaOrganizada[1];
                this.nomeComercialLinhaCredito = linhaElement.nomeComercialLinhaCredito;
                this.identificadorLinhacredito = linhaElement.idLinhaCredito;    
                this.linhaVerificada = linhaElement;
                this.linhaVerificada.idLinhaCredito = this.linhaDeCredito;
                console.log(this.linhaVerificada);
            }                        
        });

                
    }

    detalharParcela(parcelaSelecionada) {
        
        this.mensagem.setFaseAtualProposta("Cadastro");
        console.log("primeiro vencimento="+this.primeiroVencimento+ " Dia Vencimento"+this.diaVencimento);
        this.nav.push(SimuladorDetalhePage,
            {tomador: this.tomador,
                nomePessoa: this.nomePessoa,
                numCpfCnpj: this.numCpfCnpj,
                tomadorLSE: this.tomadorLSE,
                // capacidadePagamento: this.capacidadePagamento,
                primeiroVencimento: this.primeiroVencimento != null ? this.primeiroVencimento : this.diaVencimento,
                linhaDeCredito: this.linhaVerificada,
                parcela: parcelaSelecionada,
                valorOperacao: this.valorOperacao,
				idNsuSimulacao: this.idNsuSimulacao,
                idOperacaoMicrocredito: this.idOperacaoMicrocredito,
                identificadorLinhacredito: this.identificadorLinhacredito
            });
    }

}
