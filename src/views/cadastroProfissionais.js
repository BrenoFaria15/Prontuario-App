import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'
import ProfissionalService from "../app/services/profissionalServices";
import { mensagemErro, mensagemOk } from "../components/toastr"

class CadastroProfissional extends React.Component {


    /*private String nome;
    private String celular;
    private String cns;
    private String cpf;
    private String rg;
    private String logradouro;
    private String numero;
    private String cep;
    private String bairro;
    private String complemento;
    
    
    private String municipio;
    private String especialidade;
    private String nome_conselho;
    private String cd_conselho;*/


    constructor(props){
        super(props);
        this.service=new ProfissionalService();

          this.state = {
        id_profissional:props.match.params.id,
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
        especialidade: '',
        nomeConselho: '',
        cdConselho:'',
        dataNascimento:'',
        flgAtivo:true,
       

    }
    }

    componentDidMount() {
        
        if (this.state.id_profissional === "_add") {
            return false;
        } else {
            this.service.buscarPorId(this.state.id_profissional).then(
                (response) => {
                    let profissional = response.data;
                    this.setState(
                        {
                            nome: profissional.nome,
                            celular: profissional.celular,
                            cns: profissional.cns,
                            cpf: profissional.cpf,
                            rg: profissional.rg,
                            logradouro: profissional.logradouro,
                            numero: profissional.numero,
                            cep: profissional.cep,
                            bairro: profissional.bairro,
                            complemento: profissional.complemento,
                            municipio: profissional.municipio,
                            especialidade: profissional.especialidade,
                            nomeConselho: profissional.nomeConselho,
                            cdConselho:profissional.cdConselho,
                            dataNascimento:profissional.dataNascimento,
                            flgAtivo:profissional.flgAtivo,
                            
                        }



                    );
                }


            )
        }

       // this.checarCor();
    }

