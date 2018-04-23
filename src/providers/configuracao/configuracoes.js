import { ConfiguracaoDesenv } from './configuracao-desenv';
import { ConfiguracaoTI } from './configuracao-ti';
import { ConfiguracaoHomol } from './configuracao-homol';
import { ConfiguracaoProd } from './configuracao-prod';
var Ambiente;
(function (Ambiente) {
    Ambiente[Ambiente["DESENV"] = 0] = "DESENV";
    Ambiente[Ambiente["TI"] = 1] = "TI";
    Ambiente[Ambiente["HOMOL"] = 2] = "HOMOL";
    Ambiente[Ambiente["PROD"] = 3] = "PROD";
})(Ambiente || (Ambiente = {}));
var Configuracoes = /** @class */ (function () {
    function Configuracoes() {
    }
    Configuracoes.getConfiguracao = function () {
        if (Configuracoes.configuracao == null) {
            Configuracoes.configuracao = Configuracoes.obterConfiguracao();
        }
        return Configuracoes.configuracao;
    };
    Configuracoes.obterConfiguracao = function () {
        switch (Configuracoes.AMBIENTE) {
            case Ambiente.DESENV: return new ConfiguracaoDesenv();
            case Ambiente.TI: return new ConfiguracaoTI();
            case Ambiente.HOMOL: return new ConfiguracaoHomol();
            default:
                Configuracoes.AMBIENTE = Ambiente.PROD;
                return new ConfiguracaoProd();
        }
    };
    Configuracoes.getUrlLogin = function () {
        return Configuracoes.getConfiguracao().getUrlLogin();
    };
    Configuracoes.getAuthorizationToken = function () {
        return Configuracoes.getConfiguracao().getAuthorizationToken();
    };
    Configuracoes.setAccessToken = function (accessToken) {
        Configuracoes.getConfiguracao().setAccessToken(accessToken);
    };
    Configuracoes.getAccessToken = function () {
        return Configuracoes.getConfiguracao().getAccessToken();
    };
    Configuracoes.getUrlMicrocredito = function () {
        return Configuracoes.getConfiguracao().getUrlMicrocredito();
    };
    Configuracoes.isProducao = function () {
        return Configuracoes.AMBIENTE == Ambiente.PROD;
    };
    //private static readonly AMBIENTE:Ambiente = Ambiente[''+process.env.NODE_ENV]
    Configuracoes.AMBIENTE = Ambiente.DESENV;
    Configuracoes.configuracao = null;
    return Configuracoes;
}());
export { Configuracoes };
//# sourceMappingURL=configuracoes.js.map