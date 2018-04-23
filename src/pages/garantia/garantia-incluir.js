var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from "@angular/http";
import { NavParams, NavController } from "ionic-angular";
import { MensagemServicoProvider } from "../../providers/mensagem.servico";
import { Component } from "@angular/core";
import { TipoGarantia } from '../../model/TipoGarantia';
import { GrupoGarantia } from "../../model/GrupoGarantia";
import { OrigemGarantia } from "../../model/OrigemGarantia";
import { EnquadramentoGarantia } from "../../model/EnquadramentoGarantia";
import { TomadorLSE } from "../../model/TomadorLSE";
import { ResponsabilidadeGarantia } from "../../model/ResponsabilidadeGarantia";
import { ProprietarioDTO } from "../../model/ProprietarioDTO";
import { GarantiaPage } from "./garantia";
import { GarantiaDTO } from "../../model/GarantiaDTO";
import { OperacaoPage } from "../operacao/operacao";
var GarantiaIncluirPage = /** @class */ (function () {
    function GarantiaIncluirPage(http, navParams, nav, mensagem) {
        this.http = http;
        this.navParams = navParams;
        this.nav = nav;
        this.mensagem = mensagem;
        this.tipoGarantias = new Array();
        this.grupoGarantias = new Array();
        this.enquadramentoGarantias = new Array();
        this.responsabilidadeGarantias = new Array();
        this.origemGarantias = new Array();
        this.exibirGridCombos = true;
        this.exibirGridProprietario = false;
        this.exibirConteudoTomador = false;
        this.exibirTomador = false;
        this.ultimaAvaliacao = new Date;
        this.tomadores = new Array();
        this.proprietarios = new Array();
        this.garantia = new GarantiaDTO();
        this.tipoFase = 'Aplicação';
        this.consultaEnquadramento = true;
        this.consultaGrupo = true;
        this.consultaOrigem = true;
        this.consultaAba = true;
        this.abaAplicacao = true;
        this.abaPessoal = true;
        this.abaReal = true;
        this.consultaCpf = false;
        this.garantias = new Array();
        this.preencherDadosInicias();
        this.garantias = navParams.get('garantias');
        console.log(this.garantias);
        this.titulo = 'Incluir Garantia';
    }
    GarantiaIncluirPage.prototype.preencherDadosInicias = function () {
        this.tipoGarantias.push(new TipoGarantia(1, "GARANTIA FIDEJUSSÓRIA"));
        this.tipoGarantias.push(new TipoGarantia(2, "DIREITOS CREDITÓRIOS"));
        this.responsabilidadeGarantias.push(new ResponsabilidadeGarantia(1, "PROPRIETÁRIO"));
        this.responsabilidadeGarantias.push(new ResponsabilidadeGarantia(2, "TERCEIRO"));
    };
    GarantiaIncluirPage.prototype.voltar = function () {
        if (this.exibirGridCombos) {
            this.nav.pop();
        }
        else {
            this.titulo = 'Incluir Garantia';
            this.exibirGridCombos = true;
            this.exibirGridProprietario = false;
            this.exibirTomador = false;
            this.proprietarios = new Array();
        }
    };
    GarantiaIncluirPage.prototype.limparTudo = function () {
        this.responsabilidadeGarantias = new Array();
        this.tipoGarantias = new Array();
        this.tipoDeGarantia = null;
        this.responsabilidadeDeGarantia = null;
        this.valorGarantia = null;
        this.descricaoGarantia = null;
        this.ultimaAvaliacao = new Date;
        this.consultaCpf = false;
        this.preencherDadosInicias();
        this.limparTela();
        console.log(this.consultaGrupo);
    };
    GarantiaIncluirPage.prototype.limparTela = function () {
        this.consultaEnquadramento = true;
        this.consultaGrupo = true;
        this.consultaOrigem = true;
        this.consultaAba = true;
        this.abaAplicacao = true;
        this.abaPessoal = true;
        this.abaReal = true;
        this.consultaEnquadramento = true;
        this.consultaGrupo = true;
        this.consultaOrigem = true;
        this.consultaAba = true;
        this.abaAplicacao = true;
        this.abaPessoal = true;
        this.abaReal = true;
        this.grupoDeGarantia = null;
        this.enquadramentoDeGarantia = null;
        this.responsabilidadeDeGarantia = null;
        this.origemDeGarantia = null;
        this.tipoFase = null;
        this.grupoGarantias = new Array();
        this.enquadramentoGarantias = new Array();
        this.origemGarantias = new Array();
        this.tomadores = new Array();
    };
    GarantiaIncluirPage.prototype.atualizacaoTipoGarantia = function () {
        if (this.consultaGrupo && this.tipoDeGarantia != null) {
            this.consultaGrupo = false;
        }
        else {
            this.limparTela();
            this.consultaGrupo = false;
        }
        switch (this.tipoDeGarantia) {
            case 1: {
                this.grupoGarantias.push(new GrupoGarantia(1, "AVALISTA - PF"));
                this.grupoGarantias.push(new GrupoGarantia(2, "AVALISTA - PJ"));
                break;
            }
            case 2: {
                this.grupoGarantias.push(new GrupoGarantia(1, "AÇÕES E APLICAÇÕES"));
                this.grupoGarantias.push(new GrupoGarantia(2, "AÇÕES E DEBÊNTURES"));
                break;
            }
            case 3: {
                break;
            }
        }
    };
    GarantiaIncluirPage.prototype.atualizacaoGrupoGarantia = function () {
        if (this.consultaEnquadramento && this.grupoDeGarantia != null) {
            this.consultaEnquadramento = false;
            switch (this.tipoDeGarantia) {
                case 1: {
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(1, "AVALISTA - PF"));
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(2, "AVALISTA - PJ"));
                    break;
                }
                case 2: {
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(1, "AÇÕES E APLICAÇÕES"));
                    this.enquadramentoGarantias.push(new EnquadramentoGarantia(2, "AÇÕES E DEBÊNTURES"));
                    break;
                }
                case 3: {
                    break;
                }
            }
        }
    };
    GarantiaIncluirPage.prototype.atualizacaoEnquadramentoGarantia = function () {
        if (this.consultaOrigem && this.enquadramentoDeGarantia != null) {
            this.consultaOrigem = false;
            switch (this.tipoDeGarantia) {
                case 1: {
                    this.tipoFase = 'pessoal';
                    this.abaPessoal = false;
                    this.consultaOrigem = true;
                    break;
                }
                case 2: {
                    this.origemGarantias.push(new OrigemGarantia(1, "PRÓPRIO"));
                    this.origemGarantias.push(new OrigemGarantia(2, "TERCEIRO"));
                    break;
                }
                case 3: {
                    break;
                }
            }
        }
    };
    GarantiaIncluirPage.prototype.atualizacaoOrigemGarantia = function () {
        if (this.consultaAba && this.origemDeGarantia != null) {
            this.consultaAba = false;
            switch (this.tipoDeGarantia) {
                case 2: {
                    this.tipoFase = 'real';
                    this.abaReal = false;
                    break;
                }
                case 3: {
                    break;
                }
            }
        }
    };
    GarantiaIncluirPage.prototype.botaoHabilitado = function () {
    };
    GarantiaIncluirPage.prototype.incluirProprietario = function () {
        this.titulo = 'Incluir Proprietário';
        this.exibirGridCombos = false;
        this.exibirGridProprietario = true;
    };
    GarantiaIncluirPage.prototype.consultaPessoaCapes = function () {
        if (!(this.tipoDeGarantia == 1 && this.tomadores.length >= 1)) {
            if (!this.numCpfCnpj || this.numCpfCnpj == null || this.numCpfCnpj == '') {
                this.mensagem.mensagemAlerta('CPF/CNPJ não informado!', 'Informe um CPF ou CNPJ.');
                return;
            }
            if (this.tipoDeGarantia == 1) {
                this.consultaCpf = true;
            }
            this.numCpfCnpj = null;
            this.tomador = new TomadorLSE;
            this.tomador.nomePessoa = "Carlos",
                this.tomador.numCpfCnpj = "999.999.999-99";
            this.tomador.codTipoPessoa = 1;
            this.tomador.nomeApelido = "Carlos";
            this.tomador.idPessoa = 1;
            this.tomador.dataRenovacaoCadastral = new Date();
            this.tomador.dataInclusaoSistema = new Date();
            this.tomador.dataNascimentoPessoaFisica = new Date();
            this.tomadores.push(this.tomador);
            this.exibirConteudoTomador = true;
        }
    };
    GarantiaIncluirPage.prototype.enviarMesa = function () {
        this.nav.push(OperacaoPage, { "tomador": this.tomador });
    };
    GarantiaIncluirPage.prototype.incluirGarantia = function () {
        var _this = this;
        this.garantia.descricao = this.descricaoGarantia;
        this.garantia.valor = this.valorGarantia;
        this.grupoGarantias.forEach(function (grupoElement) {
            if (_this.grupoDeGarantia === grupoElement.codigo) {
                _this.garantia.grupoGarantia = grupoElement.nome;
            }
        });
        this.tipoGarantias.forEach(function (tipoElement) {
            if (_this.tipoDeGarantia === tipoElement.codigo) {
                _this.garantia.tipoGarantia = tipoElement.nome;
            }
        });
        console.log(this.garantias);
        if (!this.garantias) {
            this.garantias = new Array();
        }
        this.garantias.push(this.garantia);
        var tomador = new TomadorLSE();
        tomador.nomePessoa = 'Carlos Costa';
        tomador.numCpfCnpj = '999.999.999-99';
        var proprietario = new ProprietarioDTO();
        proprietario.nome = tomador.nomePessoa;
        proprietario.numCpfCnpj = tomador.numCpfCnpj;
        this.responsabilidadeGarantias.forEach(function (responsabilidadeElement) {
            console.log(responsabilidadeElement);
            if (_this.responsabilidadeDeGarantia === responsabilidadeElement.codigo) {
                proprietario.responsabilidade = responsabilidadeElement.nome;
            }
        });
        this.proprietarios.push(proprietario);
        this.tomador = new TomadorLSE();
        this.limparDados();
        // this.exibirConteudoTomador = false;
        // this.exibirTomador = true;   
        this.nav.push(GarantiaPage, { "garantias": this.garantias, "tomador": tomador });
    };
    GarantiaIncluirPage.prototype.limparDados = function () {
        this.numCpfCnpj = null;
        this.responsabilidadeDeGarantia = null;
    };
    GarantiaIncluirPage = __decorate([
        Component({
            templateUrl: 'garantia-incluir.html'
        }),
        __metadata("design:paramtypes", [Http, NavParams,
            NavController, MensagemServicoProvider])
    ], GarantiaIncluirPage);
    return GarantiaIncluirPage;
}());
export { GarantiaIncluirPage };
//# sourceMappingURL=garantia-incluir.js.map