import { Dashboard } from '../../model/Dashboard';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Paths } from '../../app/paths';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { GraficoOperacao } from '../../model/GraficoOperacao';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { HomePage } from '../home/home';
import { Util } from '../../app/util';
import { LinhaCredito } from '../../model/LinhaCredito';

@Component({
    templateUrl: 'desempenho.html'
})
export class DesempenhoPage {



    @ViewChild('barCanvas') barCanvas;
    @ViewChild('barCanvasFiannceiro') barCanvasFinanceiro;
    /*@ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('pie') pie;*/

    barChart: any;
    chartFinanceiro:any;
    
    semResultado:boolean=false;
    temGraficoFisico:boolean=false;
    temGRaficoFinanceiro:boolean=false;
    buscaRealizada:boolean = false;

    
    exibirBotaoLimpar:boolean = false;
    private demonstrativoFinanceiro:any = false;
    private demonstrativoFisico:any = false;
    private graficos:Array<Dashboard>;
    procurouGraficoFisico:boolean = false;
    procurouGraficoFinanceiro:boolean = false;
    encontrouFinanceiro:boolean = false;
    encontrouFisico:boolean = false;
    linhasDeCredito:Array<LinhaCredito> = new Array<LinhaCredito>();
    private linhaSelecionada:any;
    nomeLinhaCreditoSelecionada:string;
    graficoFinanceiro:Dashboard = new Dashboard();
    graficoFisico:Dashboard = new Dashboard();
    private _linhasTemp:Array<LinhaCredito>;

    constructor(
        private navCtrl: NavController, 
        private _http:Http, 
        private mensagem: MensagemServicoProvider
    ) {
        this.linhasDeCredito.push(new LinhaCredito(9999999, "Todas"));
        this.carregarLinhas();
        
    }


    limparBusca(){
        this.temGraficoFisico = false;
        this.temGRaficoFinanceiro = false;
        this.buscaRealizada = false;
        this.semResultado = false;
        this.exibirBotaoLimpar = false;
        this.demonstrativoFinanceiro = null;
        this.demonstrativoFisico = null;
        this.procurouGraficoFinanceiro = false;
        this.procurouGraficoFisico = false;
        this.encontrouFinanceiro = false;
        this.encontrouFisico = false;
        this.linhaSelecionada = undefined;
        this.nomeLinhaCreditoSelecionada = "";
        this.linhaSelecionada = 9999999;
    }

    carregarLinhas() {
        this._http.get(Paths.LINHA).map(res => res.json()).subscribe((data) => {
       
             this._linhasTemp = data;
             this._linhasTemp.forEach((el)=>{        
                 let data = el.dataCadastroLinhaCredito.replace("/", "-");
                 data = data.replace("/", "-");
                 console.log(data)
               this.linhasDeCredito.push(new LinhaCredito(el.idLinhaCredito +";"+data, el.nomeComercialLinhaCredito));
             });  

            this.linhaSelecionada = 9999999;
        });
    }

    buscarDashboards(){
        
        let tipoDashboard:number = this.verificarTipoDashboard();
        if(tipoDashboard == 0){
            this.mensagem.mensagemAlerta('Operação não permitida!', 'Selecione pelo menos um demonstrativo.');
            return;
        }

        let caminho: string ;
        console.log(this.linhaSelecionada)
        if(this.linhaSelecionada != 9999999){
            caminho =  Paths.DASHBOARDS + "/" + tipoDashboard + "/" + this.linhaSelecionada;
        }else{
            caminho = Paths.DASHBOARDS + "/" + tipoDashboard;
        }

        
        let param:URLSearchParams  = new URLSearchParams();
        
        param.set('tipoDashboard', tipoDashboard.toString());
    
        if (this.linhaSelecionada != 9999999) {
          param.set('idLinhaCredito', this.linhaSelecionada.toString());
        }

        let requestOptions = new RequestOptions();
        requestOptions.search = param;
        this._http.get( Paths.DASHBOARDS, requestOptions).map(res => res.json()).
            subscribe((dados) => {
            this.nomeLinhaCreditoSelecionada = Util.getNomeLinhaCredito(this.linhaSelecionada, this.linhasDeCredito);
            this.buscaRealizada = true;
            this.graficos = dados;
                
                for(let grf of this.graficos){
                    console.log("Loop");
                    console.log(grf);
                    if(grf.tipoDashboard == Util.TIPO_DASHBOARD_DEMONSTRATIVO_FINANCEIRO){
                        //this.dashboardFinanceiro = grf;
                        
                        
                        this.montarGraficoDemonstrativoFinanceiro(grf);
                    }else if(grf.tipoDashboard == Util.TIPO_DASHBOARD_DEMONSTRATIVO_FISICO){
                        //this.dashboardFisico = grf;
                        
                        
                        this.montaGraficoDemonstrativoFisico(grf);
                    }
                }
                
                //this.construirGraficos();
            });
            this.buscaRealizada = true;
            this.exibirBotaoLimpar = true;
    }
    
