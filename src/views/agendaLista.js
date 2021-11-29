import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemOk } from "../components/toastr"
import NavbarPublico from "../components/navbarPublico";
import LocalStorageService from "../app/services/localStorageService";
import AgendaService from "../app/services/agendaServices";


class AgendaLista extends React.Component {

    state={
        agendas:[]
    }

    constructor() {
        super();
        this.service = new AgendaService();

    }


    componentDidMount(){
        this.getAgendas();

    }

    getAgendas(){
        const paciente = LocalStorageService.obterItem('_paciente_logado');
        console.log(paciente)
        this.service.buscarPorPaciente(paciente.id_paciente).then(
            (response) =>
                this.setState({ agendas: response.data }));
    }

    render() {
        return (
            <>
                <NavbarPublico />
                <div className="formcad">
                    <div className="lista">
                    <legend >Agendamentos</legend>  
                    <br></br>
                    <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Paciente</th>
                                    <th scope="col">Profissional</th>
                                    <th scope="col">Confirmação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.agendas.map(
                                        agenda =>
                                            <tr className="table-primary">
                                                <th scope="row">{agenda.id_agenda}</th>
                                                <td>{agenda.data}</td>
                                                <td>{agenda.hora}</td>
                                                <td>{agenda.paciente.nome}</td>
                                                <td>{agenda.profissional.nome}</td>
                                                <td>
                                                <input class="form-check-input" checked={agenda.flg_presente} readOnly="true" type="checkbox" value="" id="flexCheckDefault"></input>

                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </>
        )
    }
}

export default AgendaLista