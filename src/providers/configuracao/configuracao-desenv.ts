import { Configuracao } from './configuracao';

export class ConfiguracaoDesenv implements Configuracao{
    private accessToken:string = null;

    public getUrlLogin():string{
        return 'http://apit.homologacao.com.br:8280/token';
    }

    public getAuthorizationToken():string{
        return 'Basic V01nN3RTNDVpNWhZWlNNZGhPdlFPcEdaTWc4YTprWWZ4cDN6R25OQmIwdnliWkhCT2lGSUptbE1h';
    }

    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }

    public getAccessToken():string{
        return this.accessToken;
    }

    public getUrlMicrocredito():string{
        return "http://10.238.37.149:8080/microcredito/api/";
    }
}
