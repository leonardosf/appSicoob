var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getNomeLinhaCredito = function (idLinhaSelecionada, listaLinhasCredito) {
        var retorno;
        for (var _i = 0, listaLinhasCredito_1 = listaLinhasCredito; _i < listaLinhasCredito_1.length; _i++) {
            var linha = listaLinhasCredito_1[_i];
            if (linha.idLinhaCredito == idLinhaSelecionada) {
                retorno = linha.nomeComercialLinhaCredito;
            }
        }
        return retorno;
    };
    Util.validarCPFCNPJ = function (cpfCnpj) {
        cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');
        if ((cpfCnpj != null) && (cpfCnpj != undefined) && (cpfCnpj != "")) {
            if (cpfCnpj.length <= 11) {
                return this._testaCPF(cpfCnpj);
            }
            else {
                return this._testaCNPJ(cpfCnpj);
            }
        }
    };
    Util._testaCPF = function (cpf) {
        if (cpf.length != 11) {
            return false;
        }
        var retorno = null;
        if (cpf.search(/(1{11})|(2{11})|(3{11})|(4{11})|(5{11})|(6{11})|(7{11})|(8{11})|(9{11})|(0{11})/) == 0) {
            return false;
        }
        var Soma;
        var Resto;
        Soma = 0;
        for (var i = 1; i <= 9; i++)
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10)))
            retorno = false;
        Soma = 0;
        for (var i = 1; i <= 10; i++)
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11)))
            retorno = false;
        if (retorno == null || retorno == undefined) {
            retorno = true;
        }
        return retorno;
    };
    Util._testaCNPJ = function (cnpj) {
        if (cnpj.length != 14) {
            return false;
        }
        // Elimina CNPJs invalidos conhecidos
        if (cnpj.search(/(1{14})|(2{14})|(3{14})|(4{14})|(5{14})|(6{14})|(7{14})|(8{14})|(9{14})|(0{14})/) == 0) {
            return false;
        }
        // Valida DVs
        var tamanho = cnpj.length - 2;
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    };
    Util.SEM_PENDENCIA = 1;
    Util.AJUSTE_LSE_SIMULACAO = 2;
    Util.AJUSTE_DOCUMENTOS = 3;
    Util.AJUSTE_EM_TODOS = 4;
    Util.AJUSTE_NA_SIMULACAO = 5;
    Util.AJUSTE_NA_SIMULACAO_E_DOCUMENTOS = 6;
    Util.OPERACAO_EM_ANALISE = 2;
    Util.OPERACAO_EM_AJUSTE = 1;
    Util.OPERACAO_EM_PROPOSTA = 3;
    Util.OPERACAO_CANCELADA = 4;
    Util.OPERACAO_APROVADA = 5;
    Util.TIPO_PESSOA_FISICA = 1;
    Util.TIPO_PESSOA_JURIDICA = 2;
    /******* SITUACOES */
    Util.SITUACAO_PROPOSTA_CREDITO = 20;
    Util.SITUACAO_CONTRATO_DE_CREDITO = 21;
    Util.SITUACAO_CONTRATO_LIQUIDADO = 22;
    Util.SITUACAO_CONTRATO_BAIXADO_PARA_ACERTO = 23;
    Util.SITUACAO_CONTRATO_TRANSFERIDO = 24;
    Util.SITUACAO_PROPOSTA_CANCELADA = 25;
    Util.SITUACAO_PROPOSTA_INDEFERIDA = 26;
    Util.SITUACAO_ABERTO = 96;
    Util.SITUACAO_CREDITO_LIQUIDAR = 132;
    Util.PROPOSTA_DISPONIVEL_PARA_ASSINATURA = 9999999;
    Util.TIPO_DASHBOARD_DEMONSTRATIVO_FISICO = 1;
    Util.TIPO_DASHBOARD_DEMONSTRATIVO_FINANCEIRO = 2;
    Util.TODOS_DASHBOARDS = 3;
    Util.VERSAO_ATUAL = "1.0.0.1";
    Util.mask = {
        CPF: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        CNPJ: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    };
    return Util;
}());
export { Util };
//# sourceMappingURL=util.js.map