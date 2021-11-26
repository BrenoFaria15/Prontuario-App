import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import tipoAtendimentoService from "../app/services/tipoAtendimentoServices";
import { mensagemErro, mensagemOk } from "../components/toastr"


class TipoAtendimentoLista extends React.Component {
    state = {
        tipoAtendimentos: []
    }
    constructor() {
        super();
        this.service = new tipoAtendimentoService();

    }

    componentDidMount() {
        this.getTipoAtendimentos();
    }


    editar(id) {
        this.props.history.push('/tipoatendimentos/cadastro/' + id);
    }

    getTipoAtendimentos(){
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ tipoAtendimentos: response.data }));
    }

    prepareCadastrar = () => {
        this.props.history.push('/tipoatendimentos/cadastro/_add')
    }
    voltar = () =>{
        this.props.history.push('/atendimentos/novo/_add')
    }

    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/tipoatendimentos');
                mensagemOk("Tipo de Atendimento Excluido com Sucesso");
                this.getTipoAtendimentos();
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Tipo de Atendimentos</legend>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-danger btn-space "
                            onClick={this.voltar}>voltar</button>
                        <button type="button" className="btn btn-primary "
                            onClick={this.prepareCadastrar}>Novo</button>
                        <br></br>
                        <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tipoAtendimentos.map(
                                        tipo =>
                                            <tr className="table-primary">
                                                <th scope="row">{tipo.id_tipo_atendimento}</th>
                                                <td>{tipo.tipoNome}</td>
                                                <td>{tipo.descricao}</td>
                                                <td>
                                                    <button type="button" className="btn btn-warning btn-space"
                                                        onClick={() => this.editar(tipo.id_tipo_atendimento)}>Editar</button>
                                                    <button type="button" className="btn btn-danger btn-space"
                                                        onClick={() => this.excluir(tipo.id_tipo_atendimento)}>Excluir</button>
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

export default TipoAtendimentoLista