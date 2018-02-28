import { Injectable} from "@angular/core";
import { TomadorLSE } from "../model/TomadorLSE";
import 'rxjs/add/operator/map';

@Injectable()
export class PageGeneric {

    public tomador:TomadorLSE;
    faseAtualProposta:String;

    constructor() {
        
    }

    getTomador():TomadorLSE {

        this.tomador = new TomadorLSE();
        this.tomador.idPessoa = 1;
        this.tomador.nomePessoa = 'Carlos Costa';
        this.tomador.numCpfCnpj = '999.999.999-99';
        return this.tomador;
    }

    public setFaseAtualProposta(fase:String) {
        this.faseAtualProposta = fase;
    }

    public getFaseAtualProposta():String {
        return this.faseAtualProposta;
    }


}