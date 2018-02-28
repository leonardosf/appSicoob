import { Telefone } from "./Telefone";
import { Endereco } from "./Endereco";
import { Email } from "./Email";
import { PropostaLSE } from "./PropostaLSE";

export class TomadorLSE{
    idPessoa: Number;
    idInstituicao: Number;
    nomePessoa:string;
    numCpfCnpj: string;
    codTipoPessoa: Number;
    nomeApelido: string;
    icon: String;
    showDetails: Boolean;
    show: Boolean;
    codigoAtividadeEconomica: Number;
    autorizaConsultaBacen: Boolean;
    dataInclusaoSistema: Date;
    primeiroVencimento: Date;
    dataRenovacaoCadastral: Date;
    telefones: Array<Telefone>;
    endereco: Array<Endereco>;
    emailPessoaVO: Email;
    proposta:PropostaLSE;
    dataNascimentoPessoaFisica:Date;
    bolAssociado:boolean;
    hasDocument:boolean;

}
