import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import UsuarioService from "../app/services/usuarioServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan,faPlus,faPrint} from '@fortawesome/free-solid-svg-icons'



import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
class ListaUsuario extends React.Component {
    state = {
        usuarios: [],
        show: false,
        deleteItem:null

    }
    constructor() {
        super();
        this.service = new UsuarioService();


    }

    componentDidMount() {
        this.getUsuarios();

    }
    editar(id) {
        this.props.history.push("/usuarios/cadastro/" + id);
    }

    prepareCadastrar = () => {
        this.props.history.push('/usuarios/cadastro/_add')


    }


    getUsuarios() {
        this.service.buscarTodos().then(
            (response) =>
                this.setState({ usuarios: response.data }));


    }

    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/usuarios')
                mensagemOk('Usuario Excluido com sucesso')
                this.getUsuarios();
                this.setState({show:false})
            }

        ).catch(
            error =>
                mensagemErro(error.response.data)
        )
    }

    cancelarDelete = () =>{
        this.setState({show:false,deleteItem:null})
    }

    abrirConfirmar = (item) =>{
        this.setState({show:true,deleteItem:item})
    }

    imprimirRelatorio = ()=>{
        const link = document.createElement('a');
        link.href = `http://localhost:8080/api/usuarios/relatorio-usuario`;
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
                        <legend >Usuarios</legend>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-primary btn-space "  title="Relatorios de Usuarios"
                            onClick={this.imprimirRelatorio}><FontAwesomeIcon icon={faPrint} /></button>
                        <button type="button" className="btn btn-primary " title="Novo Usuario"
                            onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} /></button>
                        <br></br>
                        <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Perfil</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.usuarios.map(
                                    usuario =>
                                        <tr className="table-primary">
                                            <th scope="row">{usuario.id_usuario}</th>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.tipoUsuario}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-space" title="Editar"
                                                    onClick={() => this.editar(usuario.id_usuario)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                <button type="button" className="btn btn-danger btn-space" title="Excluir"
                                                    onClick={() => this.abrirConfirmar(usuario.id_usuario)}><FontAwesomeIcon icon={faTrashCan} /></button>
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

export default withRouter(ListaUsuario)