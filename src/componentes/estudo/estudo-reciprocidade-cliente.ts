import { Component, Input } from "@angular/core";
import { ReciprocidadeClienteDTO } from "../../model/ReciprocidadeClienteDTO";

@Component({
    selector: 'reciprocidadeCliente',
    templateUrl: 'estudo-reciprocidade-cliente.html'

})

export class EstudoReciprocidadeCliente {
    @Input()
    private dto: ReciprocidadeClienteDTO;

    constructor() {

    }


}