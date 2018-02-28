import { Pergunta } from './Pergunta';

export class Questionario{
  id:any;
  idTomador:Number;
  idAgente:Number;
  tipoContrato:Number;
  formularioVersao:string;
  numVersao:number;
  idInstituicao:number;
  idUnidadeInstituicao:number;
  cooperativa:number;
  perguntas:Array<Pergunta>;
  idOperacao:number;
  tipoPessoa:Number;
  loginAgente:String;
  tomadorAssociado:boolean;
}
