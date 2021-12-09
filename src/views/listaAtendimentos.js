import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AtendimentoService from "../app/services/atendimentoServices";
import AsyncSelect from 'react-select/async';
import { mensagemErro, mensagemOk } from "../components/toastr"

import LocalStorageService from "../app/services/localStorageService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faTrashCan, faMagnifyingGlass, faPlus,faPrint } from '@fortawesome/free-solid-svg-icons'



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

    constructor(props) {
        super(props);
        this.service = new AtendimentoService();
        this.state = {
            data: '',
            nomePaciente: '',
            nomeProfissional: '',
            atendimentos: [],
            id_paciente: null,
            id_profissional: null,
            selectData: INITIAL_DATA,
            setselectData: INITIAL_DATA,
            selectDataP: INITIAL_DATAP,
            setselectDataP: INITIAL_DATAP,
            id_unidade: 7,
            id_usuario: 16

        }

    }



    buscar = () => {
        let unidade = LocalStorageService.obterItem('_unidade_logada')
        const atendimentoFiltro = {
            data: this.state.data,
            idPaciente: this.state.id_paciente,
            idProfissional: this.state.id_profissional,
            idUnidade: unidade.id_unidade
        }
        this.service.consultar(atendimentoFiltro).then(
            response => {
                this.setState({ atendimentos: response.data })
            }
        ).catch(error =>
            console.log(error))
        console.log(this.state)

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

    editar(id) {
        const usuario = LocalStorageService.obterItem('_usuario_logado')
        if (usuario.tipoUsuario == 'RECEPCAO') {
            mensagemErro("Usuarios com o Perfil Recepção Não podem realizar Consultas")
            return false
        }
        if (usuario.tipoUsuario == 'GESTAO') {
            mensagemErro("Usuarios com o Perfil Gestão Não podem realizar Consultas")
            return false
        }
        LocalStorageService.adicionarItem('_ultima_consulta', id)
        this.props.history.push("/atendimentos/consulta/" + id);
    }

    excluir(id) {
        this.service.deletar(id).then(
            response => {
                this.props.history.push('/atendimentos');
                mensagemOk('Atendimento Excluido com Sucesso');
            }
        ).catch(error => {
            mensagemErro(error.response.data)
        })
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

    prepareCadastrar = () => {
        this.props.history.push("/atendimentos/novo/_add")

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
                                </div>
                                <br></br>


                                <div className="col-md-8  center">

                                </div>
                                <br></br>

                                <div className="form-row ">
                                    <div className="form-group center" >
                                        <button type="button" className="btn btn-primary btn-space " title="Relatorios de Atendimentos"
                                            onClick=""><FontAwesomeIcon icon={faPrint} /></button>
                                        <button type="button" className="btn btn-success btn-space" title="Buscar"
                                            onClick={this.buscar}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                        <button type="button" className="btn btn-primary btn-space" title="Novo Atendimento"
                                            onClick={this.prepareCadastrar}><FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Consulta</th>
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
                                                        <td><input class="form-check-input" checked={atendimento.flg_atendido} readOnly="true" type="checkbox" value="" id="flexCheckDefault">
                                                        </input>
                                                        </td>
                                                        <td>{atendimento.data}</td>
                                                        <td>{atendimento.paciente.nome}</td>
                                                        <td>{atendimento.profissional.nome}</td>
                                                        <td>

                                                            <button type="button" className="btn btn-success btn-space" title="Consultar" id="consultabutton"
                                                                onClick={() => this.editar(atendimento.id_atendimento)}><FontAwesomeIcon icon={faUserDoctor} /></button>

                                                            <button type="button" className="btn btn-danger btn-space" title="Excluir" id="excluir"
                                                                onClick={() => this.excluir(atendimento.id_atendimento)}><FontAwesomeIcon icon={faTrashCan} /></button>
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

export default listaAtendimentos
