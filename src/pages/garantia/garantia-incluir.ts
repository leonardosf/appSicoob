import { Http } from "@angular/http";
import { NavParams, NavController } from "ionic-angular";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Component } from "@angular/core";
import { TipoGarantia } from '../../model/TipoGarantia';
import { GrupoGarantia } from "../../model/GrupoGarantia";
import { OrigemGarantia } from "../../model/OrigemGarantia";
import { EnquadramentoGarantia } from "../../model/EnquadramentoGarantia";
import { TomadorLSE } from "../../model/TomadorLSE";
import { ResponsabilidadeGarantia } from "../../model/ResponsabilidadeGarantia";
import { ProprietarioDTO } from "../../model/ProprietarioDTO";
import { GarantiaPage } from "./garantia";
import { GarantiaDTO } from "../../model/GarantiaDTO";
import { OperacaoPage } from "../operacao/operacao";


@Component({
    templateUrl: 'garantia-incluir.html'
})
export class GarantiaIncluirPage{

    tipoGarantias:  Array<TipoGarantia> = new Array<TipoGarantia>();
    tipoDeGarantia: number;
    grupoGarantias:  Array<GrupoGarantia> = new Array<GrupoGarantia>();
    grupoDeGarantia: number;
    enquandramentoDeGarantia: number;
    enquadramentoGarantias: Array<EnquadramentoGarantia> = new Array<EnquadramentoGarantia>();
    responsabilidadeDeGarantia: number;
    responsabilidadeGarantias: Array<ResponsabilidadeGarantia> = new Array<ResponsabilidadeGarantia>();
    origemDeGarantia: number;
    origemGarantias:  Array<OrigemGarantia> = new Array<OrigemGarantia>();
    exibirGridCombos: boolean = true;
    exibirGridProprietario: boolean = false;
    exibirConteudoTomador: boolean = false;
    exibirTomador : boolean = false;
    valorGarantia: number;
    descricaoGarantia: string;
    ultimaAvaliacao: Date = new Date;
    tomador: TomadorLSE;
    numCpfCnpj: String;
    proprietarios: Array<ProprietarioDTO> = new Array<ProprietarioDTO>();
    garantia: GarantiaDTO = new GarantiaDTO();
    titulo: string;
    tituloBotao: string;

    constructor(public http: Http, public navParams: NavParams,
        private nav:NavController, private mensagem: MensagemServicoProvider) {

       
        this.tipoGarantias.push(new TipoGarantia(1 , "PENHOR"));
        this.tipoGarantias.push(new TipoGarantia(2 , "AUTOMOVEL"));
        this.grupoGarantias.push(new GrupoGarantia(1 , "GRUPO 1"));
        this.grupoGarantias.push(new GrupoGarantia(2 , "GRUPO 2"));
        this.enquadramentoGarantias.push(new EnquadramentoGarantia(1 , "TÍTULOS DE CRÉDITO"));
        this.enquadramentoGarantias.push(new EnquadramentoGarantia(2 , "TÍTULOS DE DÉBITO"));
        this.origemGarantias.push(new GrupoGarantia(1 , "PRÓPRIO"));
        this.origemGarantias.push(new GrupoGarantia(2 , "TERCEIRO"));
        this.responsabilidadeGarantias.push(new ResponsabilidadeGarantia(1 , "PROPRIETÁRIO"));
        this.responsabilidadeGarantias.push(new ResponsabilidadeGarantia(2 , "TERCEIRO"));
        this.titulo = 'Incluir Garantia';
    }

    voltar() {
        if(this.exibirGridCombos){
            this.nav.pop();
        }else{
            this.titulo = 'Incluir Garantia';
            this.exibirGridCombos = true;
            this.exibirGridProprietario = false;
            this.exibirTomador = false;
            this.proprietarios = new Array<ProprietarioDTO>();
        }
    }

    botaoHabilitado(){

    }

    incluirProprietario(){
        this.titulo = 'Incluir Proprietário';
        this.exibirGridCombos = false;
        this.exibirGridProprietario = true;
    }
    
    consultaPessoaCapes(){
        if(!this.numCpfCnpj || this.numCpfCnpj == null || this.numCpfCnpj == ''){
          this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
          return;
        }
        this.tomador = new TomadorLSE;
        this.tomador.nomePessoa = "Carlos",
        this.tomador.numCpfCnpj = "999.999.999-99";
        this.tomador.codTipoPessoa = 1;
        this.tomador.nomeApelido = "Carlos";
        this.tomador.idPessoa = 1;
        this.tomador.dataRenovacaoCadastral = new Date();
        this.tomador.dataInclusaoSistema = new Date();
        this.tomador.dataNascimentoPessoaFisica = new Date();
        this.exibirConteudoTomador = true;
        
      }
    
      enviarMesa(){
        this.nav.push(OperacaoPage, {"tomador": this.tomador});
      }

      incluirDadosProprietario(){
          let proprietario = new ProprietarioDTO();
          proprietario.nome = this.tomador.nomePessoa;
          proprietario.numCpfCnpj = this.tomador.numCpfCnpj;
          this.responsabilidadeGarantias.forEach((responsabilidadeElement)=>{
               console.log(responsabilidadeElement);
                if (this.responsabilidadeDeGarantia === responsabilidadeElement.codigo) {      
                    proprietario.responsabilidade = responsabilidadeElement.nome;
                }                        
           });
        this.proprietarios.push(proprietario);
        this.tomador = new TomadorLSE();
        this.limparDados();
        this.exibirConteudoTomador = false;
        this.exibirTomador = true;

      }

      limparDados(){
          this.numCpfCnpj = null;
          this.responsabilidadeDeGarantia = null;
      }

      incluirGarantia(){
          this.garantia.descricao = this.descricaoGarantia;
          this.garantia.valor = this.valorGarantia;
          this.grupoGarantias.forEach((grupoElement)=>{
            console.log(grupoElement);
             if (this.grupoDeGarantia === grupoElement.codigo) {      
                this.garantia.grupoGarantia = grupoElement.nome;
             }                        
          });
          this.tipoGarantias.forEach((tipoElement)=>{
            console.log(tipoElement);
             if (this.tipoDeGarantia === tipoElement.codigo) {      
                this.garantia.tipoGarantia = tipoElement.nome;
             }                        
          });

          let tomador = new TomadorLSE();
          tomador.nomePessoa = 'Carlos Costa';
          tomador.numCpfCnpj = '999.999.999-99';  

          this.nav.push(GarantiaPage, { "garantia": this.garantia , "numGarantia": 1, "tomador": tomador });
      }
}