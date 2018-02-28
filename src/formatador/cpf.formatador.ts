export class CpfFormatador{
  static formatar(valor:string) : string{
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/,"$1.$2.$3-$4");
  }

  static formatarIncompleto(valor:string) : string{
    if(valor.length >3 && valor.length <= 6){
      return valor.replace(/(\d{3})(\d{1,3})$/,"$1.$2");
    }
    if(valor.length >6 && valor.length <= 9){
      return valor.replace(/(\d{3})(\d{3})(\d{1,3})$/,"$1.$2.$3");
    }

    if(valor.length == 10){
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/,"$1.$2.$3-$4");
    }

    return CpfFormatador.formatar(valor);
  }
}
