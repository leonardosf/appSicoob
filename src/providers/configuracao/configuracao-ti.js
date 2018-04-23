var ConfiguracaoTI = /** @class */ (function () {
    function ConfiguracaoTI() {
        this.accessToken = null;
    }
    ConfiguracaoTI.prototype.getUrlLogin = function () {
        return 'http://apit.homologacao.com.br:8280/token';
    };
    ConfiguracaoTI.prototype.getAuthorizationToken = function () {
        return 'Basic V01nN3RTNDVpNWhZWlNNZGhPdlFPcEdaTWc4YTprWWZ4cDN6R25OQmIwdnliWkhCT2lGSUptbE1h';
    };
    ConfiguracaoTI.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    ConfiguracaoTI.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    ConfiguracaoTI.prototype.getUrlMicrocredito = function () {
        return "http://apit.homologacao.com.br:8280/microcredito/1.0.0/";
    };
    return ConfiguracaoTI;
}());
export { ConfiguracaoTI };
//# sourceMappingURL=configuracao-ti.js.map