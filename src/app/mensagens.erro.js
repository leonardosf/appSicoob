var MensagensErro = /** @class */ (function () {
    function MensagensErro() {
    }
    MensagensErro.getMensagem = function (erro) {
        if (erro.status == 0) {
            return "Serviço indisponível.";
        }
        if (erro.status == 600) {
            return "Sem conexão com a internet.";
        }
        if (erro.status == 401) {
            return "Sua sessão expirou.";
        }
        if (erro.status == 500) {
            return "Erro ao realizar a requisição. Contate o suporte.";
        }
        if (JSON.parse(erro._body).error_description) {
            return JSON.parse(erro._body).error_description;
        }
        return JSON.parse(erro._body).erro.mensagem;
    };
    return MensagensErro;
}());
export { MensagensErro };
//# sourceMappingURL=mensagens.erro.js.map