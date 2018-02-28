export class Imagem{
    public idImagem:number;
    public nome:string;
    public caminho:string;
    public source:any=null;
    
    private enviar:boolean=false;
    public carregada:boolean=false;

    constructor(
        idImagem:number, nome:string, caminho:string, source:any){
        this.idImagem = idImagem;
        this.nome = nome;
        this.caminho = caminho;
        this.source = source;
    }

    public getImagem():any{
        if(this.source != null){
            return "data:image/jpeg;base64,"+this.source;
        }
        
        return this.caminho;
    }

    public isImagemNova(){
        return this.enviar;
    }

    public static getNovaImagem(){
        return new Imagem(undefined, undefined, undefined, undefined);
    }

    public novaImagem(nova:boolean){
        this.enviar=nova;
        this.carregada=false;
    }

    public isNovaImagem(){
        return this.enviar;
    }
}
