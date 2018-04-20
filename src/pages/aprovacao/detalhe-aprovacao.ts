import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { TomadorLSE } from "../../model/TomadorLSE";
import { EstudoPage } from "../estudo/estudo";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { ParecerEstudoDTO } from "../../model/ParecerEstudoDTO";
import { ParecerAnaliseTecnicaDTO } from "../../model/ParecerAnaliseTecnicaDTO";

@Component({
    templateUrl: 'detalhe-aprovacao.html'
})

export class DetalheAprovacaoPage {

    private tomador:TomadorLSE;
    private itensParecer: any = [];
    public abaAprovacao:string='resumoProposta';
    private acaoParecer = [];
    private botaoConfirmar: Boolean = true;
    private campoAcaoParecer: Boolean = false;
    private parecerEstudoDTO:ParecerEstudoDTO;
    private parecerAnaliseTecnicaDTO:ParecerAnaliseTecnicaDTO;
    private parecerNegocial:String;

    constructor(private navParams: NavParams, private nav:NavController, private mensagem:MensagemServicoProvider) {

        this.tomador = navParams.get('tomador');
        this.comporDTOParecer();
        this.comporItens();
        this.comporAcaoParecer();

    }

    public comporDTOParecer() {

        this.parecerEstudoDTO = new ParecerEstudoDTO();
        this.parecerEstudoDTO.dataInicio = new Date("04/10/2018");
        this.parecerEstudoDTO.dataTermino = new Date;
        this.parecerEstudoDTO.usuario = 'usuarioTeste';
        this.parecerEstudoDTO.estado = 'Encaminhada para análise técnica';
        this.parecerEstudoDTO.parecerNegocial = 'teste parecer teste parecer';
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

    public comporItens() {

        this.itensParecer.push({titulo: 'Estudo',
                                icon: 'mc-icon-pessoa',
                                dto: this.parecerEstudoDTO,
                                expanded: false
                                });
        // this.itensParecer = [
        //     {
        //         titulo: 'Estudo',
        //         icon: 'mc-icon-pessoa',
        //         dto: this.parecerEstudoDTO,
        //         expanded: false
        //     },
        //     {
        //         titulo: 'Análise Tecnica',
        //         icon: 'mc-icon-anotacoes',
        //         dto: '',
        //         expanded: false
        //     }
        // ]
    }

    public expandItem(item) {
 
        this.itensParecer.map((listItem) => {
            if(item == listItem && item.dto){
                listItem.expanded = !item.expanded;
            } 
 
            return listItem;
 
        });
 
    }

    public atualizaAcaoParecer() {
        this.botaoConfirmar = false;
    }

    public confirmar() {
        let novoParecer;

        this.parecerAnaliseTecnicaDTO = new ParecerAnaliseTecnicaDTO();
        this.parecerAnaliseTecnicaDTO.dataInicio = new Date;
        this.parecerAnaliseTecnicaDTO.dataTermino = new Date;
        this.parecerAnaliseTecnicaDTO.usuario = 'usuarioTeste';
        this.parecerAnaliseTecnicaDTO.estado = 'Devolvida para estudo';
        this.parecerAnaliseTecnicaDTO.parecerNegocial = this.parecerNegocial;

        novoParecer = {titulo: 'Análise técnica',
                        icon: 'mc-icon-anotacoes',
                        dto: this.parecerAnaliseTecnicaDTO,
                        expanded: false
                      }

        this.itensParecer.push(novoParecer);
        this.parecerNegocial = "";
        this.botaoConfirmar = true;
        this.campoAcaoParecer = true;

    }

    public abrirEstudoProposta() {
        this.nav.push(EstudoPage, {"tomador": this.mensagem.getTomador});
    }

    public imprimir() {

    }
}
