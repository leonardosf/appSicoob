var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { EnquadramentoDTO } from "../../model/EnquadramentoDTO";
import { EnquadramentoPropostaCreditoDTO } from "../../model/EnquadramentoPropostaCreditoDTO";
import { EnquadramentoParcelamentoDTO } from "../../model/EnquadramentoParcelamentoDTO";
import { EnquadramentoTaxasDTO } from "../../model/EnquadramentoTaxasDTO";
import { EnquadramentoSeguroDTO } from "../../model/EnquadramentoSeguroDTO";
import { EnquadramentoResPlanoPagamentoDTO } from "../../model/EnquadramentoResPlanoPagamentoDTO";
import { DadosClienteDTO } from "../../model/DadosClienteDTO";
import { DadosClientePessoaFisicaDTO } from "../../model/DadosClientePessoaFisicaDTO";
import { DadosClienteConjugeDTO } from "../../model/DadosClienteConjugeDTO";
import { DadosClienteInfCadasPositivasDTO } from "../../model/DadosClienteInfCadasPositivasDTO";
import { DadosClienteRespDiretaDTO } from "../../model/DadosClienteRespDiretaDTO";
import { DadosClienteRespContaCorrenteDTO } from "../../model/DadosClienteRespContaCorrenteDTO";
import { ReciprocidadeClienteDTO } from "../../model/ReciprocidadeClienteDTO";
import { ReciprocidadeClienteAssociadoDTO } from "../../model/ReciprocidadeClienteAssociadoDTO";
import { ReciprocidadeClienteSaldoMedioCCDTO } from "../../model/ReciprocidadeClienteSaldoMedioCCDTO";
import { ReciprocidadeClienteContaCorrenteDTO } from "../../model/ReciprocidadeClienteContaCorrenteDTO";
import { ReciprocidadeClienteAplicacaoDTO } from "../../model/ReciprocidadeClienteAplicacaoDTO";
import { ReciprocidadeClienteCobrancaDTO } from "../../model/ReciprocidadeClienteCobrancaDTO";
import { ReciprocidadeClienteSaldoProcapCredDTO } from "../../model/ReciprocidadeClienteSaldoProcapCredDTO";
import { AnalisesDiversasDTO } from "../../model/AnalisesDiversasDTO";
import { AnalisesDiversasCapPagAnualEntidadeDTO } from "../../model/AnalisesDiversasCapPagAnualEntidadeDTO";
import { AnalisesDiversasCapPagAnualSCRDTO } from "../../model/AnalisesDiversasCapPagAnualSCRDTO";
import { AnalisesDiversasEndividamentoEntBanDTO } from "../../model/AnalisesDiversasEndividamentoEntBanDTO";
import { AnalisesDiversasEndividamentoSCRDTO } from "../../model/AnalisesDiversasEndividamentoSCRDTO";
import { AnotacoesCadastraisDTO } from "../../model/AnotacoesCadastraisDTO";
import { AnotacoesCadastraisImpetitivaAbsolutaDTO } from "../../model/AnotacoesCadastraisImpetitivaAbsolutaDTO";
var EstudoPage = /** @class */ (function () {
    function EstudoPage(navParams) {
        this.navParams = navParams;
        this.itens = [];
        this.trocaPagina = true;
        this.itemSelecionado = '$mc-icon-expandir';
        this.tomador = navParams.get('tomador');
        this.comporEnquadramento();
        this.comporDadosCliente();
        this.comporReciprocidade();
        this.comporAnalisesDiversas();
        this.comporAnotacoesCadastrais();
        this.comporItens();
    }
    EstudoPage.prototype.comporItens = function () {
        this.itens = [
            { titulo: 'Enquadramento da Proposta',
                icon: 'mc-icon-calculadora',
                dto: this.enquadramentoDTO,
                expanded: false },
            { titulo: 'Dados do Cliente',
                icon: 'mc-icon-pessoa',
                dto: this.dadosClienteDTO,
                expanded: false },
            { titulo: 'Reciprocidade do Cliente',
                icon: 'mc-icon-pessoa',
                dto: this.reciprocidadeClienteDTO,
                expanded: false },
            { titulo: 'Análises Diversas',
                icon: 'mc-icon-analises',
                dto: this.analisesDiversasDTO,
                expanded: false },
            { titulo: 'Grupo Econômico',
                icon: 'mc-icon-grupo',
                dto: this.enquadramentoDTO,
                expanded: false },
            { titulo: 'Análise de Garantia',
                icon: 'mc-icon-analises',
                dto: this.enquadramentoDTO,
                expanded: false },
            { titulo: 'Anotações Cadastrais',
                icon: 'mc-icon-anotacoes',
                dto: this.anotacoesCadastraisDTO,
                expanded: false },
            { titulo: 'Anotações de Crédito',
                icon: 'mc-icon-anotacoesC',
                dto: this.enquadramentoDTO,
                expanded: false }
        ];
    };
    EstudoPage.prototype.comporAnotacoesCadastrais = function () {
        this.anotacoesCadastraisDTO = new AnotacoesCadastraisDTO();
        this.anotacoesCadastraisDTO.setAnotacoesCadastraisImpetitivaAbsolutaDTO(new AnotacoesCadastraisImpetitivaAbsolutaDTO());
        this.anotacoesCadastraisDTO.getAnotacoesCadastraisImpetitivaAbsolutaDTO().lstImpetitivaAbsoluta = [{ tipo: "Crédito baixado como prejuízo",
                quantidade: 1,
                valor: 77492,
                origemInfo: "serasa",
                dtAnotacao: new Date,
                dtOcorrencia: new Date },
            { tipo: "Declarações Falsas Prejudiciais",
                quantidade: 1,
                valor: 77492,
                origemInfo: "serasa",
                dtAnotacao: new Date,
                dtOcorrencia: new Date }];
    };
    EstudoPage.prototype.comporAnalisesDiversas = function () {
        this.analisesDiversasDTO = new AnalisesDiversasDTO();
        this.analisesDiversasDTO.setAnalisesDiversasCapPagAnualEntidadeDTO(new AnalisesDiversasCapPagAnualEntidadeDTO());
        this.analisesDiversasDTO.getAnalisesDiversasCapPagAnualEntidadeDTO().receitaBrutaAnual = 200000;
        this.analisesDiversasDTO.getAnalisesDiversasCapPagAnualEntidadeDTO().dividas = 3450;
        this.analisesDiversasDTO.getAnalisesDiversasCapPagAnualEntidadeDTO().capacidadePagamento = 190000;
        this.analisesDiversasDTO.setAnalisesDiversasCapPagAnualSCRDTO(new AnalisesDiversasCapPagAnualSCRDTO());
        this.analisesDiversasDTO.getAnalisesDiversasCapPagAnualSCRDTO().receitaBrutaAnual = 2000000;
        this.analisesDiversasDTO.getAnalisesDiversasCapPagAnualSCRDTO().dataBaseConsultaSCR = "";
        this.analisesDiversasDTO.getAnalisesDiversasCapPagAnualSCRDTO().capacidadePagamento = 0;
        this.analisesDiversasDTO.setAnalisesDiversasEndividamentoEntBanDTO(new AnalisesDiversasEndividamentoEntBanDTO());
        this.analisesDiversasDTO.getAnalisesDiversasEndividamentoEntBanDTO().patrimonioTotal = 30000;
        this.analisesDiversasDTO.getAnalisesDiversasEndividamentoEntBanDTO().dividas = 10000;
        this.analisesDiversasDTO.getAnalisesDiversasEndividamentoEntBanDTO().grauEndividamento = 500000;
        this.analisesDiversasDTO.setAnalisesDiversasEndividamentoSCRDTO(new AnalisesDiversasEndividamentoSCRDTO());
        this.analisesDiversasDTO.getAnalisesDiversasEndividamentoSCRDTO().patrimonioTotal = 25000;
        this.analisesDiversasDTO.getAnalisesDiversasEndividamentoSCRDTO().dividas = 0;
        this.analisesDiversasDTO.getAnalisesDiversasEndividamentoSCRDTO().grauEndividamento = 0;
    };
    EstudoPage.prototype.comporReciprocidade = function () {
        this.reciprocidadeClienteDTO = new ReciprocidadeClienteDTO();
        this.reciprocidadeClienteDTO.setReciprocidadeClienteAssociadoDTO(new ReciprocidadeClienteAssociadoDTO());
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().associadoDesde = new Date;
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().dataUltimaIntegralizacao = new Date;
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().valorUltimaIntegralizacao = "100,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().capitalSubscrito = "800,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().capitalIntegralizado = "600,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().capitalAIntegralizar = "200,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAssociadoDTO().capitalBloqueado = "0,00";
        this.reciprocidadeClienteDTO.setReciprocidadeClienteContaCorrenteDTO(new ReciprocidadeClienteContaCorrenteDTO());
        this.reciprocidadeClienteDTO.getReciprocidadeClienteContaCorrenteDTO().clienteDesde = new Date;
        this.reciprocidadeClienteDTO.getReciprocidadeClienteContaCorrenteDTO().saldoCC = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteContaCorrenteDTO().limeteContaCorrente = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteContaCorrenteDTO().depositosBloqueados = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteContaCorrenteDTO().saldoBloqueadoJudicial = "0,00";
        this.reciprocidadeClienteDTO.setReciprocidadeClienteSaldoMedioCCDTO(new ReciprocidadeClienteSaldoMedioCCDTO());
        this.reciprocidadeClienteDTO.getReciprocidadeClienteSaldoMedioCCDTO().periodo = [{ mes: new Date, valor: "300,00" },
            { mes: new Date, valor: "600,00" },
            { mes: new Date, valor: "900,00" }];
        this.reciprocidadeClienteDTO.getReciprocidadeClienteSaldoMedioCCDTO().mediaTrimestral = "600,00";
        this.reciprocidadeClienteDTO.setReciprocidadeClienteAplicacaoDTO(new ReciprocidadeClienteAplicacaoDTO());
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().depositoPrazoDisponivel = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().depositoSemVencimetoDisponivel = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().poupancaRuralDisponivel = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().lcaDisponivel = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().depositoPrazoBloqueado = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().depositoSemVencimentoBloqueado = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().poupancaRuralBloqueado = "0,00";
        this.reciprocidadeClienteDTO.getReciprocidadeClienteAplicacaoDTO().lcsBloqueado = "0,00";
        this.reciprocidadeClienteDTO.setReciprocidadeClienteCobrancaDTO(new ReciprocidadeClienteCobrancaDTO());
        this.reciprocidadeClienteDTO.getReciprocidadeClienteCobrancaDTO().cobrancaSimples = 0;
        this.reciprocidadeClienteDTO.getReciprocidadeClienteCobrancaDTO().cobrancaVinculada = 500;
        this.reciprocidadeClienteDTO.getReciprocidadeClienteCobrancaDTO().cobrancaCaucionada = 1000;
        this.reciprocidadeClienteDTO.setReciprocidadeClienteSaldoProcapCredDTO(new ReciprocidadeClienteSaldoProcapCredDTO());
        this.reciprocidadeClienteDTO.getReciprocidadeClienteSaldoProcapCredDTO().valorOp = 0;
        this.reciprocidadeClienteDTO.getReciprocidadeClienteSaldoProcapCredDTO().saldoDev = 0;
    };
    EstudoPage.prototype.comporDadosCliente = function () {
        this.dadosClienteDTO = new DadosClienteDTO();
        this.dadosClienteDTO.setDadosClientePessoaFisicaDTO(new DadosClientePessoaFisicaDTO());
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().dataNascimento = new Date;
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().idade = "47 anos";
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().profissao = "Análista";
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().estadoCivil = "Solteiro";
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().regimeCasamento = "Comunhão Parcial";
        this.dadosClienteDTO.setDadosClienteConjugeDTO(new DadosClienteConjugeDTO());
        this.dadosClienteDTO.getDadosClienteConjugeDTO().nome = "Maria maria";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().cpf = "999.999.999-99";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().profissao = "Bancária";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().rendaBrutaMensalFixa = "10.000";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().rendaBrutaMensalVariavel = "1.000";
        this.dadosClienteDTO.setDadosClienteInfCadasPositivasDTO(new DadosClienteInfCadasPositivasDTO());
        this.dadosClienteDTO.getDadosClienteInfCadasPositivasDTO().patrimonioTotal = "200.000";
        this.dadosClienteDTO.getDadosClienteInfCadasPositivasDTO().rendaReceitaBrutaMensalFixa = "10.000";
        this.dadosClienteDTO.getDadosClienteInfCadasPositivasDTO().rendaReceitaBrutaMensalVariavel = "5.000";
        this.dadosClienteDTO.setDadosClienteRespDiretaDTO(new Array());
        var respDireta = new DadosClienteRespDiretaDTO;
        respDireta.produto = "EMP";
        respDireta.vencido = "800,00";
        respDireta.curtoPrazo = "1.800,00";
        respDireta.medioPrazo = "2.800,00";
        respDireta.longoPrazo = "5.600,00";
        respDireta.saldoDevedor = "10.600,00";
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().push(respDireta);
        this.dadosClienteDTO.setDadosClienteRespIndiretaDTO(new Array());
        var respIndireta = new DadosClienteRespDiretaDTO;
        respIndireta.produto = "EMP";
        respIndireta.vencido = "1.800,00";
        respIndireta.curtoPrazo = "11.800,00";
        respIndireta.medioPrazo = "21.800,00";
        respIndireta.longoPrazo = "51.600,00";
        respIndireta.saldoDevedor = "101.600,00";
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().push(respIndireta);
        this.dadosClienteDTO.setDadosClienteRespContaCorrenteDTO(new DadosClienteRespContaCorrenteDTO());
        this.dadosClienteDTO.getDadosClienteRespContaCorrenteDTO().utilizacaoLimeteCC = "0,00";
        this.dadosClienteDTO.getDadosClienteRespContaCorrenteDTO().qtdDiasUtilizacaoLimeteCC = "0";
        this.dadosClienteDTO.getDadosClienteRespContaCorrenteDTO().adiantamentoDepositante = "0,00";
        this.dadosClienteDTO.getDadosClienteRespContaCorrenteDTO().riscoSacado = "0,00";
    };
    EstudoPage.prototype.comporEnquadramento = function () {
        this.enquadramentoDTO = new EnquadramentoDTO;
        this.enquadramentoDTO.setEnquadramentoPropostaCreditoDTO(new EnquadramentoPropostaCreditoDTO());
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().dataProposta = new Date;
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().classificacaoOperacao = "A";
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().origemRecurso = "Recursos Próprios Livres";
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().finalidade = "Veículos Pesados Usados";
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().perfilTarifaril = "Perfil Isento Pessoa Fisica";
        this.enquadramentoDTO.setEnquadramentoParcelamentoDTO(new EnquadramentoParcelamentoDTO());
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().periodicidade = "MENSAL";
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().tipoVencimento = "DIA FIXO";
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().dia = "2";
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().primeiroVencimento = new Date;
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().ultimoVencimento = new Date;
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().diasOperacao = 254;
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().financiaIOF = false;
        this.enquadramentoDTO.getEnquadramentoParcelamentoDTO().financiaTAC = true;
        this.enquadramentoDTO.setEnquadramentoTaxasDTO(new EnquadramentoTaxasDTO());
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().tipoTaxaJuros = "Editável";
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().taxaJuros = "10,0000 % a.a.";
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().taxaMora = "8,0000 % a.a.";
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().taxaJurosInad = "1,5000 % a.m.";
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().taxaMulta = "8,0000 %";
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().indiceAtraso = "";
        this.enquadramentoDTO.getEnquadramentoTaxasDTO().indiceCorrecao = "";
        this.enquadramentoDTO.setEnquadramentoSeguroDTO(new EnquadramentoSeguroDTO());
        this.enquadramentoDTO.getEnquadramentoSeguroDTO().tipo = "À Vista";
        this.enquadramentoDTO.getEnquadramentoSeguroDTO().corretor = "";
        this.enquadramentoDTO.getEnquadramentoSeguroDTO().seguradora = "";
        this.enquadramentoDTO.setEnquadramentoResPlanoPagamentoDTO(new EnquadramentoResPlanoPagamentoDTO());
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().menorValorParcela = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().maiorValorParcela = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().valorJuros = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().valorIOFADC = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().valorTAC = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().seguro = "2,88";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().cetAnual = "239,1897 %";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().cetMensal = "10,5599 %";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().demaisDespesas = "0,00";
    };
    EstudoPage.prototype.expandItem = function (item) {
        var _this = this;
        this.itens.map(function (listItem) {
            if (item == listItem && item.dto) {
                listItem.expanded = !item.expanded;
            }
            _this.itemSelecionado = 'mc-icon-expandir';
            return listItem;
        });
    };
    EstudoPage = __decorate([
        Component({
            templateUrl: 'estudo.html'
        }),
        __metadata("design:paramtypes", [NavParams])
    ], EstudoPage);
    return EstudoPage;
}());
export { EstudoPage };
//# sourceMappingURL=estudo.js.map