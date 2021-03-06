import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemOk } from "../components/toastr"
import ExameService from "../app/services/exameServices";
import NavbarPublico from "../components/navbarPublico";
import ResultadoExameService from "../app/services/resultadoExameServices";
import LocalStorageService from "../app/services/localStorageService";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

import { Dialog } from 'primereact/dialog';
class ExamesLista extends React.Component {
    state = {
        exames: [],
        show: false,
        resultado:''
    }
    constructor() {
        super();
        this.service = new ResultadoExameService();
    }

    componentDidMount() {
        this.getExames();
    }


    getExames() {
        const paciente = LocalStorageService.obterItem('_paciente_logado');
        console.log(paciente)
        this.service.buscarPorPaciente(paciente.id_paciente).then(
            (response) =>
                this.setState({ exames: response.data }));
    }

    consultar = (id) => {
        this.service.buscarPorId(id).then(
            response => {
                let resultado = response.data
                this.setState({resultado:resultado.resultado,
                                show:true})
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }


    render() {
        return (
            <>
                <NavbarPublico />
                <div className="formcad">
                    <div className="lista">
                    <legend >Resultados de Exames</legend>  
                    <br></br>
                    <br></br>
                        <table className="table table-hover"> 
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Exame</th>
                                    <th scope="col">Paciente</th>
                                    <th scope="col">A????es</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.exames.map(
                                        resultado =>
                                            <tr className="table-primary">
                                                <th scope="row">{resultado.id_resultado}</th>
                                                <td>{resultado.data}</td>
                                                <td>{resultado.exame.nome}</td>
                                                <td>{resultado.paciente.nome}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary btn-space" title="Ver Resultado"
                                                        onClick={() => this.consultar(resultado.id_resultado)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                        <Dialog header="Resultado"
                            visible={this.state.show}
                            style={{ width: '50vw' }}
                            onHide={() => this.setState({ show: false })} className="center">
                            {this.state.resultado}
                        </Dialog>

                    </div>

            </>
        )
    }
}

export default ExamesLista
