import { Component, ElementRef } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { Keyboard } from '@ionic-native/keyboard';
import { ConexaoServicoProvider } from '../providers/conexao.servico';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;



  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events,
  public _keyboard: Keyboard, private conexao: ConexaoServicoProvider, private elRef:ElementRef) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      this._keyboard.onKeyboardShow().subscribe(()=>{
        document.body.classList.add('keyboard-is-open');
        this.elRef.nativeElement.querySelectorAll('.scroll-content').forEach((element, index) => {
          element.style.marginBottom = 0;
          element.style.paddingBottom = 0;
        });
        this.elRef.nativeElement.querySelectorAll('.fixed-content').forEach((element, index) => {
          element.style.marginBottom = 0;
        });

      });
      this._keyboard.onKeyboardHide().subscribe(() =>{
        document.body.classList.remove('keyboard-is-open');

        this.elRef.nativeElement.querySelectorAll('.scroll-content').forEach((element, index) => {
          console.log(index, element);
          element.style.marginBottom = "60px";

        });
        this.elRef.nativeElement.querySelectorAll('.fixed-content').forEach((element, index) => {
          console.log(index, element);
          element.style.marginBottom = "60px";
        });

      });


      statusBar.styleDefault();
      splashScreen.hide();

      if (this.platform.is('ios')) {
        this._keyboard.disableScroll(true);
      }

      this.conexao.registrarServicoConexao();
    });
  }

  public abrirMenu(){
    this.events.publish('menu:carregarUsuario');
  }
}
