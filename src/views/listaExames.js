import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemOk } from "../components/toastr"
import ExameService from "../app/services/exameServices";


class ListaExames extends React.Component {
    state = {
        exames: []
    }
    constructor() {
        super();
        this.service = new ExameService();
    }

    componentDidMount(){
        this.getExames();
    }
    editar(id){
        this.props.history.push("/exames/cadastro/"+id);
    }
    getExames(){
        this.service.buscarTodos().then(
            (response) =>
               this.setState({exames:response.data}));
    }

    prepareCadastrar= () =>{
        this.props.history.push('/exames/cadastro/_add')
    }
    excluir(id){
        this.service.deletar(id).then(
          response =>{
              this.props.history.push('/exames');
              mensagemOk('Exame Excluido com Sucesso');
              this.getExames();
          }
        ) .catch(error => {
            mensagemErro(error.response.data)
        }) 
    }

    lancarExame =()=>{
        this.props.history.push('/exames/lancarexame/_add')
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Exames</legend>
                        <br></br>
                        <br></br>
                        <div className="form-row ">
                            <div className="form-group center">
                                <button type="button" className="btn btn-primary btn-space btn-lg "
                                    onClick={this.prepareCadastrar}>Cadastrar Exame</button>
                                <button type="button" className="btn btn-success btn-space btn-lg "
                                    onClick={this.lancarExame}>Lançar Resultado</button>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Codigo SUS</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.exames.map(
                                        exame =>
                                            <tr className="table-primary">
                                                <th scope="row">{exame.id_exame}</th>
                                                <td>{exame.codSus}</td>
                                                <td>{exame.nome}</td>
                                                <td>
                                                    <button type="button" className="btn btn-warning btn-space"
                                                        onClick={() => this.editar(exame.id_exame)}>Editar</button>
                                                    <button type="button" className="btn btn-danger btn-space"
                                                        onClick={() => this.excluir(exame.id_exame)}>Excluir</button>
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

export default withRouter(ListaExames)