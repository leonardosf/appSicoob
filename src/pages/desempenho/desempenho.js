var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Dashboard } from '../../model/Dashboard';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Paths } from '../../app/paths';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Util } from '../../app/util';
import { LinhaCredito } from '../../model/LinhaCredito';
var DesempenhoPage = /** @class */ (function () {
    function DesempenhoPage(navCtrl, _http, mensagem) {
        this.navCtrl = navCtrl;
        this._http = _http;
        this.mensagem = mensagem;
        this.semResultado = false;
        this.temGraficoFisico = false;
        this.temGRaficoFinanceiro = false;
        this.buscaRealizada = false;
        this.exibirBotaoLimpar = false;
        this.demonstrativoFinanceiro = false;
        this.demonstrativoFisico = false;
        this.procurouGraficoFisico = false;
        this.procurouGraficoFinanceiro = false;
        this.encontrouFinanceiro = false;
        this.encontrouFisico = false;
        this.linhasDeCredito = new Array();
        this.graficoFinanceiro = new Dashboard();
        this.graficoFisico = new Dashboard();
        this.linhasDeCredito.push(new LinhaCredito(9999999, "Todas"));
        this.carregarLinhas();
    }
    DesempenhoPage.prototype.limparBusca = function () {
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
    };
    DesempenhoPage.prototype.carregarLinhas = function () {
        var _this = this;
        this._http.get(Paths.LINHA).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this._linhasTemp = data;
            _this._linhasTemp.forEach(function (el) {
                var data = el.dataCadastroLinhaCredito.replace("/", "-");
                data = data.replace("/", "-");
                console.log(data);
                _this.linhasDeCredito.push(new LinhaCredito(el.idLinhaCredito + ";" + data, el.nomeComercialLinhaCredito));
            });
            _this.linhaSelecionada = 9999999;
        });
    };
    DesempenhoPage.prototype.buscarDashboards = function () {
        var _this = this;
        var tipoDashboard = this.verificarTipoDashboard();
        if (tipoDashboard == 0) {
            this.mensagem.mensagemAlerta('Operação não permitida!', 'Selecione pelo menos um demonstrativo.');
            return;
        }
        var caminho;
        console.log(this.linhaSelecionada);
        if (this.linhaSelecionada != 9999999) {
            caminho = Paths.DASHBOARDS + "/" + tipoDashboard + "/" + this.linhaSelecionada;
        }
        else {
            caminho = Paths.DASHBOARDS + "/" + tipoDashboard;
        }
        var param = new URLSearchParams();
        param.set('tipoDashboard', tipoDashboard.toString());
        if (this.linhaSelecionada != 9999999) {
            param.set('idLinhaCredito', this.linhaSelecionada.toString());
        }
        var requestOptions = new RequestOptions();
        requestOptions.search = param;
        this._http.get(Paths.DASHBOARDS, requestOptions).map(function (res) { return res.json(); }).
            subscribe(function (dados) {
            _this.nomeLinhaCreditoSelecionada = Util.getNomeLinhaCredito(_this.linhaSelecionada, _this.linhasDeCredito);
            _this.buscaRealizada = true;
            _this.graficos = dados;
            for (var _i = 0, _a = _this.graficos; _i < _a.length; _i++) {
                var grf = _a[_i];
                console.log("Loop");
                console.log(grf);
                if (grf.tipoDashboard == Util.TIPO_DASHBOARD_DEMONSTRATIVO_FINANCEIRO) {
                    //this.dashboardFinanceiro = grf;
                    _this.montarGraficoDemonstrativoFinanceiro(grf);
                }
                else if (grf.tipoDashboard == Util.TIPO_DASHBOARD_DEMONSTRATIVO_FISICO) {
                    //this.dashboardFisico = grf;
                    _this.montaGraficoDemonstrativoFisico(grf);
                }
            }
            //this.construirGraficos();
        });
        this.buscaRealizada = true;
        this.exibirBotaoLimpar = true;
    };
    DesempenhoPage.prototype.verificarTipoDashboard = function () {
        var retorno;
        if (this.demonstrativoFinanceiro && !this.demonstrativoFisico) {
            retorno = Util.TIPO_DASHBOARD_DEMONSTRATIVO_FINANCEIRO;
            this.procurouGraficoFinanceiro = true;
        }
        else if (this.demonstrativoFisico && !this.demonstrativoFinanceiro) {
            retorno = Util.TIPO_DASHBOARD_DEMONSTRATIVO_FISICO;
            this.procurouGraficoFisico = true;
        }
        else if (this.demonstrativoFinanceiro && this.demonstrativoFisico) {
            retorno = Util.TODOS_DASHBOARDS;
            this.procurouGraficoFinanceiro = true;
            this.procurouGraficoFisico = true;
        }
        else {
            retorno = 0;
        }
        return retorno;
    };
    DesempenhoPage.prototype.montaGraficoDemonstrativoFisico = function (dashboard) {
        this.graficoFisico = dashboard;
        if (dashboard.quantidadeAnalise == 0 && dashboard.quantidadeContrato == 0 &&
            dashboard.quantidadeProposta == 0 && dashboard.quantidadeProspeccao == 0) {
            this.encontrouFisico = false;
        }
        else {
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
                                gridLines: {
                                    drawBorder: false,
                                    color: 'rgba(256,256,256,.3)',
                                    zeroLineColor: 'rgba(256,256,256,.5)'
                                }
                            }],
                        xAxes: [{
                                scaleLabel: '#fff',
                                gridLines: {
                                    drawBorder: false,
                                    color: 'rgba(256,256,256,.3)',
                                    zeroLineColor: 'rgba(256,256,256,.5)'
                                }
                            }]
                    },
                    legend: { display: false }
                }
            });
        }
    };
    DesempenhoPage.prototype.montarGraficoDemonstrativoFinanceiro = function (dashboard) {
        console.log(dashboard);
        if (dashboard.totalContratosAdimplentes + dashboard.totalContratosInadimplentes != 0) {
            this.graficoFinanceiro = dashboard;
            this.encontrouFinanceiro = true;
            this.temGRaficoFinanceiro = true;
            this.chartFinanceiro = new Chart(this.barCanvasFinanceiro.nativeElement, {
                type: 'pie',
                data: {
                    labels: ["Adimplência", "Inadimplência"],
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
                                color: '#FFFFFF',
                                sidePadding: 15 //Default 20 (as a percentage)
                            }
                        }
                    }
                }
            });
        }
        else {
            this.encontrouFinanceiro = false;
        }
    };
    __decorate([
        ViewChild('barCanvas'),
        __metadata("design:type", Object)
    ], DesempenhoPage.prototype, "barCanvas", void 0);
    __decorate([
        ViewChild('barCanvasFiannceiro'),
        __metadata("design:type", Object)
    ], DesempenhoPage.prototype, "barCanvasFinanceiro", void 0);
    DesempenhoPage = __decorate([
        Component({
            templateUrl: 'desempenho.html'
        }),
        __metadata("design:paramtypes", [NavController,
            Http,
            MensagemServicoProvider])
    ], DesempenhoPage);
    return DesempenhoPage;
}());
export { DesempenhoPage };
//# sourceMappingURL=desempenho.js.map