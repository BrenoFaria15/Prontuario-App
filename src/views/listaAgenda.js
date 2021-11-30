import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AgendaService from "../app/services/agendaServices";
import AsyncSelect from 'react-select/async';
import { mensagemErro, mensagemOk } from "../components/toastr"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faPlus,faPrint} from '@fortawesome/free-solid-svg-icons'

class ListaAgenda extends React.Component {
    state = {
    
        agendas: [],
        data: '',
        flg_presente:null

    }
    constructor() {
        super();
        this.service = new AgendaService();


    }

    componentDidMount() {

    }

    prepareCadastrar= () =>{
        this.props.history.push('/agenda/cadastro/_add')
    }

    BuscarAgendados = (data) => {
        this.service.buscarPorData(data).then(
            (response) =>
                this.setState({ agendas: response.data }));
    }

    ConfirmarPresenca(id,flgP){
        let flg
        if(flgP==false){
             flg=true;
        }else{
             flg=false;
        }
        const agenda ={
            id_agenda:id,
            flg_presente:flg
            

        }
        this.service.atualizarPreseca(agenda).then(
        
            response =>{
                this.props.history.push('/agenda');
                mensagemOk('Preseça Atualizada');
                this.BuscarAgendados(this.state.data);
            }
          ) .catch(error => {
              mensagemErro(error.response.data)
          }) 
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Agenda</legend>
                        <br></br>
                        <br></br>
                        <div className="form-row">
                            <div className="col-md-4 center ">
                                <div className="form-group ">
                                    <label htmlFor="exampleInputEmail1">Data</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1"
                                        value={this.state.data} onChange={e => this.setState({ data: e.target.value })}></input>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="form-group center" >
                        <button type="button" className="btn btn-primary btn-space "  title="Relatorios de Agendamentos"
                            onClick=""><FontAwesomeIcon icon={faPrint} /></button>
                            <button type="button" className="btn btn-success btn-space" title="Buscar Agendados"
                                onClick={() => this.BuscarAgendados(this.state.data)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            <button type="button" className="btn btn-primary btn-space" title="Buscar Agendamentos"
                                onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <br></br>
                        <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Confirmação</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Paciente</th>
                                    <th scope="col">Profissional</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.agendas.map(
                                    agenda =>
                                        <tr className="table-primary">
                                            <th scope="row">{agenda.id_agenda}</th>
                                            <th scope="row"><input class="form-check-input" checked={agenda.flg_presente} readOnly="true" type="checkbox" value="" id="flexCheckDefault">
                                            </input>
                                            
                                            </th>
                                            <td>{agenda.hora}</td>
                                            <td>{agenda.paciente.nome}</td>
                                            <td>{agenda.profissional.nome}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-space"
                                                    onClick={() => this.ConfirmarPresenca(agenda.id_agenda,agenda.flg_presente)}>Confirmar/Estornar Presença</button>

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

export default ListaAgenda