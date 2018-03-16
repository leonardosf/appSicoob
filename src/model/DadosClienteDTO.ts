import { DadosClientePessoaFisicaDTO } from "./DadosClientePessoaFisicaDTO";
import { DadosClienteConjugeDTO } from "./DadosClienteConjugeDTO";
import { DadosClienteInfCadasPositivasDTO } from "./DadosClienteInfCadasPositivasDTO";
import { DadosClienteRespDiretaDTO } from "./DadosClienteRespDiretaDTO";
import { DadosClienteRespIndiretaDTO } from "./DadosClienteRespIndiretaDTO";
import { DadosClienteRespContaCorrenteDTO } from "./DadosClienteRespContaCorrenteDTO";

export class DadosClienteDTO {

    private dadosClientePessoaFisicaDTO:DadosClientePessoaFisicaDTO;
    private dadosClienteConjugeDTO:DadosClienteConjugeDTO;
    private dadosClienteInfCadasPositivasDTO:DadosClienteInfCadasPositivasDTO;
    private dadosClienteRespDiretaDTO:Array<DadosClienteRespDiretaDTO>;
    private dadosClienteRespIndiretaDTO:Array<DadosClienteRespIndiretaDTO>;
    private dadosClienteRespContaCorrenteDTO:DadosClienteRespContaCorrenteDTO;


    public getDadosClientePessoaFisicaDTO(): DadosClientePessoaFisicaDTO {
        return this.dadosClientePessoaFisicaDTO;
    }

    public setDadosClientePessoaFisicaDTO(dadosClientePessoaFisicaDTO : DadosClientePessoaFisicaDTO) {
        this.dadosClientePessoaFisicaDTO = dadosClientePessoaFisicaDTO;
    }

    public getDadosClienteConjugeDTO(): DadosClienteConjugeDTO {
        return this.dadosClienteConjugeDTO;
    }

    public setDadosClienteConjugeDTO(dadosClienteConjugeDTO : DadosClienteConjugeDTO) {
        this.dadosClienteConjugeDTO = dadosClienteConjugeDTO;
    }

    public getDadosClienteInfCadasPositivasDTO(): DadosClienteInfCadasPositivasDTO {
        return this.dadosClienteInfCadasPositivasDTO;
    }

    public setDadosClienteInfCadasPositivasDTO(dadosClienteInfCadasPositivasDTO : DadosClienteInfCadasPositivasDTO) {
        this.dadosClienteInfCadasPositivasDTO = dadosClienteInfCadasPositivasDTO;
    }

    public getDadosClienteRespDiretaDTO(): Array<DadosClienteRespDiretaDTO> {
        return this.dadosClienteRespDiretaDTO;
    }

    public setDadosClienteRespDiretaDTO(dadosClienteRespDiretaDTO : Array<DadosClienteRespDiretaDTO>) {
        this.dadosClienteRespDiretaDTO = dadosClienteRespDiretaDTO;
    }
    
    public getDadosClienteRespIndiretaDTO(): Array<DadosClienteRespIndiretaDTO> {
        return this.dadosClienteRespIndiretaDTO;
    }

    public setDadosClienteRespIndiretaDTO(dadosClienteRespIndiretaDTO : Array<DadosClienteRespIndiretaDTO>) {
        this.dadosClienteRespIndiretaDTO = dadosClienteRespIndiretaDTO;
    }

    public getDadosClienteRespContaCorrenteDTO(): DadosClienteRespContaCorrenteDTO {
        return this.dadosClienteRespContaCorrenteDTO;
    }

    public setDadosClienteRespContaCorrenteDTO(dadosClienteRespContaCorrenteDTO : DadosClienteRespContaCorrenteDTO) {
        this.dadosClienteRespContaCorrenteDTO = dadosClienteRespContaCorrenteDTO;
    }
}