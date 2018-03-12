import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { TomadorLSE } from "../../model/TomadorLSE";
import { EnquadramentoDTO } from "../../model/EnquadramentoDTO";
import { FaseDocumento } from "../../model/FaseDocumento";

@Component({
    templateUrl: 'estudo.html'
})

export class EstudoPage{
 
    private tomador:TomadorLSE;
    items: any = [];
    itemExpandHeight: number = 150;
    enquadramentoDTO:EnquadramentoDTO;
    trocaPagina:boolean = true;

    constructor(public navParams: NavParams) {

        this.tomador = navParams.get('tomador');

        this.enquadramentoDTO = new EnquadramentoDTO;
        this.enquadramentoDTO.dataProposta = new Date;
        this.enquadramentoDTO.classificacaoOperacao = "A";
        this.enquadramentoDTO.origemRecurso = "Recursos Próprios Livres"
        this.enquadramentoDTO.finalidade = "Veículos Pesados Usados";
        this.enquadramentoDTO.perfilTarifaril = "Perfil Isento Pessoa Fisica";

        this.items = [
            {titulo: 'Enquadramento da Proposta',
             cabecalho: "Proposta de Crédito",
             icon: 'mc-icon-calculadora',
             dto: this.enquadramentoDTO,
             expanded: false},
            {titulo: 'Dados do Cliente',
             icon: 'mc-icon-pessoa',
             expanded: false},
            {titulo: 'Reciprocidade do Cliente',
             icon: 'mc-icon-pessoa',
             expanded: false},
            {titulo: 'Análises Diversas',
             icon: 'mc-icon-analises',
             expanded: false},
            {titulo: 'Grupo Econômico',
             icon: 'mc-icon-grupo',
             expanded: false},
            {titulo: 'Análise de Garantia',
             icon: 'mc-icon-analises',
             expanded: false},
            {titulo: 'Anotações Cadastrais',
             icon: 'mc-icon-anotacoes',
             expanded: false},
            {titulo: 'Anotações de Crédito',
             icon: 'mc-icon-anotacoesC',
             expanded: false}
        ];
    
    }

    expandItem(item){
 
        this.items.map((listItem) => {
 
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }

 
}