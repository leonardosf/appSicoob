var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ParamPath, Paths } from '../../app/paths';
import { ToastController, NavController, Events, NavParams, AlertController } from 'ionic-angular';
import { Util } from './../../app/util';
import { SimuladorDetalhePage, PropostaPage } from '../../app/paginas';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { LinhaCredito } from '../../model/LinhaCredito';
import { Seguro } from '../../model/Seguro';
var SimuladorPage = /** @class */ (function () {
    function SimuladorPage(http, toastCtrl, nav, events, navParams, mensagem, alertCtrl) {
        var _this = this;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.mensagem = mensagem;
        this.alertCtrl = alertCtrl;
        this.linhas = new Array();
        this.financiaTac = false;
        this.financiaIof = false;
        this.exibirGrid = false;
        this.tipoPessoa = "CPF";
        this.inputMaskCPF = Util.mask.CPF;
        this.inputMaskCNPJ = Util.mask.CNPJ;
        this.diaVencimento = 0;
        this.exibirTodosOsPlanos = false;
        this.exibirBotaoExpandir = true;
        this.campoSeguradora = false;
        this.campoCorretor = false;
        // capacidadePagamentoSomenteLeitura: boolean = false;
        this.trocaPagina = true;
        this.tipoSeguros = new Array();
        this.corretorSeguros = new Array();
        this.seguradoras = new Array();
        this.tabelasTaxaJuros = [];
        this.tituloSimular = "Calcular";
        this.tituloNovaSimulacao = "Nova simulação";
        this.tituloBotaoExpandir = "Exibir todos os prazos";
        this.tipoSeguros.push(new Seguro(1, "À VISTA"));
        this.tipoSeguros.push(new Seguro(2, "PARCELADO"));
        this.tipoSeguros.push(new Seguro(3, "INEXISTENTE"));
        this.corretorSeguros.push(new Seguro(1, "CORRETORA BOLA"));
        this.corretorSeguros.push(new Seguro(2, "CORRETORA QUADRADO"));
        this.seguradoras.push(new Seguro(1, "SEGUROS SAFE"));
        this.seguradoras.push(new Seguro(2, "SEGUROS MISTOS"));
        this.tomadorLSE = navParams.get('tomador');
        this.tomadorAvulso = navParams.get('tomadorAvulso');
        if (this.tomadorLSE) {
            this.nomePessoa = this.tomadorLSE.nomePessoa;
            var cpfCnpjLimpo = this.tomadorLSE.numCpfCnpj.replace(/[^\d]+/g, '');
            this.numCpfCnpj = cpfCnpjLimpo;
            this.tomador = { idPessoa: this.tomadorLSE.idPessoa };
            this.idOperacaoMicrocredito = this.tomadorLSE.proposta.idOperacaoCredito;
        }
        else if (this.tomadorAvulso) {
            this.nomePessoa = this.tomadorAvulso.nomePessoa;
            var cpfCnpjLimpo = this.tomadorAvulso.numCpfCnpj.replace(/[^\d]+/g, '');
            this.numCpfCnpj = cpfCnpjLimpo;
        }
        events.subscribe('simulacao:carregarNovaSimulacao', function () {
            _this.carregarNovaSimulacao();
        });
        this.tituloPagina = this.tomador ? 'Proposta | Simulação' : 'Simulação de Emprestimo';
        this.carregarDias();
        this.validarPrimeiroVencimento();
    }
    SimuladorPage.prototype.ionViewWillEnter = function () {
        this.carregarLinhas();
        this.carregarTabelasTaxaJuros();
    };
    SimuladorPage.prototype.validarPrimeiroVencimento = function () {
        this.primeiroVencimento = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
    };
    SimuladorPage.prototype.atualizarTrocaPagina = function () {
        this.trocaPagina = !(this.diaVencimento != null
            || this.valorOperacao != null
            || this.linhaDeCredito != null);
        // || (this.capacidadePagamentoSomenteLeitura==false && this.capacidadePagamento!=null));
    };
    SimuladorPage.prototype.ionViewDidLoad = function () {
        if (this.tomador != null) {
            this.carregarClassificacao();
        }
    };
    SimuladorPage.prototype.carregarNovaSimulacao = function () {
        console.log(this.financiaTac);
        this.exibirGrid = false;
        this.exibirTodosOsPlanos = false;
        this.montarTituloBotaoPrazos();
    };
    SimuladorPage.prototype.carregarClassificacao = function () {
        var _this = this;
        var param = ParamPath.parametro('idOperacao', this.idOperacaoMicrocredito.toString());
        this.http.get(Paths.getURL(Paths.OPERACOES_CLASSIFICACAO, param)).map(function (res) { return res.json(); }).
            subscribe(function (data) {
            if (data.capacidadePagamento == null) {
                _this.mensagem.mensagemAlerta('Atenção', 'Capacidade de pagamento em processamento.');
                _this.nav.push(PropostaPage, { "tomador": _this.tomadorLSE });
            }
            else if (data.capacidadePagamento == 0) {
                _this.mensagem.mensagemAlerta('Atenção', 'O tomador não possui capacidade de pagamento suficiente, informar manualmente.');
                // this.capacidadePagamento==null;
                // this.capacidadePagamentoSomenteLeitura=false;
            }
            else {
                var valorCapacidadePagamentoFormatada = data.capacidadePagamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                if (data.capacidadePagamento > 999999.99) {
                    _this.mensagemAlerta('Atenção', 'O valor R$ ' + valorCapacidadePagamentoFormatada + ' da capacidade de pagamento excede o limite máximo.');
                    return;
                }
                // this.capacidadePagamento = valorCapacidadePagamentoFormatada;
                // this.capacidadePagamentoSomenteLeitura=true;
            }
        }, function (erro) {
            _this.mensagemAlerta('Atenção', JSON.parse(erro._body).erro.mensagem);
        });
    };
    SimuladorPage.prototype.mensagemAlerta = function (titulo, mensagem) {
        var _this = this;
        var customParams = { enableBackdropDismiss: false, title: titulo, message: mensagem, buttons: [{
                    text: 'OK',
                    handler: function () {
                        _this.nav.push(PropostaPage, { "tomador": _this.tomadorLSE });
                    }
                }]
        };
        var params = Object.assign({}, customParams, { cssClass: 'mensage mensage-alert' });
        var alert = this.alertCtrl.create(params);
        alert.present();
    };
    SimuladorPage.prototype.carregarLinhas = function () {
        // this.http.get(Paths.LINHA).map(res => res.json()).subscribe((data) => {
        //    this.linhasTemp = data;
        //    this.linhasTemp.forEach((linha)=>{
        //        this.linhas.push(new LinhaCredito(linha.idLinhaCredito + ";"+ linha.dataCadastroLinhaCredito, linha.nomeComercialLinhaCredito));
        //    })
        // });
        this.linhas.push(new LinhaCredito(1 + ";" + new Date(), "CRÉDITO PESSOAL SICOOB - PRÉ"));
    };
    SimuladorPage.prototype.carregarTabelasTaxaJuros = function () {
        this.tabelasTaxaJuros = [{ idTabela: 1, nome: "TABELA MENSAL" }, { idTabela: 2, nome: "TABELA ANUAL" }];
        console.log(this.tabelasTaxaJuros);
    };
    SimuladorPage.prototype.filtrarPlanos = function (planos) {
        var planosFiltrados = [];
        for (var i = 0; i < this.planos.length; i++) {
            if (this.exibirTodosOsPlanos || this.planos[i].quantidadeParcelas % 12 === 0) {
                planosFiltrados.push(this.planos[i]);
            }
        }
        return planosFiltrados;
    };
    SimuladorPage.prototype.carregarDias = function () {
        this.dias = [];
        for (var i = 1; i <= 31; i++) {
            this.dias.push(i);
        }
    };
    SimuladorPage.prototype.carregarPlanos = function () {
        var valorOperacaoFormatado = this.valorOperacao.toString().replace('.', '').replace(',', '.');
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
        this.planos = [{ quantidadeParcelas: '12', maiorValorParcela: 500.00, percentualTaxaJuros: 1.3, primeiroVencimento: new Date('07/04/2018'),
                valorDoSeguro: 10, valorTotalIOF: 20, valorTAC: 30, percentualCETMensal: 2, percentualCETAnual: 24 }];
        this.exibirTodosOsPlanos = this.planos.length <= 12;
        this.exibirBotaoExpandir = this.planos.length > 12;
        this.planosAExibir = this.filtrarPlanos(this.planos);
        this.exibirGrid = this.planos.length > 0;
    };
    SimuladorPage.prototype.validarForm = function (form) {
        return this.quantidadeDeParcelas == null || !form.valid;
    };
    SimuladorPage.prototype.limparPlanos = function () {
        this.planos = null;
        this.quantidadeDeParcelas = null;
    };
    SimuladorPage.prototype.exibirTodos = function () {
        console.log(this.financiaTac);
        this.exibirTodosOsPlanos = !this.exibirTodosOsPlanos;
        this.planosAExibir = this.filtrarPlanos(this.planos);
        this.montarTituloBotaoPrazos();
    };
    SimuladorPage.prototype.montarTituloBotaoPrazos = function () {
        this.tituloBotaoExpandir = this.exibirTodosOsPlanos ? "Exibir prazos parciais" : "Exibir todos os prazos";
    };
    SimuladorPage.prototype.simular = function (form) {
        if (form.valid) {
            this.quantidadeDeParcelas = null;
            this.exibirTodosOsPlanos = false;
            this.carregarPlanos();
        }
    };
    SimuladorPage.prototype.atualizacaoSeguro = function () {
        if (this.tipoDeSeguro == 3) {
            this.campoCorretor = true;
            this.campoSeguradora = true;
            this.corretorDeSeguro = null;
            this.seguradoraDeSeguro = null;
        }
        else {
            this.campoCorretor = false;
            this.campoSeguradora = false;
        }
    };
    SimuladorPage.prototype.limpar = function (form) {
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
        this.tabelaTaxaJuros = null;
    };
    SimuladorPage.prototype.verificaLinhaSelecionada = function () {
        var _this = this;
        this.linhas.forEach(function (linhaElement) {
            console.log(linhaElement);
            if (_this.linhaDeCredito === linhaElement.idLinhaCredito) {
                var linhaOrganizada = linhaElement.idLinhaCredito.split(";");
                _this.linhaDeCredito = linhaOrganizada[0];
                _this.dataCadastroLinhaCredito = linhaOrganizada[1];
                _this.nomeComercialLinhaCredito = linhaElement.nomeComercialLinhaCredito;
                _this.identificadorLinhacredito = linhaElement.idLinhaCredito;
                _this.linhaVerificada = linhaElement;
                _this.linhaVerificada.idLinhaCredito = _this.linhaDeCredito;
                console.log(_this.linhaVerificada);
            }
        });
    };
    SimuladorPage.prototype.detalharParcela = function (parcelaSelecionada) {
        this.mensagem.setFaseAtualProposta("Cadastro");
        console.log("primeiro vencimento=" + this.primeiroVencimento + " Dia Vencimento" + this.diaVencimento);
        this.nav.push(SimuladorDetalhePage, { tomador: this.tomador,
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
    };
    SimuladorPage = __decorate([
        Component({
            templateUrl: 'simulador.html'
        }),
        __metadata("design:paramtypes", [Http, ToastController,
            NavController, Events, NavParams,
            MensagemServicoProvider, AlertController])
    ], SimuladorPage);
    return SimuladorPage;
}());
export { SimuladorPage };
//# sourceMappingURL=simulador.js.map