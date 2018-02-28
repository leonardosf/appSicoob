import { Util } from '../../app/util';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Paths } from '../../app/paths';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { Configuracoes } from '../../providers/configuracao/configuracoes';
import { Storage } from '@ionic/storage';
import { Versao } from '../../model/Versao';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage {
  user=null;
  senha=null;
  private perfil:string;
  lembrarUsuario: Boolean = false;
  versao:Versao;

  constructor(private navCtrl: NavController, private http: Http, private menu:MenuController,
    private alertCtrl: AlertController, private mensagem: MensagemServicoProvider,
    private storage: Storage) {
      this.menu.swipeEnable(false);
      this.menu.close();
      this.carregarInformacoesDoUsuario();
  }

  public logar(f){
    if(f.valid){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', Configuracoes.getAuthorizationToken());
      let options = new RequestOptions({ headers: headers });
      let params = 'grant_type=password&username=sicoob.com.br/' + encodeURIComponent(this.user) + '&password=' + encodeURIComponent(this.senha);

      // this.http.post(Configuracoes.getUrlLogin(), params, options).map(res => res.json()).
      // subscribe((data) => {
      //   Configuracoes.setAccessToken(data.access_token);
        this.autorizarAcesso();
      // },
      // (erro) =>{
      //   this.mensagem.erroAlerta("Atenção", erro);
      // });
      
    }
  }

  private autorizarAcesso(){
    // this.http.get(Paths.AUTORIZACOES).subscribe(
    //   () => {

    // SET PERFIL PARA PROTOTICO
    this.perfil = this.user;
    
    this.verificarVersaoApp();

      // },
      // (erro) =>{
      //   this.mensagem.erroAlerta("Atenção", erro);
      // });
  }

  private armazenarInformacoesDoUsuario() {
    this.storage.set("lembrarUsuario", this.lembrarUsuario);
    this.storage.set("usuario", this.lembrarUsuario ? this.user : '');
    this.mensagem.setUserLogado(this.user);
  }

  private verificarVersaoApp() {
    // this.http.get(Paths.VERSAO).map(res => res.json()).
    // subscribe((data) => {
    //   this.versao = data;

    //   if(this.versao.numVersao === Util.VERSAO_ATUAL){
        this.navCtrl.push(HomePage);
        this.armazenarInformacoesDoUsuario();
    //   }else{
    //     this.mensagem.mensagemAlerta("Atenção", "O aplicativo encontra-se desatualizado. Favor realizar atualização!");
    //   }
    // },
    // (erro) =>{
    //   this.mensagem.erroAlerta("Atenção", erro);      
    // });
  }

  private carregarInformacoesDoUsuario() {
    this.storage.get("lembrarUsuario").then((lembrar) => {
      this.lembrarUsuario = lembrar;
    });
    this.storage.get("usuario").then((usuario) => {
      this.user = usuario;
    });
  }
}
