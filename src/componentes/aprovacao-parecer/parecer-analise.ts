import { Component, Input } from "@angular/core";
import { ParecerAnaliseTecnicaDTO } from "../../model/ParecerAnaliseTecnicaDTO";

@Component({
    selector: 'parecerAnalise',
    templateUrl: 'parecer-analise.html'
})

export class ParecerAnalisePage {

    @Input()
    private dto:ParecerAnaliseTecnicaDTO;

    constructor() {
        
    }
}