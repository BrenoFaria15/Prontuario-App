import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import UnidadeService from "../app/services/unidadeServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

class CadastroUnidade extends React.Component {


    constructor(props) {
        super(props);
        this.service = new UnidadeService();

        this.state = {
            id_unidade: props.match.params.id,
            cnes: '',
            razaoSocial: '',
            logradouro: '',
            numero: '',
            cep: '',
            bairro: '',
            complemento: '',
            municipio: '',
            telefone: '',
            nomeFantasia:''
        }
    }

    componentDidMount() {
        if (this.state.id_unidade === "_add") {
            return false;
        } else {
            this.service.buscarPorId(this.state.id_unidade).then(
                (response) => {
                    let unidade = response.data;
                    this.setState(
                        {
                            cnes: unidade.cnes,
                            razaoSocial: unidade.razaoSocial,
                            logradouro: unidade.logradouro,
                            numero: unidade.numero,
                            cep: unidade.cep,
                            bairro: unidade.bairro,
                            complemento: unidade.complemento,
                            municipio: unidade.municipio,
                            telefone: unidade.telefone,
                            nomeFantasia: unidade.nomeFantasia
                        }



                    );
                }


            )
        }
    }

    validar() {
        const msg = []
        if (!this.state.nomeFantasia ||  this.state.nomeFantasia.length<5) {
            msg.push("Digite um Nome valido")
        }


        if (!this.state.cnes && this.state.cnes.length !== 8) {
            msg.push("Digite um Cnes valido")
        }
        if (!this.state.razaoSocial) {
            msg.push("Digite uma Razão Social valida")
        }
        if (!this.state.municipio) {
            msg.push("Digite um municipio valido")
        }

        return msg
    }


    cadastrar = () => {
        const msg = this.validar();

        if (msg && msg.length > 0) {
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const unidade = {
            cnes: this.state.cnes,
            razaoSocial: this.state.razaoSocial,
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            cep: this.state.cep,
            bairro: this.state.bairro,
            complemento: this.state.complemento,
            municipio: this.state.municipio,
            telefone: this.state.telefone,
            nomeFantasia: this.state.nomeFantasia
        }


        if (this.state.id_unidade === "_add") {
            this.service.salvar(unidade).then(response => {
                mensagemOk('Unidade Cadastrada !')
                this.props.history.push('/unidades')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
        } else {
            unidade.id_unidade = this.state.id_unidade
            this.service.atualizar(unidade).then(
                response => {
                    mensagemOk('Unidade Editada com Sucesso')
                    this.props.history.push('/unidades')
                }
            ).catch(
                error => {
                    mensagemErro(error.response.data)
                }
            )
        }
    }

    cancelarCadastro = () => {
        this.props.history.push('/unidades')
    }



    render() {
        return (
            <div className="container-fluid">
            <div className="formcad">
                <div className="formcadastrouni">
                    <form>
                        <fieldset>
                            <legend>Cadastro de Unidades</legend>
                            <div className="form-row">
                            <div className="col-md-8 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nome</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Nome Fantasia"
                                    name="razaoSocial" onChange={e => this.setState({nomeFantasia: e.target.value})} value={this.state.nomeFantasia}
                                    maxLength="100"></input>
                                </div>
                                </div>
                                <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Telefone</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Telefone"
                                    name="telefone" onChange={e => this.setState({telefone: e.target.value})} value={this.state.telefone}
                                    maxLength="15"></input>
                                </div>
                            </div>
                            
                            </div>
                            <br></br>
                            <div className="form-row">
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Razão Social</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Razão Social"
                                    name="razaoSocial" onChange={e => this.setState({razaoSocial: e.target.value})} value={this.state.razaoSocial}
                                    maxLength="50"></input>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="form-group ">
                                    <label htmlFor="exampleInputEmail1">Cnes</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Cnes"
                                    name="cnes" onChange={e => this.setState({cnes: e.target.value})} value={this.state.cnes}
                                    maxLength="8"></input>
                                </div>
                            </div>
                            </div>
                            <br></br>
                            <div className="form-row">
                           
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Numero</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Numero"
                                    name="numero" onChange={e => this.setState({numero: e.target.value})} value={this.state.numero}
                                    maxLength="5"></input>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Logradouro</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Logradouro"
                                    name="logradouro" onChange={e => this.setState({logradouro: e.target.value})} value={this.state.logradouro}
                                    maxLength="50"></input>
                                </div>
                            </div> 
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">CEP</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CEP"
                                    name="cep" onChange={e => this.setState({cep: e.target.value})} value={this.state.cep}
                                    maxLength="10"></input>
                                </div>
                            </div>
                            </div>
                            <br></br>
                            <div className="form-row">
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Bairro</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Bairro"
                                    name="bairro" onChange={e => this.setState({bairro: e.target.value})} value={this.state.bairro}
                                    maxLength="20"></input>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Complemento</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Complemento"
                                    name="complemento" onChange={e => this.setState({complemento: e.target.value})} value={this.state.complemento}
                                    maxLength="25"></input>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Municipio</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Municipio"
                                    name="municipio" onChange={e => this.setState({municipio: e.target.value})} value={this.state.municipio}
                                    maxLength="30"></input>
                                </div>
                            </div>
                            </div>
                            <br></br>
                       
                        </fieldset >
                    </form >
                    <br></br>       
                    <button type="button" className="btn btn-primary btn-space" 
                        onClick={this.cadastrar} >Cadastrar</button>

                        <button type="button" className="btn btn-danger btn-space"
                        onClick={this.cancelarCadastro}>Cancelar</button>
                </div >
            </div >
        </div>



        )
    }










}

export default withRouter (CadastroUnidade);