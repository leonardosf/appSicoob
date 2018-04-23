import { LoginPage } from '../pages/login/login';
var MicrocreditoErrorHandler = /** @class */ (function () {
    function MicrocreditoErrorHandler(app, mensagem) {
        this.app = app;
        this.mensagem = mensagem;
    }
    MicrocreditoErrorHandler.prototype.handleError = function (err) {
        console.log(err);
        this.mensagem.erroAlerta('Atenção', err);
        if (err.status == 401) {
            this.app.getRootNav().setPages([
                { page: LoginPage }
            ]);
            this.app.getActiveNav().popToRoot();
        }
    };
    return MicrocreditoErrorHandler;
}());
export { MicrocreditoErrorHandler };
//# sourceMappingURL=microcreditoErrorHandler.js.map