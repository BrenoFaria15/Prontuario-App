import React from "react"
import  '../css/custom.css'
import imagemLogin from '../css/user.png'
import UsuarioService from "../app/services/usuarioServices"
import LocalStorageService from "../app/services/localStorageService"
import {mensagemErro} from "../components/toastr"
class Login extends React.Component{
    state ={
        nome:'',
        senha:''
    }

constructor(){
    super();
    this.service = new UsuarioService();
}
    entrar = () =>{
        this.service.autenticar({
            nome: this.state.nome,
            senha:this.state.senha
        }).then(response  =>{
           this.props.history.push('/')
           LocalStorageService.adicionarItem('_usuario_logado',response.data)
       }).catch(erro =>{
           mensagemErro(erro.response.data)
       })
    }
    
    
    
    render(){
        return(
        <div className="container-fluid">
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                <a className="navbar-brand" href="https://www.youtube.com/">Acessar Modulo Publico</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
                </button>
                </div>   
             </nav>
             <form className="formlogin">
                <div className="card" >
                    <div className="cardtop"> 
                        <img src={imagemLogin} alt=""></img>
                        <br></br>
                        <br></br>
                     <h3 >Login</h3>
                    </div>

                    <label htmlFor="nome" className="col-sm-2 col-form-label">Usuario</label>
                    <input type="text" value={this.state.nome} 
                    onChange={e => this.setState({nome: e.target.value})}
                    className="form-control" id="usuario"  placeholder="Usuario"></input>
                     <br></br>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" 
                    value={this.state.senha} 
                    onChange={e => this.setState({senha: e.target.value})}
                    className="form-control" id="senha" placeholder="Senha"></input>   
                    <br></br>
                    <button type="submit" onClick={this.entrar} className="btn btn-primary">Entrar</button>
            </div> 
            </form>
            
    
        </div>   
        
        )
    }



}

export default Login;