import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemOk } from "../components/toastr"
import ExameService from "../app/services/exameServices";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan,faPlus,faPrint} from '@fortawesome/free-solid-svg-icons'



class ListaExames extends React.Component {
    state = {
        exames: [],
        show:false,
        deleteItem:null
    }
    constructor() {
        super();
        this.service = new ExameService();
    }

    componentDidMount() {
        this.getExames();
    }
    editar(id) {
        this.props.history.push("/exames/cadastro/" + id);
    }
    getExames() {
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ exames: response.data }));
    }

    prepareCadastrar = () => {
        this.props.history.push('/exames/cadastro/_add')
    }
    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/exames');
                mensagemOk('Exame Excluido com Sucesso');
                this.getExames();
                this.setState({show:false})
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    lancarExame = () => {
        this.props.history.push('/exames/lancarexame/_add')
    }

    cancelarDelete = () =>{
        this.setState({show:false,deleteItem:null})
    }

    abrirConfirmar = (item) =>{
        this.setState({show:true,deleteItem:item})
    }

    imprimirRelatorio = ()=>{
        const link = document.createElement('a');
        link.href = `http://localhost:8080/api/exames/relatorio-exame`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    render() {

        const confirmarDelete =(
            <div>
                <Button label="Não" icon="pi pi-times" onClick={() =>  this.cancelarDelete()}className="p-button-text" />
                <Button label="Sim" icon="pi pi-check" onClick={() =>  this.excluir(this.state.deleteItem)} autoFocus />
            </div>
            
        )
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Exames</legend>
                        <br></br>
                        <br></br>
                        <div className="form-row ">
                            <div className="form-group center">
                            <button type="button" className="btn btn-primary btn-space btn-lg"  title="Relatorios de Exames"
                            onClick={this.imprimirRelatorio}><FontAwesomeIcon icon={faPrint} /></button>
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
                                                    <button type="button" className="btn btn-warning btn-space" title="Editar"
                                                        onClick={() => this.editar(exame.id_exame)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button type="button" className="btn btn-danger btn-space" title="Excluir"
                                                        onClick={() => this.abrirConfirmar(exame.id_exame)}><FontAwesomeIcon icon={faTrashCan} /></button>
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
                            onHide={() => this.setState({show:false})}>
                                
                            </Dialog>

                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

export default withRouter(ListaExames)