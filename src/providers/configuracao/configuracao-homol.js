var ConfiguracaoHomol = /** @class */ (function () {
    function ConfiguracaoHomol() {
        this.accessToken = null;
    }
    ConfiguracaoHomol.prototype.getUrlLogin = function () {
        return 'http://apimanager-homol.homologacao.com.br:8280/token';
    };
    ConfiguracaoHomol.prototype.getAuthorizationToken = function () {
        return 'Basic Q1JsM0NVMkxmZngzZV9BVFpBZmhPdnFOSWFRYTpIQzcwNlB1bkNzbXJoUjB5ZlkwZndmc1I3ZVlh';
    };
    ConfiguracaoHomol.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    ConfiguracaoHomol.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    ConfiguracaoHomol.prototype.getUrlMicrocredito = function () {
        return "http://apimanager-homol.homologacao.com.br:8280/microcredito/1.0.0/";
    };
    return ConfiguracaoHomol;
}());
export { ConfiguracaoHomol };
//# sourceMappingURL=configuracao-homol.js.map