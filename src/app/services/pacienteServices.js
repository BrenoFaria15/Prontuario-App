import ApiService from "../apiservice";


class PacienteService extends ApiService{
    constructor(){
        super('/api/pacientes')
    }
   
    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    salvar(paciente){
        return this.post('/',paciente)
    }

    buscarTodos(){
        return this.get('/all');
    }

    atualizar(paciente){
        return this.put('/'+paciente.id_paciente,paciente)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

}

export default PacienteService