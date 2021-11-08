import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import {withRouter} from 'react-router-dom'
import PacienteService from "../app/services/pacienteServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

class ListaPacientes extends React.Component {

    state ={
        pacientes:[]
    }
    constructor(){
        super();
        this.service= new PacienteService();
    }

    prepareCadastrar= () =>{
        this.props.history.push('/pacientes/cadastro/_add')
    }

    excluir(id){
        this.service.deletar(id).then(
          response =>{
              this.props.history.push('/pacientes');
              mensagemOk('Paciente Excluido com Sucesso');
              this.getPacientes();
          }
        ) .catch(error => {
            mensagemErro(error.response.data)
        }) 
    }
    
    componentDidMount(){
        this.getPacientes();
    }

    getPacientes(){
        this.service.buscarTodos().then(
            (response) =>
               this.setState({pacientes:response.data}));
    }

    editar(id){
        this.props.history.push("/pacientes/cadastro/"+id);
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Pacientes</legend>
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
                                    <th scope="col">Nome</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">CNS</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.pacientes.map(
                                    paciente =>
                                <tr className="table-primary">
                                    <th scope="row">{paciente.id_paciente}</th>
                                    <td>{paciente.nome}</td>
                                    <td>{paciente.cpf}</td>
                                    <td>{paciente.cns}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-space"
                                        onClick={() =>this.editar(paciente.id_paciente)}>Editar</button>
                                        <button type="button" className="btn btn-danger btn-space"
                                        onClick={() =>this.excluir(paciente.id_paciente)}>Excluir</button>
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

export default withRouter (ListaPacientes)