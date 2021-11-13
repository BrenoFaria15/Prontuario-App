import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import PacienteService from "../app/services/pacienteServices";
import { mensagemErro, mensagemOk } from "../components/toastr"


class CadastroPaciente extends React.Component {

    constructor(props) {
        super(props);
        this.service = new PacienteService();

        this.state = {
            id_paciente: props.match.params.id,
            nome: '',
            celular: '',
            cns: '',
            cpf: '',
            rg: '',
            logradouro: '',
            numero: '',
            cep: '',
            bairro: '',
            complemento: '',
            municipio: '',
            convenio: '',
            nomePai: '',
            nomeMae: '',
            dataNascimento: '',
            flgAtivo: true,
            flgObito: false,
            dataObito: '',
            disabled: true


        }
    }
    handleGameClik() {
        this.setState({ disabled: !this.state.disabled })
    }
    componentDidMount() {


        if (this.state.id_profissional === "_add") {
            return false;
        } else {
            this.service.buscarPorId(this.state.id_paciente).then(
                (response) => {
                    let paciente = response.data;
                    this.setState(
                        {
                            nome: paciente.nome,
                            celular: paciente.celular,
                            cns: paciente.cns,
                            cpf: paciente.cpf,
                            rg: paciente.rg,
                            logradouro: paciente.logradouro,
                            numero: paciente.numero,
                            cep: paciente.cep,
                            bairro: paciente.bairro,
                            complemento: paciente.complemento,
                            municipio: paciente.municipio,
                            convenio: paciente.convenio,
                            nomePai: paciente.nomePai,
                            nomeMae: paciente.nomeMae,
                            dataNascimento: paciente.dataNascimento,
                            flgAtivo: paciente.flgAtivo,
                            flgObito: paciente.flgObito,
                            dataObito: paciente.dataObito

                        }



                    );
                }


            )
        }

    }


