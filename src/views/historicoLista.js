import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AtendimentoService from "../app/services/atendimentoServices";
import AsyncSelect from 'react-select/async';
import { mensagemErro, mensagemOk } from "../components/toastr"
import LocalStorageService from "../app/services/localStorageService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faChevronLeft} from '@fortawesome/free-solid-svg-icons'

class HistoricoLista extends React.Component{
    constructor(props) {
        super(props);
        this.service = new AtendimentoService();
        this.state = {
            id_atendimento:props.match.params.id,
            id_paciente:null,
            atendimentos: [],
            

        }

    }

    componentDidMount(){
        this.service.buscarPorId(this.state.id_atendimento).then(
            (response) => {
                let consulta = response.data;
                this.getAtendimentos(consulta.paciente.id_paciente);
                              
            }
        )
        
    }

    getAtendimentos(id){
        this.service.buscarPorPaciente(id).then(
            (response) =>
               this.setState({atendimentos:response.data}));
    }


    editar(id) {
        this.props.history.push("/atendimentos/consulta/historico/"+id);
    }

    voltar = () =>{
        let consulta = LocalStorageService.obterItem('_ultima_consulta')
        this.props.history.push('/atendimentos/consulta/'+consulta)
    }

    render(){
        return(
            <div className="container-fluid">
            <div className="formcad">
                <div className="formcadastrouni">
                    <form>
                        <fieldset>
                            <legend>Atendimentos</legend>
                            <h6>Historico</h6>

                            <br></br>
                            <button type="button" className="btn btn-danger btn-space  " title="Voltar"
                                onClick={this.voltar}><FontAwesomeIcon icon={faChevronLeft} /></button>

                            
                            
                            <br></br>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Paciente</th>
                                        <th scope="col">Profissional</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.atendimentos.map(
                                            atendimento =>
                                                <tr className="table-primary">
                                                    <th scope="row">{atendimento.id_atendimento}</th>
                                                    <td>{atendimento.data}</td>
                                                    <td>{atendimento.paciente.nome}</td>
                                                    <td>{atendimento.profissional.nome}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary btn-space" title="Ver Consulta"
                                                            onClick={() => this.editar(atendimento.id_atendimento)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default HistoricoLista