import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import {withRouter} from 'react-router-dom'
import ProfissionalService from "../app/services/profissionalServices";
import { mensagemOk } from "../components/toastr"

class ListaProfissionais extends React.Component {

    state ={
        profissionais:[]
    }

    constructor(){
        super();
        this.service= new ProfissionalService();
    }
    prepareCadastrar= () =>{
        this.props.history.push('/profissionais/cadastro/_add')


    }
    excluir(id){
        this.service.deletar(id).then(
          response =>{
              this.props.history.push('/profissionais');
              mensagemOk('Profissional Excluido com sucesso');
              this.getProfissionais();
          }
        )  
    } 
    
    componentDidMount(){
        this.getProfissionais();
    }
    getProfissionais(){
        this.service.buscarTodos().then(
            (response) =>
               this.setState({profissionais:response.data}));
    }

    editar(id){
        this.props.history.push("/profissionais/cadastro/"+id);
     }

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Profissionais</legend>
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
                                    <th scope="col">Especialidade</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.profissionais.map(
                                    profissional =>
                                <tr className="table-primary">
                                    <th scope="row">{profissional.id_profissional}</th>
                                    <td>{profissional.nome}</td>
                                    <td>{profissional.cpf}</td>
                                    <td>{profissional.especialidade}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-space"
                                        onClick={() =>this.editar(profissional.id_profissional)}>Editar</button>
                                        <button type="button" className="btn btn-danger btn-space"
                                        onClick={() =>this.excluir(profissional.id_profissional)}>Excluir</button>
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

export default withRouter (ListaProfissionais)