import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AtendimentoService from "../app/services/atendimentoServices";
import AsyncSelect from 'react-select/async';

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

class listaAtendimentos extends React.Component {
    state = {
        data: '',
        nomePaciente: '',
        nomeProfissional: '',
        cpf: '',
        atendimentos: [],
        pacientes: [],
        id_paciente: null,
        id_profissional:null,
        selectData: INITIAL_DATA,
        setselectData: INITIAL_DATA,
        selectDataP:INITIAL_DATAP,
        setselectDataP: INITIAL_DATAP,

    }



    buscar = () => {
        const atendimentoFiltro = {
            data: this.state.data,
            //nomePaciente:this.state.nomePaciente,
            //nomeProfissional:this.state.nomeProfissional,
            cpf: this.state.cpf
        }
        this.service.consultar(atendimentoFiltro).then(
            response => {
                this.setState({ atendimentos: response.data })
            }
        ).catch(error =>
            console.log(error))

    }
    constructor() {
        super();
        this.service = new AtendimentoService();
        
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
   /* <div className="form-row">
    <div className="form-group col-md-8 center">
        <label htmlFor="exampleInputEmail1">Nome do Profissional</label>
        <input type="text" className="form-control" id="exampleInputEmail1"
            placeholder="Nome do Profissional"
            value={this.state.nomeProfissional} onChange={e => this.setState({ nomeProfissional: e.target.value })}></input>
    </div>
</div>*/


    handleSubmit() {
        console.log(this.stateselectData);
        this.setselectData(INITIAL_DATA);
    }

    handleSubmitP() {
        console.log(this.stateselectData);
        this.setselectData(INITIAL_DATAP);
    }

    setselectData(data) {
        this.setState({
            selectData: data,
            id_paciente: data.value
        }

        )
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
                    <div className="formcadastrouni">
                        <form>
                            <fieldset>
                                <legend>Atendimentos</legend>
                                <h6>Pesquisar Pacientes</h6>

                                <div className="form-row">
                                    <div className="col-md-8 center ">
                                        <div className="form-group ">
                                            <label htmlFor="exampleInputEmail1">Data</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"
                                                value={this.state.data} onChange={e => this.setState({ data: e.target.value })}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>

                                    <div className="col-md-8  center">
                                        <AsyncSelect 
                                            cacheOptions
                                            loadOptions={this.callApi}
                                            onChange={(data) => {
                                                this.setselectData(data);
                                            }}
                                            value={this.state.selectData}
                                            defaultOptions
                                        />  
                                </div>
                                <br></br>
        

                                <div className="col-md-8  center">
                                        <AsyncSelect 
                                            cacheOptions
                                            loadOptions={this.callApiP}
                                            onChange={(data) => {
                                                this.setselectDataP(data);
                                            }}
                                            value={this.state.selectDataP}
                                            defaultOptions
                                        />  
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-group col-md-8 center ">
                                        <label htmlFor="exampleInputEmail1">CPF</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1"
                                            placeholder="CPF do Paciente" onChange={e => this.setState({ cpf: e.target.value })}
                                            value={this.state.cpf}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row ">
                                    <div className="form-group center" >
                                        <button type="button" className="btn btn-success btn-space"
                                            onClick={this.buscar}>Buscar</button>
                                        <button type="button" className="btn btn-primary btn-space"
                                        >Novo Atendimento</button>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Type</th>
                                            <th scope="col">Column heading</th>
                                            <th scope="col">Column heading</th>
                                            <th scope="col">Column heading</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-primary">
                                            <th scope="row">Active</th>
                                            <td>Column content</td>
                                            <td>Column content</td>
                                            <td>Column content</td>
                                        </tr>
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

export default listaAtendimentos
