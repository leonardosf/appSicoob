import { Component, Input } from "@angular/core";
import { AnalisesDiversasDTO } from "../../model/AnalisesDiversasDTO";

@Component({
    selector: 'analisesDiversas',
    templateUrl: 'estudo-analises-diversas.html'
})

export class EstudoAnalisesDiversas {

    @Input()
    private dto:AnalisesDiversasDTO;

    constructor() {

    }
}