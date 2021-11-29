import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import PacienteService from "../app/services/pacienteServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons'


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ListaPacientes extends React.Component {

    state = {
        pacientes: [],
        show: false,
        deleteItem: null,
        relatorio: null
    }
    constructor() {
        super();
        this.service = new PacienteService();
    }

    prepareCadastrar = () => {
        this.props.history.push('/pacientes/cadastro/_add')
    }
    prepareTeste = () =>{
       var teste =  this.service.gerarRelatorioPaciente()
     //  var binaryData = [];
   /// binaryData.push(teste);

   const link = document.createElement('a');
   link.href = `http://localhost:8080/api/pacientes/relatorio-paciente`;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
     //   window.open('localhost:8080/api/pacientes/relatorio-paciente')

     //   const fileURL = URL.createObjectURL(teste);
      //  window.open(fileURL)
    }







    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/pacientes');
                mensagemOk('Paciente Excluido com Sucesso');
                this.getPacientes();
                this.setState({ show: false })
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    componentDidMount() {
        this.getPacientes();
    }

    getPacientes() {
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ pacientes: response.data }));
    }

    editar(id) {
        this.props.history.push("/pacientes/cadastro/" + id);
    }
    cancelarDelete = () => {
        this.setState({ show: false, deleteItem: null })
    }

    abrirConfirmar = (item) => {
        this.setState({ show: true, deleteItem: item })
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
                        <legend >Pacientes</legend>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-primary btn-space "  title="Listagem de Pacientes"
                            onClick={this.prepareTeste}><FontAwesomeIcon icon={faPrint} /></button>
                        <button type="button" className="btn btn-primary " title="Novo Paciente"
                            onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} /></button>
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
                                                    <button type="button" className="btn btn-warning btn-space" title="Editar"
                                                        onClick={() => this.editar(paciente.id_paciente)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button type="button" className="btn btn-danger btn-space" title="Excluir"
                                                        onClick={() => this.abrirConfirmar(paciente.id_paciente)}><FontAwesomeIcon icon={faTrashCan} /></button>
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

export default withRouter(ListaPacientes)