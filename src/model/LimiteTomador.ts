export class LimiteTomador {

    public portfolio: string;
    public limiteConcedido: number;
    public limiteDisponivel: number;
    public limiteUtilizado: number;
    
    constructor(portfolio: string,limiteConcedido:number,
        limiteDisponivel:number,limiteUtilizado:number,) {
        this.portfolio = portfolio;
        this.limiteConcedido = limiteConcedido;
        this.limiteDisponivel = limiteDisponivel;
        this.limiteUtilizado = limiteUtilizado;
    }


}