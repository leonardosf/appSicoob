import { Component, Input } from "@angular/core";
import { DadosClienteDTO } from "../../model/DadosClienteDTO";

@Component({
    selector: 'dadoscliente',
    templateUrl: 'estudo-dados-cliente.html'
})

export class EstudoDadosCliente {
    @Input()
    private dto:DadosClienteDTO;

    constructor() {

    }
    
}