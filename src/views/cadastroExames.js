import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemOk } from "../components/toastr"
import ExameService from "../app/services/exameServices";

class CadastroExame extends React.Component {

    constructor(props) {
        super(props);
        this.service = new ExameService();

        this.state = {
            id_exame: props.match.params.id,
            nome: '',
            codSus:'',
            descricao:''

        }
    }
    componentDidMount(){
        
       
        if (this.state.id_exame === "_add") {
            return false;
        } else {
            this.service.buscarPorId(this.state.id_exame).then(
                (response) => {
                    let exame = response.data;
                    this.setState(
                        {
                            nome: exame.nome,
                            codSus:exame.codSus,
                            descricao:exame.descricao
                            
                        }



                    );
                }


            )
            }
        
        }

    cancelarCadastro = () => {
        this.props.history.push('/exames')
    }

    validar(){
        const msg = []
        if (!this.state.nome ) {
            msg.push("Digite um Nome valido")
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

        const exame = {
            nome: this.state.nome,
            codSus:this.state.codSus,
            descricao:this.state.descricao
         
        }
        if (this.state.id_exame === "_add") {
            this.service.salvar(exame).then(response => {
                mensagemOk('Exame Cadastrado!')
                this.props.history.push('/exames')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
        } else {
            exame.id_exame = this.state.id_exame
            this.service.atualizar(exame).then(
                response => {
                    mensagemOk('Exame Editado com Sucesso')
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
            <div class="container-fluid">
                <div class="formcad">
                    <div class="formcadastrouni">
                        <form>
                            <fieldset>
                                <legend>Cadastro de exames</legend>
                                <div class="form-row ">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Codigo SUS</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1"
                                                placeholder="Codigo"
                                                maxLength="100"  onChange={e => this.setState({codSus:e.target.value})} value={this.state.codSus}></input>
                                        </div>
                                    </div>
                                    <div class="col-md-8 ">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Nome do Exame</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1"
                                                placeholder="Nome do Exame"
                                                maxLength="100"  onChange={e => this.setState({nome:e.target.value})} value={this.state.nome}></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-8 center">
                                        <div class="form-group">
                                            <label for="exampleTextarea">Descrição</label>
                                            <textarea class="form-control" id="exampleTextarea" rows="3"
                                             maxLength="100"  onChange={e => this.setState({descricao:e.target.value})} value={this.state.descricao}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <button type="button" class="btn btn-primary btn-space"
                                    onClick={this.cadastrar}>Cadastrar</button>

                                <button type="button" class="btn btn-danger btn-space"
                                    onClick={this.cancelarCadastro}>Cancelar</button>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>


        )
    }

}

export default CadastroExame