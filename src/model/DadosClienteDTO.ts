import { DadosClientePessoaFisicaDTO } from "./DadosClientePessoaFisicaDTO";
import { DadosClienteConjugeDTO } from "./DadosClienteConjugeDTO";
import { DadosClienteInfCadastraisPositivasDTO } from "./DadosClienteInfCadastraisPositivasDTO";
import { DadosClienteRespDiretaDTO } from "./DadosClienteRespDiretaDTO";
import { DadosClienteRespIndiretaDTO } from "./DadosClienteRespIndiretaDTO";
import { DadosClienteResponsabilidadeDTO } from "./DadosClienteResponsabilidadeDTO";

export class DadosClienteDTO {

    private dadosClientePessoaFisicaDTO:DadosClientePessoaFisicaDTO;
    private dadosClienteConjugeDTO:DadosClienteConjugeDTO;
    private dadosClienteInfCadastraisPositivasDTO:DadosClienteInfCadastraisPositivasDTO;
    private dadosClienteRespDiretaDTO:DadosClienteRespDiretaDTO;
    private dadosClienteRespIndiretaDTO:DadosClienteRespIndiretaDTO;
    private dadosClienteResponsabilidadeDTO:DadosClienteResponsabilidadeDTO;


    public getDadosClientePessoaFisicaDTO(): DadosClientePessoaFisicaDTO {
        return this.dadosClientePessoaFisicaDTO;
    }

    public setDadosClientePessoaFisicaDTO(dadosClientePessoaFisicaDTO:DadosClientePessoaFisicaDTO) {
        this.dadosClientePessoaFisicaDTO = dadosClientePessoaFisicaDTO;
    }

    public getDadosClienteConjugeDTO(): DadosClienteConjugeDTO {
        return this.dadosClienteConjugeDTO;
    }

    public setDadosClienteConjugeDTO(dadosClienteConjugeDTO:DadosClienteConjugeDTO) {
        this.dadosClienteConjugeDTO = dadosClienteConjugeDTO;
    }

    public getDadosClienteInfCadastraisPositivasDTO(): DadosClienteInfCadastraisPositivasDTO {
        return this.dadosClienteInfCadastraisPositivasDTO;
    }

    public setDadosClienteInfCadastraisPositivasDTO(dadosClienteInfCadastraisPositivasDTO:DadosClienteInfCadastraisPositivasDTO) {
        this.dadosClienteInfCadastraisPositivasDTO = dadosClienteInfCadastraisPositivasDTO;
    }

    public getDadosClienteRespDiretaDTO(): DadosClienteRespDiretaDTO {
        return this.dadosClienteRespDiretaDTO;
    }

    public setDadosClienteRespDiretaDTO(dadosClienteRespDiretaDTO:DadosClienteRespDiretaDTO) {
        this.dadosClienteRespDiretaDTO = dadosClienteRespDiretaDTO;
    }

    public getDadosClienteRespIndiretaDTO(): DadosClienteRespIndiretaDTO {
        return this.dadosClienteRespIndiretaDTO;
    }

    public setDadosClienteRespIndiretaDTO(dadosClienteRespIndiretaDTO:DadosClienteRespIndiretaDTO) {
        this.dadosClienteRespIndiretaDTO = dadosClienteRespIndiretaDTO;
    }

    public getDadosClienteResponsabilidadeDTO(): DadosClienteResponsabilidadeDTO {
        return this.dadosClienteResponsabilidadeDTO;
    }

    public setDadosClienteResponsabilidadeDTO(dadosClienteResponsabilidadeDTO:DadosClienteResponsabilidadeDTO) {
        this.dadosClienteResponsabilidadeDTO = dadosClienteResponsabilidadeDTO;
    }
}