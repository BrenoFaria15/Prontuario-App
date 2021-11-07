import axios from "axios";
import ApiService from "../apiservice";

class UnidadeService extends ApiService{
    constructor(){
        super('/api/unidades')
    }
   
    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    salvar(usuario){
        return this.post('/',usuario)
    }

    buscarTodos(){
        return this.get('/all');
    }

    atualizar(unidade){
        return this.put('/'+unidade.id_unidade,unidade)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

}

export default UnidadeService