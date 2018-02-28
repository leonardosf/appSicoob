import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { LoadingController } from 'ionic-angular';
import { ConexaoServicoProvider } from '../providers/conexao.servico';
import 'rxjs/Rx';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import { Configuracoes } from '../providers/configuracao/configuracoes';

@Injectable()
export class HttpInterceptor extends Http {
    private loading;
    private requestsPendentes:number = 0;
    //private time1;
    //private time2;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
            private loadingCtrl: LoadingController, private conexao: ConexaoServicoProvider) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.interceptor(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.interceptor(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.interceptor(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.interceptor(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.interceptor(super.delete(url, this.getRequestOptionArgs(options)));
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response>{
      return this.interceptor(super.head(url, this.getRequestOptionArgs(options)));
    }


    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if(options.headers.get('Content-Type') == null){
            options.headers.append('Content-Type', 'application/json');
        }

        //Token de autorizacao
        if(options.headers.get('Authorization') == null){
            options.headers.append('Authorization', 'Bearer ' + Configuracoes.getAccessToken());
        }

        return options;
    }


    private interceptor(response:Observable<Response>):Observable<Response>{
        if(!this.conexao.isConectado()){
            let erro:any = new Object();
            erro.status=600;
            return Observable.throw(erro);
        }

        this.carregando();
        return response
                /*.timeout(60000)
                .catch(err => {
                    console.log(err.json().error);
                    if (err.name == "TimeoutError") {
                        alert('Sem resposta');
                        this.removerCarregando();
                        return Observable.never();
                    }
                    return Observable.throw(err);
                })*/
                .finally(
                    () => {
                        this.removerCarregando();
                    }
                );
    }

    private carregando(){
        this.requestsPendentes++;
        if(this.loading != null){
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
    }

    private removerCarregando(){
        this.requestsPendentes--;
        if(this.loading != null && this.requestsPendentes == 0){
            this.loading.dismiss();
            this.loading = null;
        }

        //clearInterval(this.time1);
        //clearInterval(this.time2);
    }
}