    private verificarTipoDashboard():number{
        
        let retorno:number;

        if(this.demonstrativoFinanceiro && !this.demonstrativoFisico){        
            retorno =  Util.TIPO_DASHBOARD_DEMONSTRATIVO_FINANCEIRO;
            this.procurouGraficoFinanceiro = true;
        }else if(this.demonstrativoFisico && !this.demonstrativoFinanceiro){
            retorno = Util.TIPO_DASHBOARD_DEMONSTRATIVO_FISICO;
            this.procurouGraficoFisico = true;
        }else if(this.demonstrativoFinanceiro && this.demonstrativoFisico){            
            retorno = Util.TODOS_DASHBOARDS;
            this.procurouGraficoFinanceiro = true;
            this.procurouGraficoFisico = true;
        }else{
            
            retorno = 0;
        }
         
        return retorno;
    }

    private montaGraficoDemonstrativoFisico(dashboard:Dashboard){
        this.graficoFisico = dashboard;

        if(dashboard.quantidadeAnalise == 0 && dashboard.quantidadeContrato == 0 &&
            dashboard.quantidadeProposta == 0 && dashboard.quantidadeProspeccao == 0){
                this.encontrouFisico = false;
            } else {
            this.temGraficoFisico = true;
            this.encontrouFisico = true;            
            this.barChart = new Chart(this.barCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: ["Operações"],
                    datasets: [
                        {
                            label: 'Prospecção',
                            data: [dashboard.quantidadeProspeccao],
                            backgroundColor: ['#00AF9D'],
                            borderWidth: 1
                        },
                        {
                            label: 'Análise',
                            data: [dashboard.quantidadeAnalise],
                            backgroundColor: ['#D4B700'],
                            borderWidth: 1
                        },
                        {
                            label: 'Proposta',
                            data: [dashboard.quantidadeProposta],
                            backgroundColor: ['#8BAAAF'],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: '#fff',
                            gridLines:{
                                drawBorder: false,
                                color:'rgba(256,256,256,.3)',
                                zeroLineColor: 'rgba(256,256,256,.5)'
                            }
                        }],

                        xAxes: [{
                            scaleLabel: '#fff',
                            gridLines:{
                                drawBorder: false,
                                color:'rgba(256,256,256,.3)',
                                zeroLineColor: 'rgba(256,256,256,.5)'
                            }
                        }]
                    },
                    legend:{display:false}
                }
            });
        }
    }

    private montarGraficoDemonstrativoFinanceiro(dashboard:Dashboard){
        console.log(dashboard)
                
        if(dashboard.totalContratosAdimplentes + dashboard.totalContratosInadimplentes != 0){
                this.graficoFinanceiro = dashboard;                   
                this.encontrouFinanceiro = true;
                this.temGRaficoFinanceiro = true;
                this.chartFinanceiro = new Chart(this.barCanvasFinanceiro.nativeElement, {
                    
                    type: 'pie',
                    data: {   
                        labels:["Adimplência", "Inadimplência"] ,
                        datasets: [{
                            label: 'Total',
                            data: [dashboard.percentualAdimplente.toFixed(2), dashboard.percentualInadimplente.toFixed(2)],
                            backgroundColor: [
                                '#74C049',
                                '#E4636E',                                  
                            ],
                            hoverBackgroundColor: [
                                "#4cd200",
                                "#ff4050",
                            ]
                        }],                           
                        options: {
                        elements: {
                            center: {
                            text: 'Desktop',
                            color: '#FFFFFF', //Default black                                    
                            sidePadding: 15 //Default 20 (as a percentage)
                            }
                        }
                        }
                    }

                });
        }else{
            this.encontrouFinanceiro = false;
        }
    }

}
