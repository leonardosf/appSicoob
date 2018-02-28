import { Operacao } from './Operacao';
import { AgenteDTO } from './AgenteDTO';

export class MensagemDTO{
    
	public idMensagem:number;	
	/** **/
	public idInstituicao:number;
	/** **/
	public idUnidadeInst:number;
	/** **/
	public operacao:Operacao;
	/** **/
	public descMensagem:string;
	/** **/
	public dataHoraInclusao:Date ;
	/** **/
	public idUsuario:string;
    /** **/
    public bolLido:boolean;
	/** **/
	public bolExcluido:boolean;

	public agente:AgenteDTO;

	
}