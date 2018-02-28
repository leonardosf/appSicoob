import { Documento } from "./Documento";

export class FaseDocumento {

    constructor( titulo: string, documentos: Array<Documento>) {
        this.titulo = titulo;
        this.documentos = documentos;
    }


    public titulo: string;
    public documentos: Array<Documento> = new Array<Documento>();
}