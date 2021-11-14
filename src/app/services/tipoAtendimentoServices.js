import ApiService from "../apiservice";

class TipoAtendimentoService extends ApiService{
    constructor(){
        super('/api/tipoatendimentos')
    }
   
    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    salvar(tipoAtendimento){
        return this.post('/',tipoAtendimento)
    }

    buscarTodos(){
        return this.get('/all');
    }

    atualizar(tipoAtendimento){
        return this.put('/'+tipoAtendimento.id_tipo_atendimento,tipoAtendimento)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

}

export default TipoAtendimentoService