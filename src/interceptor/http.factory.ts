import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { ConexaoServicoProvider } from '../providers/conexao.servico';
import { HttpInterceptor } from "./http.interceptor";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
        loadingController: LoadingController, conexaoServicoProvider: ConexaoServicoProvider): Http {
    return new HttpInterceptor(xhrBackend, requestOptions, loadingController, conexaoServicoProvider);
}
