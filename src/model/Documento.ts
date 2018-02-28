export class Documento {

    constructor(id: any, titulo: string, descricao: string, nomeDocumento:String) {
        this.codigo = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.nomeDocumento = nomeDocumento;
    }


    public codigo: any;
    public titulo: string;
    public descricao: string
    public caminho: string;
    public anexado: boolean;
    public nomeDocumento: String;
}