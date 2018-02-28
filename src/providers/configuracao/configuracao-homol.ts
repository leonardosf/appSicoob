import { Configuracao } from './configuracao';

export class ConfiguracaoHomol implements Configuracao{
    private accessToken:string = null;
    
    public getUrlLogin():string{
        return 'http://apimanager-homol.homologacao.com.br:8280/token';
    }
  
    public getAuthorizationToken():string{
        return 'Basic Q1JsM0NVMkxmZngzZV9BVFpBZmhPdnFOSWFRYTpIQzcwNlB1bkNzbXJoUjB5ZlkwZndmc1I3ZVlh';
    }
    
    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }
  
    public getAccessToken():string{
        return this.accessToken;
    }
  
    public getUrlMicrocredito():string{
        return "http://apimanager-homol.homologacao.com.br:8280/microcredito/1.0.0/";
    }
}