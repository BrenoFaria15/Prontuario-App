import ApiService from "../apiservice";


class ProfissionalService extends ApiService{
    constructor(){
        super('/api/profissionais')
    }
   
    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    salvar(profissional){
        return this.post('/',profissional)
    }

    buscarTodos(){
        return this.get('/all');
    }

    atualizar(profissional){
        return this.put('/'+profissional.id_profissional,profissional)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

}

export default ProfissionalService