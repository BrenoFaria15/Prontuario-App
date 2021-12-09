import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import ProfissionalService from "../app/services/profissionalServices";
import { mensagemErro, mensagemOk } from "../components/toastr"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan,faPlus,faPrint} from '@fortawesome/free-solid-svg-icons'


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ListaProfissionais extends React.Component {

    state = {
        profissionais: [],
        show: false,
        deleteItem:null
    }

    constructor() {
        super();
        this.service = new ProfissionalService();
    }
    prepareCadastrar = () => {
        this.props.history.push('/profissionais/cadastro/_add')


    }
    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/profissionais');
                mensagemOk('Profissional Excluido com sucesso');
                this.getProfissionais();
                this.setState({show:false})
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    componentDidMount() {
        this.getProfissionais();
    }
    getProfissionais() {
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ profissionais: response.data }));
    }

    editar(id) {
        this.props.history.push("/profissionais/cadastro/" + id);
    }

    cancelarDelete = () =>{
        this.setState({show:false,deleteItem:null})
    }

    abrirConfirmar = (item) =>{
        this.setState({show:true,deleteItem:item})
    }

    imprimirRelatorio = ()=>{
        const link = document.createElement('a');
        link.href = `http://localhost:8080/api/profissionais/relatorio-profissional`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        <legend >Profissionais</legend>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-primary btn-space "  title="Relatorios de Profissionais"
                            onClick={this.imprimirRelatorio}><FontAwesomeIcon icon={faPrint} /></button>
                        <button type="button" className="btn btn-primary " title="Novo Profissional"
                            onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} /></button>
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
                                                    <button type="button" className="btn btn-warning btn-space" title="Editar"
                                                        onClick={() => this.editar(profissional.id_profissional)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button type="button" className="btn btn-danger btn-space" title="Excluir"
                                                        onClick={() => this.abrirConfirmar(profissional.id_profissional)}><FontAwesomeIcon icon={faTrashCan} /></button>
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

export default withRouter(ListaProfissionais)