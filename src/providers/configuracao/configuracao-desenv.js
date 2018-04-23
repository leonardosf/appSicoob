var ConfiguracaoDesenv = /** @class */ (function () {
    function ConfiguracaoDesenv() {
        this.accessToken = null;
    }
    ConfiguracaoDesenv.prototype.getUrlLogin = function () {
        return 'http://apit.homologacao.com.br:8280/token';
    };
    ConfiguracaoDesenv.prototype.getAuthorizationToken = function () {
        return 'Basic V01nN3RTNDVpNWhZWlNNZGhPdlFPcEdaTWc4YTprWWZ4cDN6R25OQmIwdnliWkhCT2lGSUptbE1h';
    };
    ConfiguracaoDesenv.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    ConfiguracaoDesenv.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    ConfiguracaoDesenv.prototype.getUrlMicrocredito = function () {
        return "http://10.238.37.149:8080/microcredito/api/";
    };
    return ConfiguracaoDesenv;
}());
export { ConfiguracaoDesenv };
//# sourceMappingURL=configuracao-desenv.js.map