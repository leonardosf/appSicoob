var CnpjFormatador = /** @class */ (function () {
    function CnpjFormatador() {
    }
    CnpjFormatador.formatar = function (valor) {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };
    CnpjFormatador.formatarIncompleto = function (valor) {
        if (valor.length > 2 && valor.length <= 5) {
            return valor.replace(/(\d{2})(\d{1,3})$/, "$1.$2");
        }
        if (valor.length > 5 && valor.length <= 8) {
            return valor.replace(/(\d{2})(\d{3})(\d{1,3})$/, "$1.$2.$3");
        }
        if (valor.length > 8 && valor.length <= 12) {
            return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})$/, "$1.$2.$3/$4");
        }
        if (valor.length == 13) {
            return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, "$1.$2.$3/$4-$5");
        }
        return CnpjFormatador.formatar(valor);
    };
    return CnpjFormatador;
}());
export { CnpjFormatador };
//# sourceMappingURL=cnpj.formatador.js.map