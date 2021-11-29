import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import ImagemLogo from '../css/logo.png'
import AuthService from "../app/services/authService";

//<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
//<span className="navbar-toggler-icon"></span>
//</button>

const deslogar = () =>{
  AuthService.removerPacienteLogado();
 
}



function NavbarPublico() {
  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    
          <img className="imagemlogo" src={ImagemLogo}>
          </img>
          
          <div className="collapse navbar-collapse" id="navbarColor01">

            <ul className="navbar-nav me-auto">
            <li className="nav-item active">
                <a className="nav-link sizeletra" href="#/resultadosexames">Resultados de exames
                  
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link sizeletra" href="#/agendaspaciente">Agendamentos
                  
                </a>
              </li>

              
              <li className="nav-item active">
                <a className="nav-link sizeletra" onClick={deslogar} href="#/login">Sair
                  
                </a>
              </li>
            

            </ul>
          </div>
          
      </nav>
    



  )



}

export default NavbarPublico;