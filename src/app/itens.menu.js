import { MensagemPage } from './../pages/mensagem/mensagem';
import { OperacaoPage, SelecionarClientePage, AcompanhamentoPage, RelatorioPage, SelecionarClienteSimuladorPage, DesempenhoPage, HomePage, SimuladorDetalhePage, GarantiaPage, DocumentacaoHomePage } from './paginas';
import { EstudoPage } from '../pages/estudo/estudo';
import { AprovacaoPage } from '../pages/aprovacao/aprovacao';
var ItensMenu = /** @class */ (function () {
    function ItensMenu() {
        this.itensMenu = new Array();
    }
    ItensMenu.prototype.lse = function () {
        var item = {
            titulo: 'LSE',
            icone: 'microcredito',
            pagina: SelecionarClientePage,
            ativa: ['SelecionarClientePage', 'PropostaPage', 'LsePage', 'DocumentacaoPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.operacoes = function () {
        var item = {
            titulo: 'Mesa de Operações',
            icone: 'operacoes',
            pagina: OperacaoPage,
            ativa: ['OperacaoPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.visitas = function () {
        var item = {
            titulo: 'Visitas',
            icone: 'visitas',
            pagina: AcompanhamentoPage,
            ativa: ['AcompanhamentoPage', 'AcompanhamentoDetalhesPage', 'AcompanhamentoRegistrarPage', 'AcompanhamentoDocumentoPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.simular = function () {
        var item = {
            titulo: 'Simular',
            icone: 'simular',
            pagina: SelecionarClienteSimuladorPage,
            ativa: ['SelecionarClienteSimuladorPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.aprovacao = function () {
        var item = {
            titulo: 'Aprovação',
            icone: 'aprovacao',
            pagina: AprovacaoPage,
            ativa: ['AprovacaoPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.desempenho = function () {
        var item = {
            titulo: 'Desempenho',
            icone: 'desempenho',
            pagina: DesempenhoPage,
            ativa: ['DesempenhoPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.relatorios = function () {
        var item = {
            titulo: 'Relatório',
            icone: 'relatorio',
            pagina: RelatorioPage,
            ativa: ['RelatorioPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.home = function () {
        var item = {
            titulo: 'Início',
            icone: 'options',
            pagina: HomePage,
            ativa: ['HomePage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.mensagens = function () {
        var item = {
            titulo: 'Mensagens',
            icone: 'mensagem',
            pagina: MensagemPage,
            ativa: ['MensagemPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.construir = function () {
        return this.itensMenu;
    };
    ItensMenu.prototype.voltar = function () {
        var item = {
            titulo: 'Voltar',
            icone: 'anterior',
            pagina: HomePage,
            ativa: ['HomePage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.iconRodaPeCadastro = function () {
        var item = {
            titulo: 'Cadastro',
            icone: 'rodape-cadastro',
            pagina: SimuladorDetalhePage,
            ativa: ['SimuladorDetalhePage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.iconRodaPeDocumentacao = function () {
        var item = {
            titulo: 'Documentação',
            icone: 'rodape-documentacao',
            pagina: DocumentacaoHomePage,
            ativa: ['DocumentacaoHomePage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.iconRodaPeGarantia = function () {
        var item = {
            titulo: 'Garantia',
            icone: 'rodape-garantia',
            pagina: GarantiaPage,
            ativa: ['GarantiaPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    ItensMenu.prototype.iconRodaPeEstudo = function () {
        var item = {
            titulo: 'Estudo',
            icone: 'rodape-estudo',
            pagina: EstudoPage,
            ativa: ['EstudoPage']
        };
        this.itensMenu.push(item);
        return this;
    };
    return ItensMenu;
}());
export { ItensMenu };
//# sourceMappingURL=itens.menu.js.map