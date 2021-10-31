import React from "react"
import  '../css/login/login.css'
import imagemLogin from '../css/login/user.png'
class Login extends React.Component{
    state ={
        usuario:'',
        senha:''
    }


    entrar = () =>{
        console.log('Usuario: ',this.state.usuario)
        console.log('Senha: ',this.state.senha)
    }
    
    
    
    render(){
        return(
        <div>
            
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

                    <label for="usuario" className="col-sm-2 col-form-label">Usuario</label>
                    <input type="text" value={this.state.usuario} 
                    onChange={e => this.setState({usuario: e.target.value})}
                    className="form-control" id="usuario"  placeholder="Usuario"></input>
                     <br></br>
                    <label for="senha">Senha</label>
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