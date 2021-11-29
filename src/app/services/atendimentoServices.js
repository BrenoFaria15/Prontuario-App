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
        if(atendimentoFiltro.idUnidade){
            params=`${params}&idUnidade=${atendimentoFiltro.idUnidade}`
        }
    
        return this.getPorConsulta('/buscaratendimentos',params)
    }
    
    salvar(atendimento){
        return this.post('/',atendimento)
    }

    atualizar(atendimento){
        return this.put('/'+atendimento.id_atendimento,atendimento)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

    buscarPorPaciente(id){
        return this.getPorId('/buscarporpaciente/'+id)
    }
    

}
export default AtendimentoService