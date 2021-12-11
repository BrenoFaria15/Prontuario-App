import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AsyncSelect from 'react-select/async';
import ResultadoExameService from "../app/services/resultadoExameServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

const INITIAL_DATAE = {
    value: 0,
    label: 'Selecione o Exame',
};

const INITIAL_DATA = {
    value: 0,
    label: 'Selecione o Paciente',
};


const mapResponseToValuesAndLabelsE = (data) => ({
    value: data.id_exame,
    label: data.nome,
});

const mapResponseToValuesAndLabels = (data) => ({
    value: data.id_paciente,
    label: data.nome,
});

class LancarExame extends React.Component {
    constructor(props) {
        
        super(props);
        this.service=new ResultadoExameService();
        this.state = {
            id_resultado: props.match.params.id,
            data:'',
            resultado: '',
            id_exame: null,
            id_paciente:null,
            selectDataE: INITIAL_DATAE,
            setselectDataE: INITIAL_DATAE   ,
            selectData:INITIAL_DATA,
            setselectData:INITIAL_DATA
        }
    }

    async callApiE(value) {
        const data = await fetch(`http://localhost:8080/api/exames/all`)
            .then((response) => response.json())
            .then((response) => response.map(mapResponseToValuesAndLabelsE))
            .then((final) =>
                final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
            );

        return data;
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

    cancelarCadastro = ()=>{
        this.props.history.push('/exames')
    }
    validar() {
        const msg = []
        if (!this.state.resultado) {
            msg.push("Digite um Resultado valido")
        }
        if (!this.state.id_exame) {
            msg.push("Selecione um Exame")
        }
        if (!this.state.id_paciente) {
            msg.push("Selecione um Paciente")
        }
        return msg
    }
    handleSubmit() {
        console.log(this.stateselectDataE);
        this.setselectDataE(INITIAL_DATAE);
        this.setselectData(INITIAL_DATA);
    }

    setselectDataE(data) {
        this.setState({
            selectDataE: data,
            id_exame: data.value
        }

        )
    }

    setselectData(data) {
        this.setState({
            selectData: data,
            id_paciente: data.value
        }

        )
    }

    salvar = () => {
        const msg = this.validar();

        if (msg && msg.length > 0) {
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const resultadoExame = {
            resultado: this.state.resultado,
            id_exame: this.state.id_exame,
            id_paciente: this.state.id_paciente,
            data:this.state.data
        }

        if (this.state.id_resultado === "_add") {
            this.service.salvar(resultadoExame).then(response => {
                mensagemOk('Resultado Salvo !')
                this.props.history.push('/exames')
            }).catch(error => {
                mensagemErro(error.response.data)
            })

            console.log(this.state)
        } else {
            resultadoExame.id_resultado = this.state.id_resultado
            this.service.atualizar(resultadoExame).then(
                response => {
                    mensagemOk('Resultado Salvo com Sucesso')
                    this.props.history.push('/exames')
                }
            ).catch(
                error => {
                    mensagemErro(error.response.data)
                }
            )
        }

    }


    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Lançar Resultado de Exame</legend>
                        <br></br>
                        <div className="col-md-4 center ">
                                <div className="form-group ">
                                    <label htmlFor="exampleInputEmail1">Data</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1"
                                        value={this.state.data} onChange={e => this.setState({ data: e.target.value })}></input>
                                </div>
                            </div>
                        <br></br>
                        <div className="col-md-8  center">
                            <AsyncSelect
                                cacheOptions
                                loadOptions={this.callApiE}
                                onChange={(data) => {
                                    this.setselectDataE(data);
                                }}
                                value={this.state.selectDataE}
                                defaultOptions
                            />
                        </div>
                        <br></br>
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
                        <br></br>

                        <div className="form-row">
                            <div className="col-md-8 center">
                                <div className="form-group">
                                    <label htmlFor="exampleTextarea">Resultado</label>
                                    <textarea className="form-control" id="exampleTextarea" rows="3"
                                        maxLength="255" onChange={e => this.setState({ resultado: e.target.value })} value={this.state.resultado}></textarea>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-primary btn-space"
                            onClick={this.salvar}>Salvar</button>

                        <button type="button" className="btn btn-danger btn-space"
                            onClick={this.cancelarCadastro}>Cancelar</button>


                    </div>
                </div>
            </div>
        )
    }
}


export default LancarExame