import { Http } from "@angular/http";
import { NavParams, NavController } from "ionic-angular";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Component } from "@angular/core";
import { TomadorLSE } from "../../model/TomadorLSE";
import { GarantiaIncluirPage } from "./garantia-incluir";
import { GarantiaDTO } from "../../model/GarantiaDTO";
import { PropostaPage } from "../microcredito/proposta";
import { OperacaoPage } from "../../app/paginas";
import { EstudoPage } from "../estudo/estudo";

@Component({
    templateUrl: 'garantia.html'
})

export class GarantiaPage{
 
    nomePessoa: String;
    numCpfCnpj: String;
    tomador: TomadorLSE;
    realExigido: Number;
    percRealExigido: Number;
    realAlcancado: Number;
    percRealAlcancado: Number;
    pessoalExigido: Number;
    pessoalAlcancado: Number;
    garantia: GarantiaDTO = new GarantiaDTO();
    garantias: Array<GarantiaDTO> = new Array<GarantiaDTO>();
    trocaPagina:boolean = true;
    isMesa: boolean;
    botaoEncaminhar: boolean;
    tituloBotao: string;

    constructor(public http: Http, public navParams: NavParams,
         private nav:NavController, private mensagem: MensagemServicoProvider) {

        
        this.tomador = navParams.get('tomador');
        this.nomePessoa = this.tomador.nomePessoa;
        this.numCpfCnpj = this.tomador.numCpfCnpj;
        this.realExigido = 1000;
        this.percRealExigido = 100;
        this.realAlcancado = 1000;
        this.percRealAlcancado = 100;
        this.pessoalExigido = 1;
        this.garantias = navParams.get('garantias');
        console.log(this.garantias);
        if(this.garantias){
            this.pessoalAlcancado = this.garantias.length;
        }else{
            this.garantias = new Array<GarantiaDTO>();
            this.pessoalAlcancado = 0;
        }

        this.isMesa = navParams.get('isMesa');
        this.definirBotao();
    }


    definirBotao() {


        if(this.isMesa){
            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }else{
            this.tituloBotao = 'Gravar';
            this.botaoEncaminhar = true;
        }
    }

    voltar() {

        this.nav.pop();

        // let tikGarantia:Boolean = true;
        // let tikProposta:Boolean = true;
        // let tikDocumentacao:Boolean = true;

        // this.nav.push(OperacaoPage, {"tomador":this.tomador, tikGarantia, tikProposta, tikDocumentacao});
    }

    incluirGarantia(){
        // this.nav.push(GarantiaIncluirPage,  {"isMesa": true });
        this.nav.push(GarantiaIncluirPage, {"garantias": this.garantias});
    }

    cancelar() {
        this.nav.push(OperacaoPage, {"tomador": this.tomador});
    }
    botaoHabilitado(){
        if(this.tituloBotao == 'Cancelar'){
            this.enviarParaMesa();
        }else{

            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
    }

    enviarParaEstudo(){
        this.mensagem.setFaseAtualProposta("Estudo");
        this.nav.push(EstudoPage, {"tomador": this.tomador});
    }

    enviarParaMesa(){
        this.nav.push(OperacaoPage, {"tomador": this.tomador});
    }
}