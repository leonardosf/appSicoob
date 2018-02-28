import { Directive, Attribute } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CpfFormatador } from '../../formatador/cpf.formatador';
import { CnpjFormatador } from '../../formatador/cnpj.formatador';

@Directive({
  selector: '[mascara]',
      host: {
          '(keyup)': 'onInputChange($event)'
      },
      providers: [NgModel]
})

export class MascaraDirective{
  private tipo

  constructor(public model: NgModel, @Attribute('mascara') tipo: string) {
    this.tipo = tipo;
  }

  onInputChange(event) {
    let valorLimpo = event.target.value.replace(/[^\d]+/g,'');

    if('CPF' == this.tipo){
      this.model.update.emit(CpfFormatador.formatarIncompleto(valorLimpo));
      return;
    }
    if('CNPJ' == this.tipo){
      this.model.update.emit(CnpjFormatador.formatarIncompleto(valorLimpo));
      return;
    }

    if('CPF-CNPJ' == this.tipo){
      if(valorLimpo.length <= 11){
        this.model.update.emit(CpfFormatador.formatarIncompleto(valorLimpo));
      }else{
        this.model.update.emit(CnpjFormatador.formatarIncompleto(valorLimpo));
      }
      return;
    }

    if('MONETARIO' == this.tipo){
      if (!valorLimpo) {
        this.model.update.emit(valorLimpo);
        return;
      }
      let v  = valorLimpo+'e-2';
      let numero = Number(v);
      if (numero>0) {
        v = numero.toLocaleString('pt-BR', {minimumFractionDigits:2});
      } else {
        v = '';
      }
      this.model.update.emit(v);
      return;
    }

    if('MONETARIO-LSE' == this.tipo){
      if (!valorLimpo) {
        this.model.update.emit(valorLimpo);
        return;
      }
      let v  = valorLimpo+'e-2';
      let numero = Number(v);
     
      v = numero.toLocaleString('pt-BR', {minimumFractionDigits:2});
     
      this.model.update.emit(v);
      return;
    }

    if('TELEFONE' == this.tipo){
      let telefone = valorLimpo.replace(/(\d{2})(\d{4,5})(\d{4})$/,"($1) $2-$3");

      this.model.update.emit(telefone);
      return;
    }

  }
}
