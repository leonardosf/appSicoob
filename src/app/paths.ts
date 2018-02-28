import { Configuracoes } from '../providers/configuracao/configuracoes';

export class Paths{
    private static getUrl():string{
        return Configuracoes.getUrlMicrocredito();
    }

    public static getURL(url:string, paramPath:ParamPath):string{
        for(let param of paramPath.getParametros()){
            url = url.replace('{'+param.nome+'}', param.valor);
        }
        return url;
    }

    /*------Paths------*/
    public static readonly VISITAS:string = Paths.getUrl()+"visitas";
    public static readonly VISITAS_UPLOAD:string = Paths.getUrl()+"visitas/upload";
    public static readonly VISITAS_REMOVER:string = Paths.getUrl()+"visitas/{idVisita}";
    public static readonly VISITAS_ENVIO_IMAGENS:string = Paths.getUrl()+"visitas/envio-imagens";
    public static readonly LINHA:string = Paths.getUrl()+"linhas";
    public static readonly LSES:string = Paths.getUrl()+"lses";
    public static readonly SIMULACOES:string = Paths.getUrl()+"simulacoes"
    public static readonly OPERACOES:string = Paths.getUrl()+"operacoes";
    public static readonly OPERACOES_REMOVER_IMAGENS:string = Paths.getUrl()+"operacoes/{idOperacao}/remove-imagens";
    public static readonly OPERACOES_CLASSIFICACAO:string = Paths.getUrl()+"operacoes/{idOperacao}/classificacao";
    public static readonly OPERACOES_QUESTIONARIOS:string = Paths.getUrl()+"operacoes/{idOperacao}/questionarios";
    public static readonly OPERACOES_VISITAS:string = Paths.getUrl()+"operacoes/{idOperacao}/visitas";
    public static readonly OPERACOES_IMAGENS:string = Paths.getUrl()+"operacoes/{idOperacao}/imagens";
    public static readonly ESTADOS_OPERACAO:string = Paths.getUrl()+"estados-operacao";
    public static readonly AUTORIZACOES:string = Paths.getUrl()+"autorizacoes";
    public static readonly AGENTES:string = Paths.getUrl()+"agentes";
    public static readonly MENSAGENS:string = Paths.getUrl()+"mensagens";
    public static readonly MENSAGENS_TOTAL_NAO_LIDAS:string = Paths.getUrl()+"mensagens/nao-lidas/total";
    public static readonly PROPOSTAS:string = Paths.getUrl()+"propostas";
    public static readonly DOCUMENTACOES_UPLOAD:string = Paths.getUrl()+"documentacoes/upload";
    public static readonly IMAGENS:string = Paths.getUrl()+"imagens/{idImagem}";
    public static readonly DASHBOARDS:string = Paths.getUrl()+"dashboards";
    public static readonly TOMADORES:string = Paths.getUrl()+"tomadores/{cpfCnpj}?consultaProposta={consultaProposta}";
    public static readonly TOMADORES_NOTA_RISCO:string = Paths.getUrl()+"tomadores/{cpfCnpj}/nota-risco";
    public static readonly TOMADORES_QUESTIONARIOS:string = Paths.getUrl()+"tomadores/{codTipoPessoa}/questionarios";
    public static readonly PLANOS_PAGAMENTO:string = Paths.getUrl()+"planos-pagamento?idLinhaCredito={idLinhaCredito}&dataCadastroLinhaCredito={dataCadastroLinhaCredito}"+
                  "&valorOperacao={valorOperacao}&diaVencimento={diaVencimento}&capacidadePagamento={capacidadePagamento}&numCpfCnpj={numCpfCnpj}&idPessoa={idPessoa}";
	public static readonly VERSAO:string = Paths.getUrl()+"versoes";
    public static readonly RELATORIOS_CONSULTA:string = Paths.getUrl()+"relatorios";
    public static readonly RELATORIOS_DETALHE:string = Paths.getUrl()+"relatorios/{idOperacaoCredito}/detalhe-operacao";                                    
}

export class ParamPath{
    private parametros:Array<Param> = new Array<Param>();

    public adicionar(nome:string, valor:string){
        let param:Param = new Param();
        param.nome = nome;
        param.valor = valor;

        this.parametros.push(param);
    }

    public static parametro (nome:string, valor:string):ParamPath{
      let paramPath:ParamPath = new ParamPath();
      paramPath.adicionar(nome, valor);
      return paramPath;
    }


    public getParametros():Array<Param>{
        return this.parametros;
    }
}

class Param{
    nome:string;
    valor:string;
}
