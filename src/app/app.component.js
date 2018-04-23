var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { Keyboard } from '@ionic-native/keyboard';
import { ConexaoServicoProvider } from '../providers/conexao.servico';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, events, _keyboard, conexao, elRef) {
        var _this = this;
        this.platform = platform;
        this.events = events;
        this._keyboard = _keyboard;
        this.conexao = conexao;
        this.elRef = elRef;
        this.rootPage = LoginPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this._keyboard.onKeyboardShow().subscribe(function () {
                document.body.classList.add('keyboard-is-open');
                _this.elRef.nativeElement.querySelectorAll('.scroll-content').forEach(function (element, index) {
                    element.style.marginBottom = 0;
                    element.style.paddingBottom = 0;
                });
                _this.elRef.nativeElement.querySelectorAll('.fixed-content').forEach(function (element, index) {
                    element.style.marginBottom = 0;
                });
            });
            _this._keyboard.onKeyboardHide().subscribe(function () {
                document.body.classList.remove('keyboard-is-open');
                _this.elRef.nativeElement.querySelectorAll('.scroll-content').forEach(function (element, index) {
                    console.log(index, element);
                    element.style.marginBottom = "60px";
                });
                _this.elRef.nativeElement.querySelectorAll('.fixed-content').forEach(function (element, index) {
                    console.log(index, element);
                    element.style.marginBottom = "60px";
                });
            });
            statusBar.styleDefault();
            splashScreen.hide();
            if (_this.platform.is('ios')) {
                _this._keyboard.disableScroll(true);
            }
            _this.conexao.registrarServicoConexao();
        });
    }
    MyApp.prototype.abrirMenu = function () {
        this.events.publish('menu:carregarUsuario');
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, Events,
            Keyboard, ConexaoServicoProvider, ElementRef])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map