import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import  '../css/custom.css'
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/services/usuarioServices";
import { mensagemErro,mensagemOk} from "../components/toastr"
class CadastroUsuario extends React.Component {

   

    constructor(props){
        super(props);
        this.service = new UsuarioService();

        this.state = {
            id_usuario:props.match.params.id,
            nome: '',
            senha: '',
            senhaRepeticao:'',
            tipoUsuario:''
        }
    }

    componentDidMount(){
        if(this.state.id_usuario ==="_add"){
            return false;
        }else{
            this.service.buscarPorId(this.state.id_usuario).then(
                (response)=>{
                    let usuario = response.data;
                    this.setState(
                        {
                            nome: usuario.nome,
                            senha:usuario.senha,
                            tipoUsuario:usuario.tipoUsuario
                        }



                    );
                }


            )
        }
    }


    validar(){
        const msg = []
        if(!this.state.nome){
           msg.push("Digite um Usuario valido")
      }

      if(this.state.senha.length<4){
        msg.push("Sua senha deve conter pelo menos 4 caracteres") 
      }
      if(!this.state.tipoUsuario){
        msg.push("Selecione um Perfil")
      }

      if(!this.state.senha  ){
        msg.push("Digite uma Senha Valida")
      }

      if(!this.state.senhaRepeticao  ){
        msg.push("Confirme sua Senha")
      }

      if(this.state.senha !== this.state.senhaRepeticao  ){
        msg.push("Suas senhas não Conferem")
      }
     

       return msg;
    }


      cadastrar = () =>{
        const msg = this.validar();

        if(msg && msg.length>0){
            msg.forEach((msg, index) => {
                mensagemErro(msg);
            } );
            return false;
        }

        const usuario ={
            nome: this.state.nome,
            senha: this.state.senha,
            tipoUsuario: this.state.tipoUsuario
        }
        this.service.salvar(usuario).then(response =>{
            mensagemOk('Usuario Cadastrado !')
            this.props.history.push('/usuarios') 
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
      } 

      cancelarCadastro = () =>{
        this.props.history.push('/usuarios') 
      }


    render() {
        return (
            
            <div className="container-fluid">
                <div className="formcad">
                    <div className="formcadastro">
                        <form>
                            <fieldset>
                                <legend>Cadastro de usuarios</legend>
                            </fieldset>
                        </form>
                        <div className="form-group">
                            <label htmlFor="inputUsuario">Usuario</label>
                            <input type="text" className="form-control" id="inputUsuario" placeholder="Usuario"
                            name="usuario" onChange={e => this.setState({nome: e.target.value})} value={this.state.nome}
                            ></input>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="inputSenha">Senha</label>
                            <input type="password" className="form-control" id="inputSenha" placeholder="Senha"
                            name="senha"   onChange={e => this.setState({senha: e.target.value})}
                            ></input>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="inputsenhaRepeticao">Confime sua Senha</label>
                            <input type="password" className="form-control" id="inputsenhaRepeticao" placeholder="Confirrme sua Senha"
                            name="senha" onChange={e => this.setState({senhaRepeticao: e.target.value})}
                            ></input>
                        </div>
                        <div className="formperfil">
                            <fieldset className="form-group">
                                <br></br>
                                <legend>Perfil</legend>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="perfil" id="radioMedico" value="MEDICO" checked=""
                                        checked={this.state.perfil === "MEDICO"}
                                        onChange={e => this.setState({tipoUsuario: e.target.value})}></input>
                                        Medico
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="perfil" id="radioEnfermagem" value="ENFERMEIRO"
                                       checked={this.state.perfil === "ENFERMEIRO"}
                                       onChange={e => this.setState({tipoUsuario: e.target.value})} ></input>
                                        Enfermagem
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="perfil" id="radioRecepcao" value="RECEPCAO"
                                        checked={this.state.perfil === "RECEPCAO"}
                                        onChange={e => this.setState({tipoUsuario: e.target.value})}></input>
                                        Recepção
                                    </label>
                                </div>
                            </fieldset>

                        </div>
                        <br></br>
                        <button type="button" className="btn btn-primary btn-space" 
                        onClick={this.cadastrar} >Cadastrar</button>

                        <button type="button" className="btn btn-danger btn-space"
                        onClick={this.cancelarCadastro}>Cancelar</button>
                    </div>
                </div>
            </div>

            
        )
    }


}

export default withRouter(CadastroUsuario)