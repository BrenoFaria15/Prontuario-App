import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import AsyncSelect from 'react-select/async';
import AtendimentoService from "../app/services/atendimentoServices";
import TipoAtendimentoService from "../app/services/tipoAtendimentoServices";
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


class NovoAtendimento extends React.Component {

    
    constructor(props) {
        
        super(props);
        this.service = new AtendimentoService();
        this.tipoAtendService = new TipoAtendimentoService();
        this.state = {
            id_atendimento:props.match.params.id,
            data: '',
            hora:'',
            nomePaciente: '',
            nomeProfissional: '',
            id_tipo_atendimento:null,
            atendimentos: [],
            tipoAtendimentos:[],
            id_paciente: null,
            id_profissional:null,
            selectData: INITIAL_DATA,
            setselectData: INITIAL_DATA,
            selectDataP:INITIAL_DATAP,
            setselectDataP: INITIAL_DATAP,
            tipoAtendNome:'Selecione o Tipo do Atendimento'
    
        }
    }

    componentDidMount(){
        this.getTipoAtend();
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

    getTipoAtend(){
        this.tipoAtendService.buscarTodos().then(
            (response) =>
               this.setState({tipoAtendimentos:response.data}));
    }

    setselectDataP(data) {
        this.setState({
            selectDataP: data,
            id_profissional: data.value
        }

        )
    }


    cancelarCadastro = () =>{
        this.props.history.push('/atendimentos')
    }

    validar(){
        const msg = []
        if (!this.state.id_tipo_atendimento ||  this.state.id_tipo_atendimento==="Selecione") {
            msg.push("Selecione um Tipo de Atendimento")
        }
        if (!this.state.id_paciente) {
            msg.push("Selecione um Paciente")
        }
        if (!this.state.id_profissional) {
            msg.push("Selecione um Profissional")
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

        const atendimento ={
            data: this.state.data,
            horaInicio: this.state.hora,
            tipoatendimento:this.state.id_tipo_atendimento,
            paciente: this.state.id_paciente,
            profissional: this.state.id_profissional,
            unidade:7,
            usuario:16
        }

        if(this.state.id_atendimento==="_add"){
        this.service.salvar(atendimento).then(response =>{
            mensagemOk('Atendimento Cadastrado !')
            this.props.history.push('/atendimentos') 
        }).catch(error =>{
            mensagemErro(error.response.data)
        })}else{
            atendimento.id_atendimento = this.state.id_atendimento
            this.service.atualizar(atendimento).then(
                response =>{
                     mensagemOk('Atendimento Editado com Sucesso')
                     this.props.history.push('/atendimentos') 
                }
            ).catch(
                error =>{
                    mensagemErro(error.response.data)
                }
            )
        }
        console.log(this.state)
      } 

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="formcadastrouni">
                        <legend>Novo Atendimento</legend>
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
                                <div className="form-row">
                                    <div className="form-group col-md-4 center">
                                        <label htmlFor="exampleSelect1">Tipo de Atendimento</label>
                                        <select className="form-select" id="exampleSelect1" onChange={e => this.setState({id_tipo_atendimento: e.target.value})} >
                                            <option value={0} className="center">Selecione</option>{
                                            
                                            this.state.tipoAtendimentos.map(
                                                tipoAtend =>         
                                               <option value={tipoAtend.id_tipo_atendimento} className="center">{tipoAtend.tipoNome}</option>
                                            )

                                            
                                        }
                                        </select>
                                        <br></br>
                                        <button type="button" className="btn btn-primary btn-space btn-sm botaotipoatend">Cadastrar Tipo de Atendimento</button>
                                    </div>
                        
                                </div>
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

export default withRouter(NovoAtendimento)