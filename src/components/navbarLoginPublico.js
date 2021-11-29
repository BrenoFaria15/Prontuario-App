import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import ImagemLogo from '../css/logo.png'

//<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
//<span className="navbar-toggler-icon"></span>
//</button>
function NavbarLoginPublico() {
  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    
          <img className="imagemlogo" src={ImagemLogo}>
          </img>
          
          
          
      </nav>
    



  )



}

export default NavbarLoginPublico;