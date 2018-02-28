import { Configuracao } from './configuracao';
import { ConfiguracaoDesenv } from './configuracao-desenv';
import { ConfiguracaoTI } from './configuracao-ti';
import { ConfiguracaoHomol } from './configuracao-homol';
import { ConfiguracaoProd } from './configuracao-prod';

enum Ambiente{
    DESENV,
    TI,
    HOMOL,
    PROD
}

declare const process: any; // Typescript compiler will complain without this

export class Configuracoes{
    //private static readonly AMBIENTE:Ambiente = Ambiente[''+process.env.NODE_ENV]
    private static AMBIENTE:Ambiente = Ambiente.DESENV;
    private static configuracao:Configuracao = null;

    private static getConfiguracao():Configuracao{
        if(Configuracoes.configuracao == null){
            Configuracoes.configuracao = Configuracoes.obterConfiguracao();
        }
        return Configuracoes.configuracao;
    }

    private static obterConfiguracao():Configuracao{
        switch(Configuracoes.AMBIENTE){
            case Ambiente.DESENV:   return new ConfiguracaoDesenv();
            case Ambiente.TI:       return new ConfiguracaoTI();
            case Ambiente.HOMOL:    return new ConfiguracaoHomol();
            default:                Configuracoes.AMBIENTE = Ambiente.PROD; return new ConfiguracaoProd();
        }
    }

    public static getUrlLogin():string{
        return Configuracoes.getConfiguracao().getUrlLogin();
    }

    public static getAuthorizationToken():string{
        return Configuracoes.getConfiguracao().getAuthorizationToken();
    }

    public static setAccessToken(accessToken:string){
        Configuracoes.getConfiguracao().setAccessToken(accessToken);
    }

    public static getAccessToken():string{
        return Configuracoes.getConfiguracao().getAccessToken();
    }

    public static getUrlMicrocredito():string{
        return Configuracoes.getConfiguracao().getUrlMicrocredito();
    }

    public static isProducao():boolean{
        return Configuracoes.AMBIENTE == Ambiente.PROD;
    }
}
