import { Configuracao } from './configuracao';

export class ConfiguracaoProd implements Configuracao{
    private accessToken:string = null;

    public getUrlLogin():string{
        return 'https://api.sicoob.com.br/token';
    }

    public getAuthorizationToken():string{
        return 'Basic YnVlaTVaTVRsMHlvY2hpX3hndGM3UDlIOUlrYTpFODdnVXQ1MWtwWnowZk10Tkdka1I0N19teGNh';
    }

    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }

    public getAccessToken():string{
        return this.accessToken;
    }

    public getUrlMicrocredito():string{
        return "https://api.sicoob.com.br/microcredito/";
    }
}
