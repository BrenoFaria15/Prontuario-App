import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AtendimentoService from "../app/services/atendimentoServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons'

class HistoricoConsulta extends React.Component{

    constructor(props) {
        super(props);
        this.service = new AtendimentoService();
        this.state = {
            id_atendimento: props.match.params.id,
            peso: null,
            altura: null,
            imc: null,
            bpm: null,
            temperatura: null,
            glicemia: null,
            saturacao: null,
            avaliacao: null,
            hipotese: '',
            entrevistaClinica: '',
            cid: '',
            pressao1: null,
            pressao2: null,
            atendimento: null,
            id_paciente: null,
            id_profissional: null,
            id_tipo_atendimento: null,
            id_unidade: 7,
            id_usuario: 16,
            data: '',
            hora:'',
            flg_atendido:null

        }
    }

    voltar = () =>{
        this.props.history.push('/atendimentos/consulta/historico/lista/'+this.state.id_atendimento)
    }
    
    componentDidMount() {
        this.service.buscarPorId(this.state.id_atendimento).then(
            (response) => {
                let consulta = response.data;
                this.setState(
                    {
                        peso: consulta.peso,
                        altura: consulta.altura,
                        imc: consulta.imc,
                        bpm: consulta.bpm,
                        temperatura: consulta.temperatura,
                        glicemia: consulta.glicemia,
                        saturacao: consulta.saturacao,
                        avaliacao: consulta.avaliacao,
                        hipotese: consulta.hipotese,
                        entrevistaClinica: consulta.entrevistaClinica,
                        cid: consulta.cid,
                        pressao1: consulta.pressao1,
                        pressao2: consulta.pressao2,
                        id_paciente: consulta.paciente.id_paciente,
                        id_profissional: consulta.profissional.id_profissional,
                        id_tipo_atendimento: consulta.tipoatendimento.id_tipo_atendimento,
                        id_unidade: consulta.unidade.id_unidade,
                        id_usuario: consulta.usuario.id_usuario,
                        data: consulta.data,
                        hora:consulta.hora,
                        flg_atendido:consulta.flg_atendido
                    }



                );
            }
        )
    }


    render(){
        return(
            <div className="formcad">
                <div className="formcadconsulta">
                    <form>
                        <fieldset>
                            <legend>Consulta</legend>
                            <div className="numAntrop">
                            <button type="button" className="btn btn-danger btn-space  " title="Voltar"
                                onClick={this.voltar}><FontAwesomeIcon icon={faChevronLeft} /></button>
                                <br></br>
                                <br></br>
                                <h6>Dados Antropometricos</h6>
                                <div className="form-row ">
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">Peso</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Peso"
                                            readOnly="true"  value={this.state.peso} onChange={e => this.setState({ peso: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">Altura</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Cm"
                                             readOnly="true" value={this.state.altura} onChange={e => this.setState({ altura: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">IMC</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""
                                           readOnly="true"  value={this.state.imc} onChange={e => this.setState({ imc: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">BPM</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="BPM"
                                           readOnly="true"  value={this.state.bpm} onChange={e => this.setState({ bpm: e.target.value })}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">P.A(sistólica)</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="mmHg"
                                          readOnly="true"   value={this.state.pressao1} onChange={e => this.setState({ pressao1: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">P.A(diastólica)</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="mmHg"
                                          readOnly="true"   value={this.state.pressao2} onChange={e => this.setState({ pressao2: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">Glicemia</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""
                                          readOnly="true"   value={this.state.glicemia} onChange={e => this.setState({ glicemia: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">Saturação</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="BPM"
                                          readOnly="true"   value={this.state.saturacao} onChange={e => this.setState({ saturacao: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">Temperatura</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="BPM"
                                          readOnly="true"   value={this.state.temperatura} onChange={e => this.setState({ temperatura: e.target.value })}></input>
                                    </div>

                                </div>

                                <br></br>
                                <br></br>

                                <div className="form-row">
                                    <div className="col-md-8 center">
                                        <div className="form-group">
                                            <label htmlFor="exampleTextarea">Entrevista Clinica</label>
                                            <textarea className="form-control" id="txtAvaliacao" rows="10"
                                              readOnly="true"   value={this.state.entrevistaClinica} onChange={e => this.setState({ entrevistaClinica: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="cardEntClinica">
                                <div className="form-row">
                                    <div className="form-group col-md-2 center ">
                                        <label htmlFor="exampleInputEmail1">CID</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CID"
                                          readOnly="true"   value={this.state.cid} onChange={e => this.setState({ cid: e.target.value })}></input>
                                    </div>

                                    <div className="form-group col-md-8 center">
                                        <label htmlFor="exampleInputEmail1">Hipotese Diagnostica</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Hipotese Diagnostica"
                                          readOnly="true"   value={this.state.hipotese} onChange={e => this.setState({ hipotese: e.target.value })}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="col-md-8 center">
                                        <div className="form-group">
                                            <label htmlFor="exampleTextarea">Avaliação</label>
                                            <textarea className="form-control" id="exampleTextarea" rows="10"
                                               readOnly="true"   value={this.state.avaliacao} onChange={e => this.setState({ avaliacao: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <br></br>
                            
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

export default HistoricoConsulta