    validar() {
        const msg = []
        if (!this.state.nome || this.state.nome.length < 5) {
            msg.push("Digite um Nome valido")
        }
        if (!this.state.cns || this.state.cns.length !== 15) {
            msg.push("Digite um Cartão SUS valido")
        }
        if (!this.state.cpf) {
            msg.push("Digite um CPF valido")
        }
        if (!this.state.logradouro) {
            msg.push("Digite um Logradouro valido")
        }
        if (!this.state.numero) {
            msg.push("Digite um Número valido")
        }
        if (!this.state.cep) {
            msg.push("Digite um CEP valido")
        }
        if (!this.state.bairro) {
            msg.push("Digite um Bairro valido")
        }
        if (!this.state.celular) {
            msg.push("Digite um Celular valido")
        }
        if (!this.state.dataNascimento) {
            msg.push("Digite uma Data de nascimento valida")
        }
        return msg;
    }
    cadastrar = () => {


        const msg = this.validar();

        if (msg && msg.length > 0) {
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const paciente = {
            nome: this.state.nome,
            celular: this.state.celular,
            cns: this.state.cns,
            cpf: this.state.cpf,
            rg: this.state.rg,
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            cep: this.state.cep,
            bairro: this.state.bairro,
            complemento: this.state.complemento,
            municipio: this.state.municipio,
            convenio: this.state.convenio,
            dataNascimento: this.state.dataNascimento,
            flgAtivo: this.state.flgAtivo,
            flgObito: this.state.flgObito,
            dataObito: this.state.dataObito,
            nomeMae: this.state.nomeMae,
            nomePai: this.state.nomePai
        }


        if (this.state.id_paciente === "_add") {
            this.service.salvar(paciente).then(response => {
                mensagemOk('Paciente Cadastrado!')
                this.props.history.push('/pacientes')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
        } else {
            paciente.id_paciente = this.state.id_paciente
            this.service.atualizar(paciente).then(
                response => {
                    mensagemOk('Paciente Editado com Sucesso')
                    this.props.history.push('/pacientes')
                }
            ).catch(
                error => {
                    mensagemErro(error.response.data)
                }
            )
        }
    }
    cancelarCadastro = () => {
        this.props.history.push('/pacientes')
    }
    validarCheckBoxAtivo = (e) => {
        let valor = this.state.flgAtivo
        valor = e.target.checked
        this.setState({ flgAtivo: valor })

    }
    validarCheckBoxObito = (e) => {
        var ativo = document.getElementById('dataObito');
        let valor = this.state.flgObito
        valor = e.target.checked
        this.setState({ flgObito: valor })


    }


    render() {


        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="formcadastrouni">
                        <form>
                            <fieldset>
                                <legend>Cadastro de Pacientes</legend>


                                <div className="form-row">
                                    <div className="form-group col-md-6 ">
                                        <label htmlFor="exampleInputEmail1">Nome</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1"
                                            placeholder="Nome Completo"
                                            maxLength="100" onChange={e => this.setState({ nome: e.target.value })} value={this.state.nome}></input>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="exampleInputEmail1">Celular</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Celular"
                                            maxLength="15" onChange={e => this.setState({ celular: e.target.value })} value={this.state.celular}></input>
                                    </div>
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Data de Nascimento</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"
                                                onChange={e => this.setState({ dataNascimento: e.target.value })} value={this.state.dataNascimento}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">CNS</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Cartão SUS"
                                                maxLength="15" onChange={e => this.setState({ cns: e.target.value })} value={this.state.cns}></input>
                                        </div>
                                    </div>


                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">CPF</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CPF"
                                                maxLength="14" onChange={e => this.setState({ cpf: e.target.value })} value={this.state.cpf} ></input>
                                        </div>
                                    </div>

                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">RG</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="RG"
                                                maxLength="11" onChange={e => this.setState({ rg: e.target.value })} value={this.state.rg}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="col-md-8 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Nome do Pai</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Nome do Pai"
                                                maxLength="100" onChange={e => this.setState({ nomePai: e.target.value })} value={this.state.nomePai}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-8 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Nome da Mãe</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Nome da Mãe"
                                                maxLength="100" onChange={e => this.setState({ nomeMae: e.target.value })} value={this.state.nomeMae}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="col-md-6 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Logradouro</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Logradouro"
                                                maxLength="50" onChange={e => this.setState({ logradouro: e.target.value })} value={this.state.logradouro}></input>
                                        </div>
                                    </div>

                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Número</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Número"
                                                maxLength="5" onChange={e => this.setState({ numero: e.target.value })} value={this.state.numero}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">CEP</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CEP"
                                                maxLength="9" onChange={e => this.setState({ cep: e.target.value })} value={this.state.cep}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">

                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Bairro</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Bairro"
                                                maxLength="25" onChange={e => this.setState({ bairro: e.target.value })} value={this.state.bairro}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Complemento</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Complemento"
                                                maxLength="30" onChange={e => this.setState({ complemento: e.target.value })} value={this.state.complemento}></input>
                                        </div>
                                    </div>

                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Municipio</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                placeholder="Municipio"
                                                maxLength="25" onChange={e => this.setState({ municipio: e.target.value })} value={this.state.municipio}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Convênio</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Convênio"
                                                maxLength="9" onChange={e => this.setState({ convenio: e.target.value })} value={this.state.convenio}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2 mright">
                                        <div className="form-group ">
                                            <label htmlFor="exampleInputEmail1">Data do Obito</label>
                                            <input type="date" className="form-control" id="dataObito"
                                                onChange={e => this.setState({ dataObito: e.target.value })} value={this.state.dataObito}
                                                disabled={(this.state.disabled) ? "disabled" : ""}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-check ">
                                        <input className="form-check-input" type="checkbox" value="" id="checkAtivo" checked={this.state.flgAtivo}
                                            onChange={e => this.validarCheckBoxAtivo(e)} ></input>
                                        <label className="form-check-label " htmlFor="flexCheckDefault">
                                            Ativo
                                        </label>
                                    </div>
                                    <div className="form-check mright">
                                        <input className="form-check-input" type="checkbox" value="" id="checkObito" checked={this.state.flgObito}
                                            onChange={e => this.validarCheckBoxObito(e)} onClick={this.handleGameClik.bind(this)}></input>
                                        <label className="form-check-label " htmlFor="flexCheckDefault">
                                            Obito
                                        </label>
                                    </div>
                                </div>
                                <br></br>
                                <button type="button" className="btn btn-primary btn-space"
                                    onClick={this.cadastrar} >Cadastrar</button>

                                <button type="button" className="btn btn-danger btn-space"
                                    onClick={this.cancelarCadastro}
                                >Cancelar</button>
                            </fieldset>
                        </form>

                    </div>
                </div>
            </div>








        )
    }

}

export default withRouter(CadastroPaciente)