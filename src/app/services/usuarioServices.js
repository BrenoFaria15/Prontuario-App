import axios from "axios";
import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
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

    atualizar(usuario){
        return this.put('/',usuario)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }
}

export default UsuarioService