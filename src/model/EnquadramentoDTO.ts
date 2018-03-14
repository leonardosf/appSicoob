import { EnquadramentoPropostaCreditoDTO } from "./EnquadramentoPropostaCreditoDTO";
import { EnquadramentoParcelamentoDTO } from "./EnquadramentoParcelamentoDTO";
import { EnquadramentoTaxasDTO } from "./EnquadramentoTaxasDTO";
import { EnquadramentoSeguroDTO } from "./EnquadramentoSeguroDTO";
import { EnquadramentoResPlanoPagamentoDTO } from "./EnquadramentoResPlanoPagamentoDTO";

export class EnquadramentoDTO{


    private enquadramentoPropostaCreditoDTO:EnquadramentoPropostaCreditoDTO;
    private enquadramentoParcelamentoDTO:EnquadramentoParcelamentoDTO;
    private enquadramentoTaxasDTO:EnquadramentoTaxasDTO;
    private enquadramentoSeguroDTO:EnquadramentoSeguroDTO;
    private enquadramentoResPlanoPagamentoDTO:EnquadramentoResPlanoPagamentoDTO;

    public getEnquadramentoPropostaCreditoDTO():EnquadramentoPropostaCreditoDTO {
        return this.enquadramentoPropostaCreditoDTO;
    }

    public setEnquadramentoPropostaCreditoDTO (enquadramentoPropostaCreditoDTO:EnquadramentoPropostaCreditoDTO) {
        this.enquadramentoPropostaCreditoDTO = enquadramentoPropostaCreditoDTO;
    }

    public getEnquadramentoParcelamentoDTO():EnquadramentoParcelamentoDTO {
        return this.enquadramentoParcelamentoDTO;
    }

    public setEnquadramentoParcelamentoDTO (enquadramentoParcelamentoDTO:EnquadramentoParcelamentoDTO) {
        this.enquadramentoParcelamentoDTO = enquadramentoParcelamentoDTO;
    }

    public getEnquadramentoTaxasDTO():EnquadramentoTaxasDTO {
        return this.enquadramentoTaxasDTO;
    }

    public setEnquadramentoTaxasDTO (enquadramentoTaxasDTO:EnquadramentoTaxasDTO) {
        this.enquadramentoTaxasDTO = enquadramentoTaxasDTO;
    }

    public getEnquadramentoSeguroDTO():EnquadramentoSeguroDTO {
        return this.enquadramentoSeguroDTO;
    }

    public setEnquadramentoSeguroDTO (enquadramentoSeguroDTO:EnquadramentoSeguroDTO) {
        this.enquadramentoSeguroDTO = enquadramentoSeguroDTO;
    }

    public getEnquadramentoResPlanoPagamentoDTO():EnquadramentoResPlanoPagamentoDTO {
        return this.enquadramentoResPlanoPagamentoDTO;
    }

    public setEnquadramentoResPlanoPagamentoDTO (enquadramentoResPlanoPagamentoDTO:EnquadramentoResPlanoPagamentoDTO) {
        this.enquadramentoResPlanoPagamentoDTO = enquadramentoResPlanoPagamentoDTO;
    }

}