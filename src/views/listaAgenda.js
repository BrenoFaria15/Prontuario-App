import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AgendaService from "../app/services/agendaServices";
import AsyncSelect from 'react-select/async';
import { mensagemErro, mensagemOk } from "../components/toastr"


import { Dialog } from 'primereact/dialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons'


const INITIAL_DATA = {
    value: 0,
    label: 'Selecione o Paciente',
};


const INITIAL_DATAP = {
    value: 0,
    label: 'Selecione o Profissional',
};

const mapResponseToValuesAndLabels = (data) => ({
    value: data.id_paciente,
    label: data.nome,
});

const mapResponseToValuesAndLabelsP = (data) => ({
    value: data.id_profissional,
    label: data.nome,
});


class ListaAgenda extends React.Component {
    state = {

        agendas: [],
        data: '',
        flg_presente: null,
        show: false,
        selectData: INITIAL_DATA,
        setselectData: INITIAL_DATA,
        id_paciente: null,
        id_profissional:null,
        selectDataP: INITIAL_DATAP,
        setselectDataP: INITIAL_DATAP,
        dataInicio:'',
        dataFim:''

    }
    constructor() {
        super();
        this.service = new AgendaService();


    }

    setselectData(data) {
        this.setState({
            selectData: data,
            id_paciente: data.value
        }

        )
    }

    async callApi(value) {
        const data = await fetch(`http://localhost:8080/api/pacientes/all`)
            .then((response) => response.json())
            .then((response) => response.map(mapResponseToValuesAndLabels))
            .then((final) =>
                final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
            );

        return data;
    }
    async callApiP(value) {
        const datap = await fetch(`http://localhost:8080/api/profissionais/all`)
            .then((response) => response.json())
            .then((response) => response.map(mapResponseToValuesAndLabelsP))
            .then((final) =>
                final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
            );

        return datap;
    }

    handleSubmit() {
        console.log(this.stateselectData);
        this.setselectData(INITIAL_DATA);
    }


    componentDidMount() {

    }

    prepareCadastrar = () => {
        this.props.history.push('/agenda/cadastro/_add')
    }

    BuscarAgendados = (data) => {
        if (!this.state.data){
            mensagemErro("Informe um Data para Buscar")
            return false
        }
        this.service.buscarPorData(data).then(
            (response) =>
                this.setState({ agendas: response.data }));
    }

    gerarRelatorio(){
        if(!this.state.dataInicio || !this.state.dataFim){
           mensagemErro("Digite um Intervalo de Datas")
            return false
        }

        let params = `?dataInicio=${this.state.dataInicio}&dataFim=${this.state.dataFim}`

        if(this.state.id_paciente){
            params=`${params}&idPaciente=${this.state.id_paciente}`
        }
       

        if(this.state.id_profissional){
            params=`${params}&idProfissional=${this.state.id_profissional}`
        }
       
        const link = document.createElement('a');
        link.href = `http://localhost:8080/api/agenda/relatorio-agenda${params}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    }

    ConfirmarPresenca(id, flgP) {
        let flg
        if (flgP == false) {
            flg = true;
        } else {
            flg = false;
        }
        const agenda = {
            id_agenda: id,
            flg_presente: flg


        }
        this.service.atualizarPreseca(agenda).then(

            response => {
                this.props.history.push('/agenda');
                mensagemOk('Preseça Atualizada');
                this.BuscarAgendados(this.state.data);
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    handleSubmitP() {
        console.log(this.stateselectData);
        this.setselectData(INITIAL_DATAP);
    }

    setselectDataP(data) {
        this.setState({
            selectDataP: data,
            id_profissional: data.value
        }

        )
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
                            <button type="button" className="btn btn-primary btn-space " title="Relatorios de Agendamentos"
                                onClick={()=>this.setState({show:true})}><FontAwesomeIcon icon={faPrint} /></button>
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
                                            <th scope="row"><input className="form-check-input" checked={agenda.flg_presente} readOnly="true" type="checkbox" value="" id="flexCheckDefault">
                                            </input>

                                            </th>
                                            <td>{agenda.hora}</td>
                                            <td>{agenda.paciente.nome}</td>
                                            <td>{agenda.profissional.nome}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-space"
                                                    onClick={() => this.ConfirmarPresenca(agenda.id_agenda, agenda.flg_presente)}>Confirmar/Estornar Presença</button>

                                            </td>

                                        </tr>



                                )
                                }
                            </tbody>
                        </table>

                    </div>
                    <Dialog header="Gerar Relatorio"
                        visible={this.state.show}
                        style={{ width: '50vw' }}
                        onHide={() => this.setState({ show: false })}>
                        <div className="form-row">
                            <div className="col-md-4 center ">
                                <div className="form-group ">
                                    <label htmlFor="exampleInputEmail1">Data Inicio</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1"
                                        value={this.state.dataInicio} onChange={e => this.setState({ dataInicio: e.target.value })}></input>
                                </div>
                            </div>
                            <div className="col-md-4 center ">
                                <div className="form-group ">
                                    <label htmlFor="exampleInputEmail1">Data Fim</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1"
                                        value={this.state.dataFim} onChange={e => this.setState({ dataFim: e.target.value })}></input>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={this.callApi}
                            onChange={(data) => {
                                this.setselectData(data);
                            }}
                            value={this.state.selectData}
                            defaultOptions
                        />
                        <br></br>
                        <br></br>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={this.callApiP}
                            onChange={(data) => {
                                this.setselectDataP(data);
                            }}
                            value={this.state.selectDataP}
                            defaultOptions
                        />
                        <br></br>
                        <br></br>
                         <div className="form-row ">
                                    <div className="form-group center" >
                                        <button type="button" className="btn btn-primary btn-space " 
                                            onClick={()=>this.gerarRelatorio()}>Gerar Relatorio</button>
                
                                    </div>
                                </div>
                    </Dialog>

                </div>
            </div>

        )
    }
}

export default ListaAgenda