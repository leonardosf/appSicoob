var Imagem = /** @class */ (function () {
    function Imagem(idImagem, nome, caminho, source) {
        this.source = null;
        this.enviar = false;
        this.carregada = false;
        this.idImagem = idImagem;
        this.nome = nome;
        this.caminho = caminho;
        this.source = source;
    }
    Imagem.prototype.getImagem = function () {
        if (this.source != null) {
            return "data:image/jpeg;base64," + this.source;
        }
        return this.caminho;
    };
    Imagem.prototype.isImagemNova = function () {
        return this.enviar;
    };
    Imagem.getNovaImagem = function () {
        return new Imagem(undefined, undefined, undefined, undefined);
    };
    Imagem.prototype.novaImagem = function (nova) {
        this.enviar = nova;
        this.carregada = false;
    };
    Imagem.prototype.isNovaImagem = function () {
        return this.enviar;
    };
    return Imagem;
}());
export { Imagem };
//# sourceMappingURL=Imagem.js.map