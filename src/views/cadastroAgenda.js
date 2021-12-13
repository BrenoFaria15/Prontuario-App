import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AgendaService from "../app/services/agendaServices";
import AsyncSelect from 'react-select/async';
import { mensagemErro, mensagemOk } from "../components/toastr"

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


class CadastroAgenda extends React.Component{

    constructor(props) {
        
        super(props);
        this.service = new AgendaService();
        this.state = {
            id_agenda:props.match.params.id,
            data: '',
            hora:'',
            nomePaciente: '',
            nomeProfissional: '', 
            id_paciente: null,
            id_profissional:null,
            id_usuario:null,
            id_unidade:null,
            selectData: INITIAL_DATA,
            setselectData: INITIAL_DATA,
            selectDataP:INITIAL_DATAP,
            setselectDataP: INITIAL_DATAP,
            flg_presente:false
    
        }
    }


    validar(){
        const msg = []

        if (!this.state.id_paciente) {
            msg.push("Selecione um Paciente")
        }
        if (!this.state.id_profissional) {
            msg.push("Selecione um Profissional")
        }
        if (!this.state.hora) {
            msg.push("Selecione um Horário")
        }
        if (!this.state.data) {
            msg.push("Selecione uma Data")
        }

        return msg
    }

    cadastrar = () =>{
        const msg = this.validar();

        if(msg && msg.length>0){
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            } );
            return false;
        }

        const agenda ={
            data: this.state.data,
            hora:this.state.hora,
            horaInicio: this.state.hora,
            paciente: this.state.id_paciente,
            profissional: this.state.id_profissional,
            unidade:7,
            usuario:1,
            flg_presente:this.state.flg_presente
        }

        if(this.state.id_agenda==="_add"){
        this.service.salvar(agenda).then(response =>{
            mensagemOk('Agendado com Sucesso!')
            this.props.history.push('/agenda') 
        }).catch(error =>{
            mensagemErro(error.response.data)
        })}else{
            agenda.id_agenda = this.state.id_agenda
            this.service.atualizar(agenda).then(
                response =>{
                     mensagemOk('Agendamento Editado com Sucesso')
                     this.props.history.push('/agenda') 
                }
            ).catch(
                error =>{
                    mensagemErro(error.response.data)
                }
            )
        }
        console.log(this.state)
    } 



    async callApi(value) {
        const data = await fetch(`https://prontuarioweb-api.herokuapp.com/api/pacientes/all`)
            .then((response) => response.json())
            .then((response) => response.map(mapResponseToValuesAndLabels))
            .then((final) =>
                final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
            );

        return data;
    }

    async callApiP(value) {
        const datap = await fetch(`https://prontuarioweb-api.herokuapp.com/api/profissionais/all`)
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

    cancelarCadastro = () => {
        this.props.history.push('/agenda')
    }


    render(){
        return(
            <div className="container-fluid">
                <div className="formcad">
                    <div className="formcadastrouni">
                        <legend>Agendamento</legend>
                        <br></br>
                        <br></br>
                        <form>
                            <fieldset>
                                <div className="form-row">

                                    <div className="form-group col-md-8 center">
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
                                </div>
                                <br></br>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-group col-md-8 center">
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
                                </div>
                                <br></br>
                                <div className="form-row ">
                                    <div className="col-md-2 center">
                                        <div className="form-group ">
                                            <label htmlFor="exampleInputEmail1">Data </label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"
                                            value={this.state.data} onChange={e => this.setState({data: e.target.value })}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2  center">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Hora</label>
                                            <input type="time" className="form-control" id="exampleInputEmail1"
                                            value={this.state.hora} onChange={e => this.setState({hora: e.target.value })}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <button type="button" className="btn btn-primary btn-space "
                                 onClick={this.cadastrar}>Cadastrar</button>
                                <button type="button" className="btn btn-danger btn-space"
                                onClick={this.cancelarCadastro}>Cancelar</button>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

export default CadastroAgenda