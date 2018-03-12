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
    enquadramentoDeGarantia: number;
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
    tomadores: Array<TomadorLSE> =  new Array<TomadorLSE>();
    numCpfCnpj: String;
    proprietarios: Array<ProprietarioDTO> = new Array<ProprietarioDTO>();
    garantia: GarantiaDTO = new GarantiaDTO();
    titulo: string;
    tituloBotao: string;
    tipoFase:string='Aplicação';
    consultaEnquadramento:boolean = true;
    consultaGrupo:boolean = true;
    consultaOrigem:boolean = true;
    consultaAba:boolean = true;
    abaAplicacao:boolean = true;
    abaPessoal:boolean = true;
    abaReal:boolean = true;
    consultaCpf:boolean = false;

    constructor(public http: Http, public navParams: NavParams,
        private nav:NavController, private mensagem: MensagemServicoProvider) {

       this.preencherDadosInicias();
       
        this.titulo = 'Incluir Garantia';
    }

    preencherDadosInicias(){
        this.tipoGarantias.push(new TipoGarantia(1 , "GARANTIA FIDEJUSSÓRIA"));
        this.tipoGarantias.push(new TipoGarantia(2 , "DIREITOS CREDITÓRIOS"));
        
        this.responsabilidadeGarantias.push(new ResponsabilidadeGarantia(1 , "PROPRIETÁRIO"));
        this.responsabilidadeGarantias.push(new ResponsabilidadeGarantia(2 , "TERCEIRO"));
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

    limparTudo(){

        this.responsabilidadeGarantias = new Array<ResponsabilidadeGarantia>();
        this.tipoGarantias = new Array<TipoGarantia>();
        this.tipoDeGarantia = null;
        this.responsabilidadeDeGarantia = null;
        this.valorGarantia = null;
        this.descricaoGarantia = null;
        this.ultimaAvaliacao = new Date;
        this.consultaCpf = false;

        this.preencherDadosInicias();
        this.limparTela();
        console.log(this.consultaGrupo);
    }

    limparTela(){

        this.consultaEnquadramento = true;
        this.consultaGrupo = true;
        this.consultaOrigem = true;
        this.consultaAba = true;
        this.abaAplicacao = true;
        this.abaPessoal= true;
        this.abaReal = true;
        this.consultaEnquadramento = true;
        this.consultaGrupo = true;
        this.consultaOrigem = true;
        this.consultaAba = true;
        this.abaAplicacao = true;
        this.abaPessoal = true;
        this.abaReal = true;
        this.grupoDeGarantia = null;
        this.enquadramentoDeGarantia = null;
        this.responsabilidadeDeGarantia = null;
        this.origemDeGarantia = null;
        this.tipoFase = null;
        this.grupoGarantias = new Array<GrupoGarantia>();
        this.enquadramentoGarantias = new Array<EnquadramentoGarantia>();
        this.origemGarantias = new Array<OrigemGarantia>();
        this.tomadores =  new Array<TomadorLSE>();
    }

    atualizacaoTipoGarantia(){

        if (this.consultaGrupo && this.tipoDeGarantia != null) {
            this.consultaGrupo = false;
        } else {
            this.limparTela();
            this.consultaGrupo = false;
        }

        switch (this.tipoDeGarantia) {

            case 1: {
                this.grupoGarantias.push(new GrupoGarantia(1, "AVALISTA - PF"));
                this.grupoGarantias.push(new GrupoGarantia(2, "AVALISTA - PJ"));
                break;
            }
            case 2: {
                this.grupoGarantias.push(new GrupoGarantia(1, "AÇÕES E APLICAÇÕES"));
                this.grupoGarantias.push(new GrupoGarantia(2, "AÇÕES E DEBÊNTURES"));
                break;
            }
            case 3: {
                break;
            }
        }

    }

    atualizacaoGrupoGarantia(){

        if (this.consultaEnquadramento  && this.grupoDeGarantia != null) {
            this.consultaEnquadramento = false;
            switch (this.tipoDeGarantia) {

                case 1: {
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(1, "AVALISTA - PF"));
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(2, "AVALISTA - PJ"));
                    break;
                }
                case 2: {
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(1, "AÇÕES E APLICAÇÕES"));
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(2, "AÇÕES E DEBÊNTURES"));
                    break;
                }
                case 3: {
                    break;
                }
            }
        }
    }

    atualizacaoEnquadramentoGarantia(){

        if (this.consultaOrigem && this.enquadramentoDeGarantia != null) {
            this.consultaOrigem = false;
            switch (this.tipoDeGarantia) {

                case 1: {
                    this.tipoFase = 'pessoal';
                    this.abaPessoal = false;
                    this.consultaOrigem = true;
                    break;
                }
                case 2: {
                    this.origemGarantias.push(new OrigemGarantia(1, "PRÓPRIO"));
                    this.origemGarantias.push(new OrigemGarantia(2, "TERCEIRO"));
                    break;
                }
                case 3: {
                    break;
                }
            }
        }
    }

    atualizacaoOrigemGarantia(){

        if (this.consultaAba && this.origemDeGarantia != null) {
            this.consultaAba = false;
            switch (this.tipoDeGarantia) {

                case 2: {
                    this.tipoFase = 'real';
                    this.abaReal = false;
                    break;
                }
                case 3: {
                    break;
                }
            }
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

        if (!(this.tipoDeGarantia == 1 && this.tomadores.length >= 1)) {

            if(!this.numCpfCnpj || this.numCpfCnpj == null || this.numCpfCnpj == ''){
                this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
                return;
            }
            if (this.tipoDeGarantia == 1) {
                this.consultaCpf = true;
            }
            this.numCpfCnpj = null;
            this.tomador = new TomadorLSE;
            this.tomador.nomePessoa = "Carlos",
            this.tomador.numCpfCnpj = "999.999.999-99";
            this.tomador.codTipoPessoa = 1;
            this.tomador.nomeApelido = "Carlos";
            this.tomador.idPessoa = 1;
            this.tomador.dataRenovacaoCadastral = new Date();
            this.tomador.dataInclusaoSistema = new Date();
            this.tomador.dataNascimentoPessoaFisica = new Date();
            this.tomadores.push(this.tomador);
            this.exibirConteudoTomador = true;
        }
        
      }
    
      enviarMesa(){
        this.nav.push(OperacaoPage, {"tomador": this.tomador});
      }

      incluirGarantia(){

          this.garantia.descricao = this.descricaoGarantia;
          this.garantia.valor = this.valorGarantia;
          this.grupoGarantias.forEach((grupoElement) => {
              if (this.grupoDeGarantia === grupoElement.codigo) {
                  this.garantia.grupoGarantia = grupoElement.nome;
              }
          });
          this.tipoGarantias.forEach((tipoElement) => {
              if (this.tipoDeGarantia === tipoElement.codigo) {
                  this.garantia.tipoGarantia = tipoElement.nome;
              }
          });

          let tomador = new TomadorLSE();
          tomador.nomePessoa = 'Carlos Costa';
          tomador.numCpfCnpj = '999.999.999-99';
          let proprietario = new ProprietarioDTO();
          proprietario.nome = tomador.nomePessoa;
          proprietario.numCpfCnpj = tomador.numCpfCnpj;
          this.responsabilidadeGarantias.forEach((responsabilidadeElement) => {
              console.log(responsabilidadeElement);
              if (this.responsabilidadeDeGarantia === responsabilidadeElement.codigo) {
                  proprietario.responsabilidade = responsabilidadeElement.nome;
              }
          });
          this.proprietarios.push(proprietario);
          this.tomador = new TomadorLSE();
          this.limparDados();
          // this.exibirConteudoTomador = false;
          // this.exibirTomador = true;   

          this.nav.push(GarantiaPage, { "garantia": this.garantia , "numGarantia": 1, "tomador": tomador });

      }

      limparDados(){
          this.numCpfCnpj = null;
          this.responsabilidadeDeGarantia = null;
      }
}