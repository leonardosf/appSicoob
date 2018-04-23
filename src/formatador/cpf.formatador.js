var CpfFormatador = /** @class */ (function () {
    function CpfFormatador() {
    }
    CpfFormatador.formatar = function (valor) {
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    };
    CpfFormatador.formatarIncompleto = function (valor) {
        if (valor.length > 3 && valor.length <= 6) {
            return valor.replace(/(\d{3})(\d{1,3})$/, "$1.$2");
        }
        if (valor.length > 6 && valor.length <= 9) {
            return valor.replace(/(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
        }
        if (valor.length == 10) {
            return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
        }
        return CpfFormatador.formatar(valor);
    };
    return CpfFormatador;
}());
export { CpfFormatador };
//# sourceMappingURL=cpf.formatador.js.map