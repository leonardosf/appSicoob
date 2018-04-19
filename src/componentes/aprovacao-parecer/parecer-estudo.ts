import { Component, Input } from "@angular/core";
import { ParecerEstudoDTO } from "../../model/ParecerEstudoDTO";

@Component({
    selector: 'parecerEstudo',
    templateUrl: 'parecer-estudo.html'
})

export class ParecerEstudoPage {

    @Input()
    private dto:ParecerEstudoDTO;

    constructor() {
        
    }
}