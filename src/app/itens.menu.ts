import { MensagemPage } from './../pages/mensagem/mensagem';
import { OperacaoPage, SelecionarClientePage,  AcompanhamentoPage, RelatorioPage,
         SelecionarClienteSimuladorPage, DesempenhoPage, HomePage, DocumentacaoPage, PropostaPage, SimuladorDetalhePage, GarantiaPage, DocumentacaoHomePage } from './paginas';
import { NavController } from 'ionic-angular';
import { EstudoPage } from '../pages/estudo/estudo';
import { AprovacaoPage } from '../pages/aprovacao/aprovacao';

export class ItensMenu{
    private itensMenu = new Array<any>();
    private nav: NavController;
    
    public lse():ItensMenu{
       let item = {
            titulo: 'LSE',
            icone: 'microcredito',
            pagina: SelecionarClientePage,
            ativa: ['SelecionarClientePage', 'PropostaPage', 'LsePage', 'DocumentacaoPage']
        };

        this.itensMenu.push(item);
        return this;
    }

    public operacoes():ItensMenu{
       let item = {
            titulo: 'Mesa de Operações',
            icone: 'operacoes',
            pagina: OperacaoPage,
            ativa: ['OperacaoPage']
        };

        this.itensMenu.push(item);
        return this;
    }

    public visitas():ItensMenu{
       let item = {
            titulo: 'Visitas',
            icone: 'visitas',
            pagina: AcompanhamentoPage,
            ativa: ['AcompanhamentoPage', 'AcompanhamentoDetalhesPage', 'AcompanhamentoRegistrarPage', 'AcompanhamentoDocumentoPage']
        };

        this.itensMenu.push(item);
        return this;
    }

    public simular():ItensMenu{
       let item = {
            titulo: 'Simular',
            icone: 'simular',
            pagina: SelecionarClienteSimuladorPage,
            ativa: ['SelecionarClienteSimuladorPage']
        };

        this.itensMenu.push(item);
        return this;
    }

    public aprovacao():ItensMenu{
       let item = {
            titulo: 'Aprovação',
            icone: 'aprovacao',
            pagina: AprovacaoPage,
            ativa: ['AprovacaoPage']
        };

        this.itensMenu.push(item);
        return this;
    }

    public desempenho():ItensMenu{
       let item = {
            titulo: 'Desempenho',
            icone: 'desempenho',
            pagina: DesempenhoPage,
            ativa: ['DesempenhoPage']
        };

        this.itensMenu.push(item);
        return this;
    }

    public relatorios():ItensMenu{
       let item = {
            titulo: 'Relatório',
            icone: 'relatorio',
            pagina: RelatorioPage,
            ativa: ['RelatorioPage']
        }

        this.itensMenu.push(item);
        return this;
    }

    public home():ItensMenu{
       let item =  {
            titulo: 'Início',
            icone: 'options',
            pagina: HomePage,
            ativa: ['HomePage']
        }

        this.itensMenu.push(item);
        return this;
    }

    public mensagens():ItensMenu{
       let item =  {
            titulo: 'Mensagens',
            icone: 'mensagem',
            pagina: MensagemPage,
            ativa: ['MensagemPage']
        }

        this.itensMenu.push(item);
        return this;
    }

    public construir():any{
        return this.itensMenu;
    }

    public voltar():ItensMenu{
        let item =  {
             titulo: 'Voltar',
             icone: 'anterior',
             pagina: HomePage,
             ativa: ['HomePage']
         }
 
         this.itensMenu.push(item);
         return this;
     }

     public iconRodaPeCadastro():ItensMenu{
        let item =  {
             titulo: 'Cadastro',
             icone: 'rodape-cadastro',
             pagina: SimuladorDetalhePage,
             ativa: ['SimuladorDetalhePage']
            }
 
         this.itensMenu.push(item);
         return this;
     }

     public iconRodaPeDocumentacao():ItensMenu {
        let item =  { 
            titulo: 'Documentação',
            icone: 'rodape-documentacao',
            pagina: DocumentacaoHomePage,
            ativa: ['DocumentacaoHomePage']
        }
        this.itensMenu.push(item);
        return this;
     }

     public iconRodaPeImprimir():ItensMenu {
        let item =  { 
            titulo: 'Imprimir',
            icone: 'rodape-documentacao',
            // pagina: DocumentacaoHomePage,
            ativa: ['DocumentacaoHomePage']
        }
        this.itensMenu.push(item);
        return this;
     }

     public iconRodaPeGarantia():ItensMenu {
        let item =  { 
            titulo: 'Garantia',
            icone: 'rodape-garantia',
            pagina: GarantiaPage,
            ativa: ['GarantiaPage']
        }
        this.itensMenu.push(item);
        return this;
     }

     public iconRodaPeEstudo():ItensMenu {
        let item =  { 
            titulo: 'Estudo',
            icone: 'rodape-estudo',
            pagina: EstudoPage,
            ativa: ['EstudoPage']
        }
        this.itensMenu.push(item);
        return this;
     }
     
}
