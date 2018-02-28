import { Http } from "@angular/http";
import { NavParams, NavController } from "ionic-angular";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Component } from "@angular/core";
import { TomadorLSE } from "../../model/TomadorLSE";
import { GarantiaIncluirPage } from "./garantia-incluir";
import { GarantiaDTO } from "../../model/GarantiaDTO";
import { PropostaPage } from "../microcredito/proposta";
import { OperacaoPage } from "../../app/paginas";

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
        this.garantia = navParams.get('garantia');
        this.pessoalAlcancado = navParams.get('numGarantia');

        if(this.garantia){
            this.garantias.push(this.garantia);
        }

        if(!this.pessoalAlcancado){
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
        this.nav.push(GarantiaIncluirPage);
    }

    cancelar() {
        this.nav.push(OperacaoPage, {"tomador": this.tomador});
    }
    botaoHabilitado(){
        if(this.tituloBotao == 'Cancelar'){
            this.enviarMesa();
        }else{

            this.tituloBotao = 'Cancelar';
            this.botaoEncaminhar = false;
        }
    }

    enviarMesa(){
        this.nav.push(OperacaoPage, {"tomador": this.tomador});
    }
}