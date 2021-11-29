import LocalStorageService from "./localStorageService";



export default class  AuthService{

    static isUsuarioAutenticado(){
        const usuario =LocalStorageService.obterItem('_usuario_logado');

        return usuario && usuario.id_usuario;
    }

    static isPacienteAutenticado(){
        const paciente =LocalStorageService.obterItem('_paciente_logado');
        return paciente && paciente.id_paciente
    }

    static removerUsuarioLogado(){
        LocalStorageService.removerItem('_usuario_logado');
        LocalStorageService.removerItem('_unidade_logada');
        LocalStorageService.removerItem('_ultima_consulta');
    }

    static removerPacienteLogado(){
        LocalStorageService.removerItem('_paciente_logado')
    }


}