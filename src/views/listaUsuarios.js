import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/services/usuarioServices";
import { mensagemErro,mensagemOk} from "../components/toastr"

class ListaUsuario extends React.Component {
    state ={
        usuarios:[]

    }
   constructor(){
       super();
      this.service= new UsuarioService();
       
    
   }
   
   componentDidMount(){
    this.getUsuarios();

}
    editar(id){
        this.props.history.push("/usuarios/cadastro/"+id);
     }

    prepareCadastrar= () =>{
        this.props.history.push('/usuarios/cadastro/_add')


    }

   
    getUsuarios(){
    this.service.buscarTodos().then(
         (response) =>
            this.setState({usuarios:response.data}));
            

    }

    excluir(id){
      this.service.deletar(id).then(
        response =>{
            this.props.history.push('/usuarios')
            mensagemOk('Usuario Excluido com sucesso')
            this.getUsuarios();
        }

      ).catch (
          error =>
          mensagemErro(error.response.data)
      )
  }

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Usuarios</legend>
                         <br></br>
                         <br></br>
                        <button type="button" className="btn btn-primary "
                        onClick={this.prepareCadastrar}>Novo</button>
                        <br></br>
                        <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Perfil</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.usuarios.map(
                                    usuario =>
                                <tr className="table-primary">
                                    <th scope="row">{usuario.id_usuario}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.tipoUsuario}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-space"
                                        onClick={() =>this.editar(usuario.id_usuario)}>Editar</button>
                                        <button type="button" className="btn btn-danger btn-space"
                                        onClick={() =>this.excluir(usuario.id_usuario)}>Excluir</button>
                                    </td>

                                </tr>
                                


                                )
                                }
                            </tbody>
                        </table>
                        
                    </div>

                </div>
            </div>

        )
    }
}

export default withRouter (ListaUsuario)