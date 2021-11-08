import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import UnidadeService from "../app/services/unidadeServices";
import {withRouter} from 'react-router-dom'
import {mensagemErro,mensagemOk } from "../components/toastr"

class ListaUnidades extends React.Component {

    state ={
        unidades:[]
    }

    constructor(){
        super();
        this.service = new UnidadeService();
    }

    componentDidMount(){
        this.getUnidades();
    }

    excluir(id){
        this.service.deletar(id).then(
          response =>{
              this.props.history.push('/unidades');
              mensagemOk('Unidade Excluida com sucesso');
              this.getUnidades();
          }
        ).catch(error => {
            mensagemErro(error.response.data)
        })  
    }      


    getUnidades(){
        this.service.buscarTodos().then(
            (response) =>
               this.setState({unidades:response.data}));
               
    }

    prepareCadastrar= () =>{
        this.props.history.push('/unidades/cadastro/_add')


    }

    editar(id){
        this.props.history.push("/unidades/cadastro/"+id);
     }

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Unidades</legend>
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
                                    <th scope="col">Nome Fantasia</th>
                                    <th scope="col">CNES</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            { this.state.unidades.map(
                                    unidade =>
                                <tr className="table-primary">
                                    <th scope="row">{unidade.id_unidade}</th>
                                    <td>{unidade.nomeFantasia}</td>
                                    <td>{unidade.cnes}</td>
                                    <td>{unidade.telefone}</td>
                                    <td>
                                    <button type="button" className="btn btn-warning btn-space"
                                        onClick={() =>this.editar(unidade.id_unidade)}>Editar</button>
                                        <button type="button" className="btn btn-danger btn-space"
                                        onClick={() =>this.excluir(unidade.id_unidade)}>Excluir</button>
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

export default withRouter (ListaUnidades)