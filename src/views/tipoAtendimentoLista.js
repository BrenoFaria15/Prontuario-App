import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import tipoAtendimentoService from "../app/services/tipoAtendimentoServices";
import { mensagemErro, mensagemOk } from "../components/toastr"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan,faPlus,faChevronLeft} from '@fortawesome/free-solid-svg-icons'


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class TipoAtendimentoLista extends React.Component {
    state = {
        tipoAtendimentos: [],
        show: false,
        deleteItem:null
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

    getTipoAtendimentos() {
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ tipoAtendimentos: response.data }));
    }

    prepareCadastrar = () => {
        this.props.history.push('/tipoatendimentos/cadastro/_add')
    }
    voltar = () => {
        this.props.history.push('/atendimentos/novo/_add')
    }

    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/tipoatendimentos');
                mensagemOk("Tipo de Atendimento Excluido com Sucesso");
                this.getTipoAtendimentos();
                this.setState({show:false})
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelarDelete = () =>{
        this.setState({show:false,deleteItem:null})
    }

    abrirConfirmar = (item) =>{
        this.setState({show:true,deleteItem:item})
    }
    render() {
        const confirmarDelete = (
            <div>
                <Button label="Não" icon="pi pi-times" onClick={() => this.cancelarDelete()} className="p-button-text" />
                <Button label="Sim" icon="pi pi-check" onClick={() => this.excluir(this.state.deleteItem)} autoFocus />
            </div>

        )
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Tipo de Atendimentos</legend>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-danger btn-space " title="Voltar"
                            onClick={this.voltar}><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <button type="button" className="btn btn-primary " title="Novo Tipo de Atendimento"
                            onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} /></button>
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
                                                    <button type="button" className="btn btn-warning btn-space" title="Editar"
                                                        onClick={() => this.editar(tipo.id_tipo_atendimento)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button type="button" className="btn btn-danger btn-space" title="Excluir"
                                                        onClick={() => this.abrirConfirmar(tipo.id_tipo_atendimento)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                                </td>

                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div>
                            <Dialog header="Confirmar Exclusão?"
                                visible={this.state.show}
                                style={{ width: '50vw' }}
                                footer={confirmarDelete}
                                onHide={() => this.setState({ show: false })}>

                            </Dialog>

                        </div>

                    </div>

                </div>
            </div>



        )
    }
}

export default TipoAtendimentoLista