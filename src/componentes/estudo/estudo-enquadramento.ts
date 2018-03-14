import { Component, Input } from "@angular/core";
import { EnquadramentoDTO } from "../../model/EnquadramentoDTO";

@Component({
    selector: 'enquadramento',
    templateUrl: 'estudo-enquadramento.html',
})

export class EstudoEnquadramento {
    @Input()
    private dto:EnquadramentoDTO;

    ex: boolean;

    constructor() {

    }


}