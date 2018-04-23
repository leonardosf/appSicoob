var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { LoadingController } from 'ionic-angular';
import { ConexaoServicoProvider } from '../providers/conexao.servico';
import 'rxjs/Rx';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import { Configuracoes } from '../providers/configuracao/configuracoes';
var HttpInterceptor = /** @class */ (function (_super) {
    __extends(HttpInterceptor, _super);
    //private time1;
    //private time2;
    function HttpInterceptor(backend, defaultOptions, loadingCtrl, conexao) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.loadingCtrl = loadingCtrl;
        _this.conexao = conexao;
        _this.requestsPendentes = 0;
        return _this;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.interceptor(_super.prototype.request.call(this, url, options));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        return this.interceptor(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        return this.interceptor(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        return this.interceptor(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        return this.interceptor(_super.prototype.delete.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.head = function (url, options) {
        return this.interceptor(_super.prototype.head.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (options.headers.get('Content-Type') == null) {
            options.headers.append('Content-Type', 'application/json');
        }
        //Token de autorizacao
        if (options.headers.get('Authorization') == null) {
            options.headers.append('Authorization', 'Bearer ' + Configuracoes.getAccessToken());
        }
        return options;
    };
    HttpInterceptor.prototype.interceptor = function (response) {
        var _this = this;
        if (!this.conexao.isConectado()) {
            var erro = new Object();
            erro.status = 600;
            return Observable.throw(erro);
        }
        this.carregando();
        return response
            .finally(function () {
            _this.removerCarregando();
        });
    };
    HttpInterceptor.prototype.carregando = function () {
        this.requestsPendentes++;
        if (this.loading != null) {
            return null;
        }
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        /*this.time1 = setTimeout(() => {
            alert('Tentando');
            clearInterval(this.time1);
        }, 20000);

        this.time2 = setTimeout(() => {
            alert('Tentando 2');
            clearInterval(this.time2);
        }, 40000);*/
    };
    HttpInterceptor.prototype.removerCarregando = function () {
        this.requestsPendentes--;
        if (this.loading != null && this.requestsPendentes == 0) {
            this.loading.dismiss();
            this.loading = null;
        }
        //clearInterval(this.time1);
        //clearInterval(this.time2);
    };
    HttpInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ConnectionBackend, RequestOptions,
            LoadingController, ConexaoServicoProvider])
    ], HttpInterceptor);
    return HttpInterceptor;
}(Http));
export { HttpInterceptor };
//# sourceMappingURL=http.interceptor.js.map