import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import UnidadeService from "../app/services/unidadeServices";
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemOk } from "../components/toastr"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan,faPlus,faPrint} from '@fortawesome/free-solid-svg-icons'



import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
class ListaUnidades extends React.Component {

    state = {
        unidades: [],
        show: false,
        deleteItem:null
    }

    constructor() {
        super();
        this.service = new UnidadeService();
    }

    componentDidMount() {
        this.getUnidades();
    }

    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/unidades');
                mensagemOk('Unidade Excluida com sucesso');
                this.getUnidades();
                this.setState({show:false})
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }


    getUnidades() {
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ unidades: response.data }));

    }

    prepareCadastrar = () => {
        this.props.history.push('/unidades/cadastro/_add')


    }

    editar(id) {
        this.props.history.push("/unidades/cadastro/" + id);
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
                        <legend >Unidades</legend>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-primary btn-space "  title="Relatorios de Unidades"
                            onClick=""><FontAwesomeIcon icon={faPrint} /></button>
                        <button type="button" className="btn btn-primary " title="Nova Unidade"
                            onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} /></button>
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
                                {this.state.unidades.map(
                                    unidade =>
                                        <tr className="table-primary">
                                            <th scope="row">{unidade.id_unidade}</th>
                                            <td>{unidade.nomeFantasia}</td>
                                            <td>{unidade.cnes}</td>
                                            <td>{unidade.telefone}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-space" title="Editar"
                                                    onClick={() => this.editar(unidade.id_unidade)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                <button type="button" className="btn btn-danger btn-space" title="Excluir"
                                                    onClick={() => this.abrirConfirmar(unidade.id_unidade)}><FontAwesomeIcon icon={faTrashCan} /></button>
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

export default withRouter(ListaUnidades)