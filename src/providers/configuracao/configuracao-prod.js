var ConfiguracaoProd = /** @class */ (function () {
    function ConfiguracaoProd() {
        this.accessToken = null;
    }
    ConfiguracaoProd.prototype.getUrlLogin = function () {
        return 'https://api.sicoob.com.br/token';
    };
    ConfiguracaoProd.prototype.getAuthorizationToken = function () {
        return 'Basic YnVlaTVaTVRsMHlvY2hpX3hndGM3UDlIOUlrYTpFODdnVXQ1MWtwWnowZk10Tkdka1I0N19teGNh';
    };
    ConfiguracaoProd.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    ConfiguracaoProd.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    ConfiguracaoProd.prototype.getUrlMicrocredito = function () {
        return "https://api.sicoob.com.br/microcredito/";
    };
    return ConfiguracaoProd;
}());
export { ConfiguracaoProd };
//# sourceMappingURL=configuracao-prod.js.map