import { TomadorLSE } from './TomadorLSE';
import { ClassificacaoLse } from './ClassificacaoLse';

export class CapacidadePagamento{
    public tomador:TomadorLSE;
    public idRegistroSolicitacao:number;
    public classificacao:ClassificacaoLse;
	public idOperacao:number;
}