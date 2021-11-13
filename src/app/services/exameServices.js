import ApiService from "../apiservice";


class ExameService extends ApiService{
    constructor(){
        super('/api/exames')
    }
   
    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    salvar(exame){
        return this.post('/',exame)
    }

    buscarTodos(){
        return this.get('/all');
    }

    atualizar(exame){
        return this.put('/'+exame.id_exame,exame)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

}

export default ExameService