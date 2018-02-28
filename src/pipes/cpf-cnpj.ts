import { Pipe, PipeTransform } from '@angular/core';
import { CpfFormatador } from '../formatador/cpf.formatador';
import { CnpjFormatador } from '../formatador/cnpj.formatador';

@Pipe({
  name: 'cpfcnpj',
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value, args: any[]) {
    if(!value){
      return;
    }

    if(value.length == 11){
      return CpfFormatador.formatar(value);
    }
    if(value.length == 14){
      return CnpjFormatador.formatar(value);
    }
  }
}
