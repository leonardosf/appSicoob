import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string, ...args) {
     if(!value){
      return;
    }

    return value.replace(/(\d{2})(\d{4,5})(\d{4})$/,"($1) $2-$3");
  }
}
