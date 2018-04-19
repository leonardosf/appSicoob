import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { TomadorLSE } from "../../model/TomadorLSE";
import { EstudoPage } from "../estudo/estudo";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { ParecerEstudoDTO } from "../../model/ParecerEstudoDTO";

@Component({
    templateUrl: 'detalhe-aprovacao.html'
})

export class DetalheAprovacaoPage {

    private tomador:TomadorLSE;
    private itensParecer: any = [];
    public abaAprovacao:string='resumoProposta';
    private acaoParecer = [];
    private botaoConfirmar: Boolean = true;
    private parecerEstudoDTO:ParecerEstudoDTO;
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

        this.parecerEstudoDTO = new ParecerEstudoDTO();
        this.parecerEstudoDTO.dataInicio = new Date;
        this.parecerEstudoDTO.dataTermino = new Date;
        this.parecerEstudoDTO.usuario = 'usuarioTeste';
        this.parecerEstudoDTO.estado = 'Encaminhada para análise técnica';
        this.parecerEstudoDTO.parecerNegocial = this.parecerNegocial;

        novoParecer = {titulo: 'Estudo',
                        icon: 'mc-icon-pessoa',
                        dto: this.parecerEstudoDTO,
                        expanded: false
                      }

        this.itensParecer.push(novoParecer);
        this.parecerNegocial = "";

    }

    public abrirEstudoProposta() {
        this.nav.push(EstudoPage, {"tomador": this.mensagem.getTomador});
    }

    public imprimir() {

    }
}
