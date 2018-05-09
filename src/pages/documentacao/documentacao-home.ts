import { Http } from "@angular/http";
import { NavParams, NavController } from "ionic-angular";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Component } from "@angular/core";
import { TomadorLSE } from "../../model/TomadorLSE";
import { DocumentacaoPage } from "./documentacao";
import { Documento } from "../../model/Documento";
import { FaseDocumento } from "../../model/FaseDocumento";
import { GarantiaPage } from "../../app/paginas";
import { OperacaoPage } from "../operacao/operacao";


@Component({
    templateUrl: 'documentacao-home.html'
})

export class DocumentacaoHomePage {
    
    nomePessoa: String;
    numCpfCnpj: String;
    tomador: TomadorLSE;
    faseDocumento: Array<FaseDocumento> = new Array<FaseDocumento>();;
    documentos: Array<Documento> = new Array<Documento>();
    tituloBotao: string;
    botaoEncaminhar: boolean;
    botaoGravarCancelar:boolean;
    isMesa: boolean;
    isAprovacao: boolean;
    trocaPagina:boolean = true;

    constructor(public http: Http, public navParams: NavParams,
        private nav:NavController, private mensagem: MensagemServicoProvider) {
        
        
    
        this.tomador = mensagem.getTomador();
        console.log(this.tomador);
        this.nomePessoa = this.tomador.nomePessoa;
        this.numCpfCnpj = this.tomador.numCpfCnpj;
        this.documentos.push(new Documento(1,'CPF','Cadastro de Pessoa Física do tomador','cpf.png'));
        this.documentos.push(new Documento(2,'RG','Documento de identidade do tomador','rg.png'));
        this.faseDocumento.push(new FaseDocumento('Documentação',this.documentos)); 
        this.documentos = new Array<Documento>();
        this.documentos.push(new Documento(3,'Título de Eleitor','Título de Eleitor do tomador',null));
        this.faseDocumento.push(new FaseDocumento('Garantia Real',this.documentos)); 
        this.isMesa = navParams.get('isMesa');
        this.isAprovacao = navParams.get('isAprovacao');
        this.definirBotao();
    }


    definirBotao() {


        if(this.isMesa){
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        } else if(this.isAprovacao) {
            this.tituloBotao = 'Cancelar';
            this.botaoGravarCancelar = true;
            this.botaoEncaminhar = true;
        }else{
            this.tituloBotao = 'Gravar';
            this.botaoEncaminhar = true;
            this.botaoGravarCancelar = true;
        }
    }

    abreTelaDocumentacao(tituloFase: string){
        this.nav.push(DocumentacaoPage , {tomador: this.tomador, tituloDocumento: tituloFase});
    }

    enviarParaGarantia() {
        this.mensagem.setFaseAtualProposta("Garantia");
		this.nav.push(GarantiaPage, {tomador: this.tomador,"isMesa": false});
    }
    
    gravarDocumento(){
        if(this.tituloBotao == 'Cancelar'){
            this.nav.push(OperacaoPage, {"tomador": this.tomador});
        }else{

            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
    }
}
