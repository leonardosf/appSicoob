import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { TomadorLSE } from "../../model/TomadorLSE";
import { EnquadramentoDTO } from "../../model/EnquadramentoDTO";
import { FaseDocumento } from "../../model/FaseDocumento";
import { EnquadramentoPropostaCreditoDTO } from "../../model/EnquadramentoPropostaCreditoDTO";
import { EnquadramentoParcelamentoDTO } from "../../model/EnquadramentoParcelamentoDTO";
import { EnquadramentoTaxasDTO } from "../../model/EnquadramentoTaxasDTO";
import { EnquadramentoSeguroDTO } from "../../model/EnquadramentoSeguroDTO";
import { EnquadramentoResPlanoPagamentoDTO } from "../../model/EnquadramentoResPlanoPagamentoDTO";
import { DadosClienteDTO } from "../../model/DadosClienteDTO";
import { DadosClientePessoaFisicaDTO } from "../../model/DadosClientePessoaFisicaDTO";
import { DadosClienteConjugeDTO } from "../../model/DadosClienteConjugeDTO";
import { DadosClienteInfCadastraisPositivasDTO } from "../../model/DadosClienteInfCadastraisPositivasDTO";
import { DadosClienteRespDiretaDTO } from "../../model/DadosClienteRespDiretaDTO";
import { DadosClienteRespIndiretaDTO } from "../../model/DadosClienteRespIndiretaDTO";

@Component({
    templateUrl: 'estudo.html'
})

export class EstudoPage{
 
    private tomador:TomadorLSE;
    items: any = [];
    enquadramentoDTO:EnquadramentoDTO;
    dadosClienteDTO:DadosClienteDTO;
    trocaPagina:boolean = true;

    constructor(public navParams: NavParams) {

        this.tomador = navParams.get('tomador');

        this.comporEnquadramento();

        this.comporDadosCliente();

        this.comporReciprocidade();

        this.comporAnaliseDiversas();

        this.comporGrupoEconomico();

        this.comporAnalisesGarantia();

        this.comporAnotacoesCadastrais();

        this.comporAnotacoesCredito();

        this.comporItensList();
    
    }

    comporAnotacoesCredito(): any {
        // throw new Error("Method not implemented.");
    }

    comporAnotacoesCadastrais(): any {
        // throw new Error("Method not implemented.");
    }

    comporAnalisesGarantia(): any {
        // throw new Error("Method not implemented.");
    }

    comporGrupoEconomico(): any {
        // throw new Error("Method not implemented.");
    }

    comporAnaliseDiversas(): any {
        // throw new Error("Method not implemented.");
    }

    comporDadosCliente(): any {
        
        this.dadosClienteDTO = new DadosClienteDTO();
        this.dadosClienteDTO.setDadosClientePessoaFisicaDTO(new DadosClientePessoaFisicaDTO());
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().dataNascimento = new Date;
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().idade = 47;
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().profissao = "";
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().estadoCivil = "Solteiro";
        this.dadosClienteDTO.getDadosClientePessoaFisicaDTO().regimeCasamento = "";

        this.dadosClienteDTO.setDadosClienteConjugeDTO(new DadosClienteConjugeDTO());
        this.dadosClienteDTO.getDadosClienteConjugeDTO().nome = "Maria maria";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().cpf = "999.999.999-99";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().profissao = "Analista";
        this.dadosClienteDTO.getDadosClienteConjugeDTO().rendaBrutaMensal = 20000;
        this.dadosClienteDTO.getDadosClienteConjugeDTO().rendaBrutaMensalVariavel = 5000;

        this.dadosClienteDTO.setDadosClienteInfCadastraisPositivasDTO(new DadosClienteInfCadastraisPositivasDTO());
        this.dadosClienteDTO.getDadosClienteInfCadastraisPositivasDTO().patrimonioTotal = 200000;
        this.dadosClienteDTO.getDadosClienteInfCadastraisPositivasDTO().rendaReceitaBrutaMensal = 20000;
        this.dadosClienteDTO.getDadosClienteInfCadastraisPositivasDTO().rendaReceitaBrutaMensalVariavel = 5000;

        this.dadosClienteDTO.setDadosClienteRespDiretaDTO(new DadosClienteRespDiretaDTO());
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().produto = "EMP";
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().vencido = "700,00";
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().curtoPrazo = "7.000,00";
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().medioPrazo = "13.000,00";
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().longoPrazo = "20.000,00";
        this.dadosClienteDTO.getDadosClienteRespDiretaDTO().saldoDevedor = "30.700,00";

        this.dadosClienteDTO.setDadosClienteRespIndiretaDTO(new DadosClienteRespIndiretaDTO());
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().produto = "EMP";
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().vencido = "700,00";
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().curtoPrazo = "7.000,00";
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().medioPrazo = "13.000,00";
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().longoPrazo = "20.000,00";
        this.dadosClienteDTO.getDadosClienteRespIndiretaDTO().saldoDevedor = "30.700,00";
        
    }

    comporReciprocidade(): any {
        // throw new Error("Method not implemented.");
    }

    comporEnquadramento() {

        this.enquadramentoDTO = new EnquadramentoDTO;
        this.enquadramentoDTO.setEnquadramentoPropostaCreditoDTO(new EnquadramentoPropostaCreditoDTO());
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().dataProposta = new Date;
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().classificacaoOperacao = "A";
        this.enquadramentoDTO.getEnquadramentoPropostaCreditoDTO().origemRecurso = "Recursos Próprios Livres"
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

        this.enquadramentoDTO.setEnquadramentoResPlanoPagamentoDTO(new EnquadramentoResPlanoPagamentoDTO())
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().menorValorParcela = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().maiorValorParcela = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().valorJuros = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().valorIOFADC = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().valorTAC = "0,00";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().seguro = "2,88";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().cetAnual = "239,1897 %";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().cetMensal = "10,5599 %";
        this.enquadramentoDTO.getEnquadramentoResPlanoPagamentoDTO().demaisDespesas = "0,00";

    }

    comporItensList() {

        this.items = [
            {titulo: 'Enquadramento da Proposta',
             icon: 'mc-icon-calculadora',
             dto: this.enquadramentoDTO,
             expanded: false,
             tamanhoLabel: 760},
            {titulo: 'Dados do Cliente',
             icon: 'mc-icon-pessoa',
             dto: this.dadosClienteDTO,
             expanded: false,
             tamanhoLabel: 760},
            {titulo: 'Reciprocidade do Cliente',
             icon: 'mc-icon-pessoa',
             dto: this.enquadramentoDTO,
             expanded: false},
            {titulo: 'Análises Diversas',
             icon: 'mc-icon-analises',
             dto: this.enquadramentoDTO,
             expanded: false},
            {titulo: 'Grupo Econômico',
             icon: 'mc-icon-grupo',
             dto: this.enquadramentoDTO,
             expanded: false},
            {titulo: 'Análise de Garantia',
             icon: 'mc-icon-analises',
             dto: this.enquadramentoDTO,
             expanded: false},
            {titulo: 'Anotações Cadastrais',
             icon: 'mc-icon-anotacoes',
             dto: this.enquadramentoDTO,
             expanded: false},
            {titulo: 'Anotações de Crédito',
             icon: 'mc-icon-anotacoesC',
             dto: this.enquadramentoDTO,
             expanded: false}
        ];
    }

    expandItem(item){
 
        this.items.map((listItem) => {
            if(item == listItem && item.dto){
                listItem.expanded = !item.expanded;
            } 
 
            return listItem;
 
        });
 
    }

 
}