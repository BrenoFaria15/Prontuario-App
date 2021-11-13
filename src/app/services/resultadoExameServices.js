import ApiService from "../apiservice";


class ResultadoExameService extends ApiService{
    constructor(){
        super('/api/resultadoexames')
    }
   
 

    salvar(resultado){
        return this.post('/',resultado)
    }

    buscarTodos(){
        return this.get('/all');
    }

    atualizar(resultado){
        return this.put('/'+resultado.id_resultado)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

}

export default ResultadoExameService


