var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
import { MensagemServicoProvider } from './mensagem.servico';
var ConexaoServicoProvider = /** @class */ (function () {
    function ConexaoServicoProvider(network, mensagem) {
        this.network = network;
        this.mensagem = mensagem;
        this.conectado = true;
    }
    ConexaoServicoProvider.prototype.registrarServicoConexao = function () {
        var _this = this;
        this.network.onConnect().subscribe(function () {
            if (!_this.conectado) {
                _this.mensagem.mensagemToast('Conexão estabelecida.');
            }
            _this.conectado = true;
        });
        this.network.onDisconnect().subscribe(function () {
            if (_this.conectado) {
                _this.mensagem.mensagemToast('Sem conexão com a internet.');
            }
            _this.conectado = false;
        });
    };
    ConexaoServicoProvider.prototype.isConectado = function () {
        return this.conectado;
    };
    ConexaoServicoProvider.prototype.getTipoConexao = function () {
        return this.network.type;
    };
    ConexaoServicoProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Network, MensagemServicoProvider])
    ], ConexaoServicoProvider);
    return ConexaoServicoProvider;
}());
export { ConexaoServicoProvider };
//# sourceMappingURL=conexao.servico.js.map