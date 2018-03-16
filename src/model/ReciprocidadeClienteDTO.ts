import { ReciprocidadeClienteAssociadoDTO } from "./ReciprocidadeClienteAssociadoDTO";
import { ReciprocidadeClienteContaCorrenteDTO } from "./ReciprocidadeClienteContaCorrenteDTO";
import { ReciprocidadeClienteSaldoMedioCCDTO } from "./ReciprocidadeClienteSaldoMedioCCDTO";
import { ReciprocidadeClienteAplicacaoDTO } from "./ReciprocidadeClienteAplicacaoDTO";
import { ReciprocidadeClienteCobrancaDTO } from "./ReciprocidadeClienteCobrancaDTO";
import { ReciprocidadeClienteSaldoProcapCredDTO } from "./ReciprocidadeClienteSaldoProcapCredDTO";

export class ReciprocidadeClienteDTO {

    private reciprocidadeClienteAssociadoDTO:ReciprocidadeClienteAssociadoDTO;
    private reciprocidadeClienteContaCorrenteDTO:ReciprocidadeClienteContaCorrenteDTO;
    private reciprocidadeClienteSaldoMedioCCDTO:ReciprocidadeClienteSaldoMedioCCDTO;
    private reciprocidadeClienteAplicacaoDTO:ReciprocidadeClienteAplicacaoDTO;
    private reciprocidadeClienteCobrancaDTO:ReciprocidadeClienteCobrancaDTO;
    private reciprocidadeClienteSaldoProcapCredDTO:ReciprocidadeClienteSaldoProcapCredDTO;

    public getReciprocidadeClienteAssociadoDTO():ReciprocidadeClienteAssociadoDTO {
        return this.reciprocidadeClienteAssociadoDTO;
    }

    public setReciprocidadeClienteAssociadoDTO(reciprocidadeClienteAssociadoDTO: ReciprocidadeClienteAssociadoDTO) {
        this.reciprocidadeClienteAssociadoDTO = reciprocidadeClienteAssociadoDTO;
    }

    public getReciprocidadeClienteContaCorrenteDTO():ReciprocidadeClienteContaCorrenteDTO {
        return this.reciprocidadeClienteContaCorrenteDTO;
    }

    public setReciprocidadeClienteContaCorrenteDTO(reciprocidadeClienteContaCorrenteDTO: ReciprocidadeClienteContaCorrenteDTO) {
        this.reciprocidadeClienteContaCorrenteDTO = reciprocidadeClienteContaCorrenteDTO;
    }

    public getReciprocidadeClienteSaldoMedioCCDTO():ReciprocidadeClienteSaldoMedioCCDTO {
        return this.reciprocidadeClienteSaldoMedioCCDTO;
    }

    public setReciprocidadeClienteSaldoMedioCCDTO(reciprocidadeClienteSaldoMedioCCDTO: ReciprocidadeClienteSaldoMedioCCDTO) {
        this.reciprocidadeClienteSaldoMedioCCDTO = reciprocidadeClienteSaldoMedioCCDTO;
    }

    public getReciprocidadeClienteAplicacaoDTO():ReciprocidadeClienteAplicacaoDTO {
        return this.reciprocidadeClienteAplicacaoDTO;
    }

    public setReciprocidadeClienteAplicacaoDTO(reciprocidadeClienteAplicacaoDTO: ReciprocidadeClienteAplicacaoDTO) {
        this.reciprocidadeClienteAplicacaoDTO = reciprocidadeClienteAplicacaoDTO;
    }

    public getReciprocidadeClienteCobrancaDTO():ReciprocidadeClienteCobrancaDTO {
        return this.reciprocidadeClienteCobrancaDTO;
    }

    public setReciprocidadeClienteCobrancaDTO(reciprocidadeClienteCobrancaDTO: ReciprocidadeClienteCobrancaDTO) {
        this.reciprocidadeClienteCobrancaDTO = reciprocidadeClienteCobrancaDTO;
    }

    public getReciprocidadeClienteSaldoProcapCredDTO():ReciprocidadeClienteSaldoProcapCredDTO {
        return this.reciprocidadeClienteSaldoProcapCredDTO;
    }

    public setReciprocidadeClienteSaldoProcapCredDTO(reciprocidadeClienteSaldoProcapCredDTO: ReciprocidadeClienteSaldoProcapCredDTO) {
        this.reciprocidadeClienteSaldoProcapCredDTO = reciprocidadeClienteSaldoProcapCredDTO;
    }
}