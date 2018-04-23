import { Configuracoes } from '../providers/configuracao/configuracoes';
var Paths = /** @class */ (function () {
    function Paths() {
    }
    Paths.getUrl = function () {
        return Configuracoes.getUrlMicrocredito();
    };
    Paths.getURL = function (url, paramPath) {
        for (var _i = 0, _a = paramPath.getParametros(); _i < _a.length; _i++) {
            var param = _a[_i];
            url = url.replace('{' + param.nome + '}', param.valor);
        }
        return url;
    };
    /*------Paths------*/
    Paths.VISITAS = Paths.getUrl() + "visitas";
    Paths.VISITAS_UPLOAD = Paths.getUrl() + "visitas/upload";
    Paths.VISITAS_REMOVER = Paths.getUrl() + "visitas/{idVisita}";
    Paths.VISITAS_ENVIO_IMAGENS = Paths.getUrl() + "visitas/envio-imagens";
    Paths.LINHA = Paths.getUrl() + "linhas";
    Paths.LSES = Paths.getUrl() + "lses";
    Paths.SIMULACOES = Paths.getUrl() + "simulacoes";
    Paths.OPERACOES = Paths.getUrl() + "operacoes";
    Paths.OPERACOES_REMOVER_IMAGENS = Paths.getUrl() + "operacoes/{idOperacao}/remove-imagens";
    Paths.OPERACOES_CLASSIFICACAO = Paths.getUrl() + "operacoes/{idOperacao}/classificacao";
    Paths.OPERACOES_QUESTIONARIOS = Paths.getUrl() + "operacoes/{idOperacao}/questionarios";
    Paths.OPERACOES_VISITAS = Paths.getUrl() + "operacoes/{idOperacao}/visitas";
    Paths.OPERACOES_IMAGENS = Paths.getUrl() + "operacoes/{idOperacao}/imagens";
    Paths.ESTADOS_OPERACAO = Paths.getUrl() + "estados-operacao";
    Paths.AUTORIZACOES = Paths.getUrl() + "autorizacoes";
    Paths.AGENTES = Paths.getUrl() + "agentes";
    Paths.MENSAGENS = Paths.getUrl() + "mensagens";
    Paths.MENSAGENS_TOTAL_NAO_LIDAS = Paths.getUrl() + "mensagens/nao-lidas/total";
    Paths.PROPOSTAS = Paths.getUrl() + "propostas";
    Paths.DOCUMENTACOES_UPLOAD = Paths.getUrl() + "documentacoes/upload";
    Paths.IMAGENS = Paths.getUrl() + "imagens/{idImagem}";
    Paths.DASHBOARDS = Paths.getUrl() + "dashboards";
    Paths.TOMADORES = Paths.getUrl() + "tomadores/{cpfCnpj}?consultaProposta={consultaProposta}";
    Paths.TOMADORES_NOTA_RISCO = Paths.getUrl() + "tomadores/{cpfCnpj}/nota-risco";
    Paths.TOMADORES_QUESTIONARIOS = Paths.getUrl() + "tomadores/{codTipoPessoa}/questionarios";
    Paths.PLANOS_PAGAMENTO = Paths.getUrl() + "planos-pagamento?idLinhaCredito={idLinhaCredito}&dataCadastroLinhaCredito={dataCadastroLinhaCredito}" +
        "&valorOperacao={valorOperacao}&diaVencimento={diaVencimento}&capacidadePagamento={capacidadePagamento}&numCpfCnpj={numCpfCnpj}&idPessoa={idPessoa}";
    Paths.VERSAO = "1.0.0";
    Paths.RELATORIOS_CONSULTA = Paths.getUrl() + "relatorios";
    Paths.RELATORIOS_DETALHE = Paths.getUrl() + "relatorios/{idOperacaoCredito}/detalhe-operacao";
    return Paths;
}());
export { Paths };
var ParamPath = /** @class */ (function () {
    function ParamPath() {
        this.parametros = new Array();
    }
    ParamPath.prototype.adicionar = function (nome, valor) {
        var param = new Param();
        param.nome = nome;
        param.valor = valor;
        this.parametros.push(param);
    };
    ParamPath.parametro = function (nome, valor) {
        var paramPath = new ParamPath();
        paramPath.adicionar(nome, valor);
        return paramPath;
    };
    ParamPath.prototype.getParametros = function () {
        return this.parametros;
    };
    return ParamPath;
}());
export { ParamPath };
var Param = /** @class */ (function () {
    function Param() {
    }
    return Param;
}());
//# sourceMappingURL=paths.js.map