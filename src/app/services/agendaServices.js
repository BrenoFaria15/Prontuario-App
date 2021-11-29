import ApiService from "../apiservice";


class AgendaServices extends ApiService{

    constructor(){
        super('/api/agenda')
    }

    salvar(agenda){
        return this.post('/',agenda)
    }

    atualizar(agenda){
        return this.put('/'+agenda.id_agenda,agenda)
    }

    atualizarPreseca(agenda){
        return this.put('/alterarpresenca/'+agenda.id_agenda,agenda)
    }

    buscarPorId(id){
        return this.getPorId('/buscarporid/'+id)
    }

    deletar(id){
        return this.delete('/'+id)
    }

    buscarPorData(data){
        return this.getPorId('/buscarpordata/'+data)
    }

    buscarPorPaciente(id){
        return this.getPorId('/buscarporpaciente/'+id)
    }

}


export default AgendaServices