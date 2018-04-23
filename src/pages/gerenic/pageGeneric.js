import { TomadorLSE } from "../../model/TomadorLSE";
var PageGeneric = /** @class */ (function () {
    function PageGeneric() {
    }
    PageGeneric.prototype.getTomador = function () {
        this.tomador = new TomadorLSE();
        this.tomador.idPessoa = 1;
        this.tomador.nomePessoa = 'Carlos Costa';
        this.tomador.numCpfCnpj = '999.999.999-99';
        return this.tomador;
    };
    return PageGeneric;
}());
export { PageGeneric };
//# sourceMappingURL=pageGeneric.js.map