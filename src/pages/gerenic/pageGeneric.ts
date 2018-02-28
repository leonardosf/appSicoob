import { TomadorLSE } from "../../model/TomadorLSE";

export class PageGeneric {

    public tomador:TomadorLSE;

    getTomador():TomadorLSE {

        this.tomador = new TomadorLSE();
        this.tomador.idPessoa = 1;
        this.tomador.nomePessoa = 'Carlos Costa';
        this.tomador.numCpfCnpj = '999.999.999-99';
        return this.tomador;
    }

}