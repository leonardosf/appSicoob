import { Injectable } from '@angular/core';
import { Http, } from '@angular/http';
import 'rxjs/add/operator/map';
import { Imagem } from '../../model/Imagem';
import {ParamPath, Paths} from '../../app/paths';

@Injectable()
export class DocumentoServico {

  constructor(private http: Http) {
  }

  public carregar(imagem:Imagem){
    if(imagem.isNovaImagem() || imagem.carregada){
      return;
    }
    imagem.source = null;

    let param:ParamPath = ParamPath.parametro('idImagem', imagem.idImagem.toString());

    this.http.get(Paths.getURL(Paths.IMAGENS, param))
      .map(res => res.json())
      .subscribe(
        (img) => {
          imagem.source = img.source;
          imagem.carregada=true;
        }
      );
  }

}
