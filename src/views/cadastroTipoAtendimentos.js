import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import tipoAtendimentoService from "../app/services/tipoAtendimentoServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

class CadastroTipoAtentimento extends React.Component{
    constructor(props) {
        super(props);
        this.service = new tipoAtendimentoService();

        this.state = {
            id_tipo_atendimento: props.match.params.id,
            nome: '',
            descricao:''

        }
    }

    componentDidMount(){
        
       
        if (this.state.id_tipo_atendimento === "_add") {
            return false;
        } else {
            this.service.buscarPorId(this.state.id_tipo_atendimento).then(
                (response) => {
                    let tipo = response.data;
                    this.setState(
                        {
                            nome: tipo.tipoNome,
                            descricao:tipo.descricao
                            
                        }



                    );
                }


            )
            }
        
        }
    validar(){
        const msg = []
        if (!this.state.nome ) {
            msg.push("Digite um Nome valido")
       }

       return msg
    }  

    cancelarCadastro = () => {
        this.props.history.push('/tipoatendimentos')
    }
    cadastrar = () => {
        const msg = this.validar();

        if (msg && msg.length > 0) {
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const tipoAtend = {
            tipoNome: this.state.nome,
            descricao:this.state.descricao
         
        }
        if (this.state.id_tipo_atendimento === "_add") {
            this.service.salvar(tipoAtend).then(response => {
                mensagemOk('Tipo de Atendimento Cadastrado!')
                this.props.history.push('/tipoatendimentos')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
        } else {
            tipoAtend.id_tipo_atendimento = this.state.id_tipo_atendimento
            this.service.atualizar(tipoAtend).then(
                response => {
                    mensagemOk('Tipo de Atendimento Editado com Sucesso')
                    this.props.history.push('/tipoatendimentos')
                }
            ).catch(
                error => {
                    mensagemErro(error.response.data)
                }
            )
        }
    }
    render(){
        return(
            <div class="container-fluid">
                <div class="formcad">
                    <div class="formcadastrouni">
                        <form>
                            <fieldset>
                                <legend>Cadastro de Tipos de Atendimento</legend>
                                <br></br>
                                <div class="form-row ">
                                    <div class="col-md-8 center">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Nome </label>
                                            <input type="text" class="form-control" id="exampleInputEmail1"
                                                placeholder="Nome"
                                                maxLength="100"  onChange={e => this.setState({nome:e.target.value})} value={this.state.nome}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
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

export default CadastroTipoAtentimento

