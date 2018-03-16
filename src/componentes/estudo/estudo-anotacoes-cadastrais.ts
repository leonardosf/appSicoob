import { Component, Input } from "@angular/core";
import { AnotacoesCadastraisDTO } from "../../model/AnotacoesCadastraisDTO";

@Component({
    selector: 'anotacoesCadastrais',
    templateUrl: 'estudo-anotacoes-cadastrais.html'
})

export class EstudoAnotacoesCadastrais {
    @Input()
    private dto:AnotacoesCadastraisDTO;

    constructor() {
        
    }

}