export class Conta {

    constructor(banco:number, agencia:number,conta: number) {
        this.banco = banco;
        this.agencia = agencia;
        this.conta = conta;
    }


    public banco:number;
    public agencia:number;
    public conta:number;
    public cssClass:string = 'buttonDefault';
}