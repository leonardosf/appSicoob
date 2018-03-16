import { AnalisesDiversasCapPagAnualEntidadeDTO } from "./AnalisesDiversasCapPagAnualEntidadeDTO";
import { AnalisesDiversasCapPagAnualSCRDTO } from "./AnalisesDiversasCapPagAnualSCRDTO";
import { AnalisesDiversasEndividamentoEntBanDTO } from "./AnalisesDiversasEndividamentoEntBanDTO";
import { AnalisesDiversasEndividamentoSCRDTO } from "./AnalisesDiversasEndividamentoSCRDTO";

export class AnalisesDiversasDTO {

    private analisesDiversasCapPagAnualEntidadeDTO:AnalisesDiversasCapPagAnualEntidadeDTO;
    private analisesDiversasCapPagAnualSCRDTO:AnalisesDiversasCapPagAnualSCRDTO;
    private analisesDiversasEndividamentoEntBanDTO:AnalisesDiversasEndividamentoEntBanDTO;
    private analisesDiversasEndividamentoSCRDTO:AnalisesDiversasEndividamentoSCRDTO;

    public getAnalisesDiversasCapPagAnualEntidadeDTO():AnalisesDiversasCapPagAnualEntidadeDTO {
        return this.analisesDiversasCapPagAnualEntidadeDTO;
    }

    public setAnalisesDiversasCapPagAnualEntidadeDTO(analisesDiversasCapPagAnualEntidadeDTO:AnalisesDiversasCapPagAnualEntidadeDTO) {
        this.analisesDiversasCapPagAnualEntidadeDTO = analisesDiversasCapPagAnualEntidadeDTO;
    }

    public getAnalisesDiversasCapPagAnualSCRDTO():AnalisesDiversasCapPagAnualSCRDTO {
        return this.analisesDiversasCapPagAnualSCRDTO;
    }

    public setAnalisesDiversasCapPagAnualSCRDTO(analisesDiversasCapPagAnualSCRDTO:AnalisesDiversasCapPagAnualSCRDTO) {
        this.analisesDiversasCapPagAnualSCRDTO = analisesDiversasCapPagAnualSCRDTO;
    }

    public getAnalisesDiversasEndividamentoEntBanDTO():AnalisesDiversasEndividamentoEntBanDTO {
        return this.analisesDiversasEndividamentoEntBanDTO;
    }

    public setAnalisesDiversasEndividamentoEntBanDTO(analisesDiversasEndividamentoEntBanDTO:AnalisesDiversasEndividamentoEntBanDTO) {
        this.analisesDiversasEndividamentoEntBanDTO = analisesDiversasEndividamentoEntBanDTO;
    }

    public getAnalisesDiversasEndividamentoSCRDTO():AnalisesDiversasEndividamentoSCRDTO {
        return this.analisesDiversasEndividamentoSCRDTO;
    }

    public setAnalisesDiversasEndividamentoSCRDTO(analisesDiversasEndividamentoSCRDTO:AnalisesDiversasEndividamentoEntBanDTO) {
        this.analisesDiversasEndividamentoSCRDTO = analisesDiversasEndividamentoSCRDTO;
    }

}