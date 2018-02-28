import { ErrorHandler } from '@angular/core';
import { MensagemServicoProvider } from '../providers/mensagem.servico';
import { App } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

export class MicrocreditoErrorHandler implements ErrorHandler {
    constructor(private app: App, private mensagem: MensagemServicoProvider) {
    }

    handleError(err: any): void {
        console.log(err);
        this.mensagem.erroAlerta('Atenção', err);
        if(err.status == 401){
            this.app.getRootNav().setPages([
                { page: LoginPage }
            ]);
            this.app.getActiveNav().popToRoot();
        }
    }
  }