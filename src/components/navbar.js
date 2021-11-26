import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import ImagemLogo from '../css/logo.png'

//<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
//<span className="navbar-toggler-icon"></span>
//</button>
function Navbar() {
  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#/">
          <img className="imagemlogo" src={ImagemLogo}>
          </img>
          </a>
          <div className="collapse navbar-collapse" id="navbarColor01">

            <ul className="navbar-nav me-auto">
            <li className="nav-item active">
                <a className="nav-link sizeletra" href="#/atendimentos">Atendimentos
                  
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link sizeletra" href="#/usuarios/">Agenda</a>
              </li>
            
              <li className="nav-item active">
                <a className="nav-link sizeletra" href="#/pacientes">Pacientes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link sizeletra" href="#/exames">Exames</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sizeletra" href="#/profissionais">Profissionais</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sizeletra" href="#/unidades">Unidades</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sizeletra" href="#/usuarios/">Usuarios</a>
              </li>
              

            </ul>
          </div>
          
      </nav>
    



  )



}

export default Navbar;