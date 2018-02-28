import { Alternativa } from './Alternativa';

export class Pergunta{
  id:number;
  selecionada:Alternativa;
  descricao:string;
  tipo:string;
  alternativas:Array<Alternativa>;
  resposta:string;
  preenchido:any;
  
  idCampoAssuntoFormularioVersao:Number;

  showDetails:boolean = false;
  icon: string = "arrow-forward";
  cssClass:string;
  formularioVersao:Number;
  numVersao:Number;
  idFormulario:Number;
  
  quantidadeCaracteres:string;
  
}
