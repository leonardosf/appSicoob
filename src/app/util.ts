import { LinhaCredito } from '../model/LinhaCredito';
export class Util{

    public static SEM_PENDENCIA:number = 1;
    public static AJUSTE_LSE_SIMULACAO:number = 2;
    public static AJUSTE_DOCUMENTOS:number = 3;
    public static AJUSTE_EM_TODOS:number = 4;
    public static AJUSTE_NA_SIMULACAO:number = 5;
    public static AJUSTE_NA_SIMULACAO_E_DOCUMENTOS:number = 6;
    
    public static OPERACAO_EM_ANALISE:number = 2;
    public static OPERACAO_EM_AJUSTE:number = 1;
    public static OPERACAO_EM_PROPOSTA:number = 3;
    public static OPERACAO_CANCELADA:number = 4;
    public static OPERACAO_APROVADA:number = 5;
    
    public static TIPO_PESSOA_FISICA:number = 1;
    public static TIPO_PESSOA_JURIDICA:number = 2;
    
    /******* SITUACOES */
    public static SITUACAO_PROPOSTA_CREDITO:number = 20;
    public static SITUACAO_CONTRATO_DE_CREDITO:number = 21;
    public static SITUACAO_CONTRATO_LIQUIDADO:number = 22;
    public static SITUACAO_CONTRATO_BAIXADO_PARA_ACERTO:number = 23;
    public static SITUACAO_CONTRATO_TRANSFERIDO:number = 24;
    public static SITUACAO_PROPOSTA_CANCELADA:number = 25 ;
    public static SITUACAO_PROPOSTA_INDEFERIDA:number = 26
    public static SITUACAO_ABERTO:number = 96;
    public static SITUACAO_CREDITO_LIQUIDAR:number = 132;

    public static PROPOSTA_DISPONIVEL_PARA_ASSINATURA:number = 9999999;
    public static TIPO_DASHBOARD_DEMONSTRATIVO_FISICO:number  = 1;
    public static TIPO_DASHBOARD_DEMONSTRATIVO_FINANCEIRO:number = 2;
    public static TODOS_DASHBOARDS:number = 3;

    
    public static VERSAO_ATUAL = "1.0.0.29";

    static mask:any={
        CPF: [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/, /\d/],
        CNPJ: [ /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/]
    };



    public static getNomeLinhaCredito(idLinhaSelecionada:number, listaLinhasCredito:Array<LinhaCredito>):string{
        let retorno:string;

        for(let linha of listaLinhasCredito){
            if(linha.idLinhaCredito == idLinhaSelecionada){
                retorno = linha.nomeComercialLinhaCredito;
            }
        }

        return retorno;
    }

    public static validarCPFCNPJ(cpfCnpj){
        cpfCnpj = cpfCnpj.replace(/[^\d]+/g,'');

        if((cpfCnpj != null) && (cpfCnpj != undefined) && (cpfCnpj != "")){
            if(cpfCnpj.length <= 11){
                return this._testaCPF(cpfCnpj);
            }else{
                return this._testaCNPJ(cpfCnpj);
            }
        }
    }

     private static _testaCPF(cpf:String){
        if (cpf.length != 11){
            return  false;
        }

        let retorno:boolean = null;
      
        if (cpf.search(/(1{11})|(2{11})|(3{11})|(4{11})|(5{11})|(6{11})|(7{11})|(8{11})|(9{11})|(0{11})/) == 0){
            return false;
        }

        let Soma;
        let Resto;
        Soma = 0;

        for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10)) ) retorno = false;
        
        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11) ) ) retorno =  false;
        if(retorno == null || retorno == undefined){
            retorno =  true;
        }

        return retorno;
    }

    private static _testaCNPJ(cnpj:String){
        if (cnpj.length != 14){
            return  false;
        }
        
        // Elimina CNPJs invalidos conhecidos
        if (cnpj.search(/(1{14})|(2{14})|(3{14})|(4{14})|(5{14})|(6{14})|(7{14})|(8{14})|(9{14})|(0{14})/) == 0){
            return false;
        }
    
    // Valida DVs
        let tamanho:any = cnpj.length - 2
        let numeros:any = cnpj.substring(0,tamanho);
        let digitos:any = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)){
            return false;
        }
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;

        if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)){
            
            return false;
        }
            
        return true;

    }
}