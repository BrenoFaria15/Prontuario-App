import React from "react";
import ApiService from "../apiservice";

class AtendimentoService extends ApiService{

    constructor(){
        super('/api/atendimentos')
    }

    consultar(atendimentoFiltro){

        let params = `?data=${atendimentoFiltro.data}`

        if(atendimentoFiltro.idPaciente){
            params=`${params}&idPaciente=${atendimentoFiltro.idPaciente}`
        }
        if(atendimentoFiltro.idProfissional){
            params=`${params}&idProfissional=${atendimentoFiltro.idProfissional}`
        }
    
        return this.get(params)
    }
    
    salvar(atendimento){
        return this.post('/',atendimento)
    }
    

}
export default AtendimentoService