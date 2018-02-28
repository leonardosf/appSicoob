export interface Configuracao {
  /**
   * URL utilizada para login
   */
  getUrlLogin():string;
  
    /**
     * Token fornecido pelo api manager
     */
    getAuthorizationToken():string;
  
    /**
     * Token obtido no momento do login e utilizado a cada requisicao
     *
     * @param accessToken
     */
    setAccessToken(accessToken:string);
  
    /**
     * Token utilizado a cada requisicao para autenticacao no api manager
     */
    getAccessToken():string;
  
    /**
     * URL do sistema microcredito
     */
    getUrlMicrocredito():string;
}