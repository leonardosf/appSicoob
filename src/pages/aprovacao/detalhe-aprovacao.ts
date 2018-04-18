import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { TomadorLSE } from "../../model/TomadorLSE";
import { EnquadramentoDTO } from "../../model/EnquadramentoDTO";
import { EnquadramentoPropostaCreditoDTO } from "../../model/EnquadramentoPropostaCreditoDTO";
import { EnquadramentoParcelamentoDTO } from "../../model/EnquadramentoParcelamentoDTO";
import { EnquadramentoTaxasDTO } from "../../model/EnquadramentoTaxasDTO";
import { EnquadramentoSeguroDTO } from "../../model/EnquadramentoSeguroDTO";
import { EnquadramentoResPlanoPagamentoDTO } from "../../model/EnquadramentoResPlanoPagamentoDTO";
import { DadosClienteDTO } from "../../model/DadosClienteDTO";
import { ReciprocidadeClienteDTO } from "../../model/ReciprocidadeClienteDTO";
import { AnalisesDiversasDTO } from "../../model/AnalisesDiversasDTO";
import { AnotacoesCadastraisDTO } from "../../model/AnotacoesCadastraisDTO";

@Component({
    templateUrl: 'detalhe-aprovacao.html'
})

export class DetalheAprovacaoPage {

    private tomador:TomadorLSE;
    private itensParecer: any = [];
    private itensEstudo: any = [];
    public abaAprovacao:string='parecer';
    public enquadramentoDTO:EnquadramentoDTO;
    private dadosClienteDTO:DadosClienteDTO;
    private reciprocidadeClienteDTO:ReciprocidadeClienteDTO;
    private analisesDiversasDTO:AnalisesDiversasDTO;
    private anotacoesCadastraisDTO:AnotacoesCadastraisDTO;
    private acaoParecer = [];

    constructor(private navParams: NavParams) {

        this.tomador = navParams.get('tomador');
        this.comporEnquadramento();
        this.comporItens();
        this.comporAcaoParecer();

    }

    public comporAcaoParecer() {
        this.acaoParecer = [
            {
                descricao: 'Submeter'
            },
            {
                descricao: 'Devolver'
            },
            {
                descricao: 'Aprovar'
            },
            {
                descricao: 'Reprovar'
            }
        ]
    }

    public comporEnquadramento() {

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

    public comporItens() {

        this.itensParecer = [
            {
                titulo: 'Estudo',
                icon: 'mc-icon-pessoa',
                dto: '',
                expanded: false
            },
            {
                titulo: 'Análise Tecnica',
                icon: 'mc-icon-anotacoes',
                dto: '',
                expanded: false
            }
        ]

        this.itensEstudo = [
            {
                titulo: 'Enquadramento da Proposta',
                icon: 'mc-icon-calculadora',
                dto: this.enquadramentoDTO,
                expanded: false
            },
            {
                titulo: 'Dados do Cliente',
                icon: 'mc-icon-pessoa',
                dto: this.dadosClienteDTO,
                expanded: false
            },
            {
                titulo: 'Reciprocidade do Cliente',
                icon: 'mc-icon-pessoa',
                dto: this.reciprocidadeClienteDTO,
                expanded: false
            },
            {
                titulo: 'Análises Diversas',
                icon: 'mc-icon-analises',
                dto: this.analisesDiversasDTO,
                expanded: false
            },
            {
                titulo: 'Grupo Econômico',
                icon: 'mc-icon-grupo',
                dto: this.enquadramentoDTO,
                expanded: false
            },
            {
                titulo: 'Análise de Garantia',
                icon: 'mc-icon-analises',
                dto: this.enquadramentoDTO,
                expanded: false
            },
            {
                titulo: 'Anotações Cadastrais',
                icon: 'mc-icon-anotacoes',
                dto: this.anotacoesCadastraisDTO,
                expanded: false
            },
            {
                titulo: 'Anotações de Crédito',
                icon: 'mc-icon-anotacoesC',
                dto: this.enquadramentoDTO,
                expanded: false
            }
        ]
    }

    expandItem(item){
 
        this.itensEstudo.map((listItem) => {
            if(item == listItem && item.dto){
                listItem.expanded = !item.expanded;
            } 
 
            return listItem;
 
        });
 
    }

    atualizaAcaoParecer() {
    }
}
