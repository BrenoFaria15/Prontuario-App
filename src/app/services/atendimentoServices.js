import React from "react";
import ApiService from "../apiservice";

class AtendimentoService extends ApiService{

    constructor(){
        super('/api/atendimentos')
    }

    consultar(atendimentoFiltro){

        let params = `?data=${atendimentoFiltro.data}`

        if(atendimentoFiltro.nomePaciente){
            params=`${params}&nomePaciente=${atendimentoFiltro.nomePaciente}`
        }
        if(atendimentoFiltro.nomeProfissional){
            params=`${params}&nomeProfissional=${atendimentoFiltro.nomeProficional}`
        }
        if(atendimentoFiltro.cpf){
            params=`${params}&cpf=${atendimentoFiltro.cpf}`
        }
        return this.get(params)
    }
   
    

}
export default AtendimentoService