    validarCheckBox = (e) => {
       let valor = this.state.flgAtivo
       valor=e.target.checked
       this.setState({flgAtivo:valor})
       /*var corCheck = document.getElementById('checkAtivo')
       if(valor){
        this.setState({nomeflgAtivo:'Ativo'})
           corCheck.style.color='green'
       }else{
        this.setState({nomeflgAtivo:'Inativo'})
        corCheck.style.color='red'
        
       }*/
    }
    validar(){
        const msg = []
        if (!this.state.nome ||  this.state.nome.length<5) {
            msg.push("Digite um Nome valido")
       }
        if (!this.state.cns || this.state.cns.length!==15) {
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
        if (!this.state.especialidade) {
            msg.push("Digite uma Especialidade valida")
        }
        if (!this.state.dataNascimento) {
            msg.push("Digite uma Data de nascimento valida")
        }
        return msg;
    }

   /* checarCor(){
        console.log(this.state.flgAtivo)
        var corCheck = document.getElementById('checkAtivo');
        var checkbox=document.getElementById('checkbox1').checked;
       
        if(this.state.flgAtivo){
            this.setState({nomeflgAtivo:'Ativo'})
            corCheck.style.color='green'
        }else{
            this.setState({nomeflgAtivo:'Inativo'})
            corCheck.style.color='red'
        }
    
    }*/

    cadastrar = () => {
        
        
        const msg = this.validar();

        if (msg && msg.length > 0) {
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const profissional = {
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
            especialidade: this.state.especialidade,
            nomeConselho: this.state.nomeConselho,
            cdConselho:this.state.cdConselho,
            dataNascimento:this.state.dataNascimento,
            flgAtivo:this.state.flgAtivo
        }
       

        if (this.state.id_profissional === "_add") {
            this.service.salvar(profissional).then(response => {
                mensagemOk('Profissional Cadastrado !')
                this.props.history.push('/profissionais')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
        } else {
            profissional.id_profissional = this.state.id_profissional
            this.service.atualizar(profissional).then(
                response => {
                    mensagemOk('Profissional Editado com Sucesso')
                    this.props.history.push('/profissionais')
                }
            ).catch(
                error => {
                    mensagemErro(error.response.data)
                }
            )
        }
    }

    



    cancelarCadastro = () => {
        this.props.history.push('/profissionais')
    }

    


    render() {
        return (
            <div className="formcad">
                <div className="formcadastrouni">
                    <form>
                        <fieldset>
                            <legend>Cadastro de Profissionais</legend>
                            <div className="col-md-2 right">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Data de Nascimento</label>
                                        <input type="date" className="form-control" id="exampleInputEmail1"
                                        onChange={e => this.setState({dataNascimento: e.target.value})} value={this.state.dataNascimento}></input>
                                    </div>
                                </div>
                            <div className="form-row">
                                <div className="form-group col-md-8 ">
                                    <label htmlFor="exampleInputEmail1">Nome</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Nome Completo"
                                    maxLength="100"  onChange={e => this.setState({nome:e.target.value})} value={this.state.nome}></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="exampleInputEmail1">Celular</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Celular"
                                     maxLength="15"  onChange={e => this.setState({celular: e.target.value})} value={this.state.celular}></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">CNS</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Cartão SUS"
                                         maxLength="15" onChange={e => this.setState({cns: e.target.value})} value={this.state.cns}></input>
                                    </div>
                                </div>


                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">CPF</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CPF"
                                         maxLength="14" onChange={e => this.setState({cpf: e.target.value})} value={this.state.cpf} ></input>
                                    </div>
                                </div>

                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">RG</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="RG"
                                        maxLength="11"  onChange={e => this.setState({rg: e.target.value})} value={this.state.rg}></input>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="form-row">
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Logradouro</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Logradouro"
                                          maxLength="50" onChange={e => this.setState({logradouro: e.target.value})} value={this.state.logradouro}></input>
                                    </div>
                                </div>

                                <div className="col-md-2 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Número</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Número"
                                         maxLength="5" onChange={e => this.setState({numero: e.target.value})} value={this.state.numero}></input>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">CEP</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CEP"
                                         maxLength="9"  onChange={e => this.setState({cep: e.target.value})} value={this.state.cep}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Bairro</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Bairro"
                                         maxLength="25" onChange={e => this.setState({bairro: e.target.value})} value={this.state.bairro}></input>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Complemento</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Complemento"
                                        maxLength="30"  onChange={e => this.setState({complemento: e.target.value})} value={this.state.complemento}></input>
                                    </div>
                                </div>

                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Municipio</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Municipio"
                                         maxLength="25" onChange={e => this.setState({municipio: e.target.value})} value={this.state.municipio}></input>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="form-row">
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Especialidade</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Especialidade"
                                          maxLength="50" onChange={e => this.setState({especialidade: e.target.value})} value={this.state.especialidade}></input>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Conselho</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Conselho"
                                        maxLength="10"  onChange={e => this.setState({nomeConselho: e.target.value})} value={this.state.nomeConselho}></input>
                                    </div>
                                </div>
                                <div className="col-md-2 ">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Número do Conselho</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Número"
                                         maxLength="5" onChange={e => this.setState({cdConselho: e.target.value})} value={this.state.cdConselho }></input>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="form-check">
                                <label className="form-check-label left" htmlFor="flexCheckDefault  " id="checkAtivo"> 
                                    Ativo
                                    <input className="form-check-input" type="checkbox"  id="checkbox1"  checked={this.state.flgAtivo}
                                        
                                  onChange={e =>this.validarCheckBox(e)}></input>
                                </label>
                                
                            </div>
                            <br></br>
                            <br></br>
                            <button type="button" className="btn btn-primary btn-space"
                                onClick={this.cadastrar} >Cadastrar</button>

                            <button type="button" className="btn btn-danger btn-space"
                                onClick={this.cancelarCadastro}>Cancelar</button>
                        </fieldset>


                    </form>

                </div>
            </div>
        )
    }

}

export default withRouter(CadastroProfissional);