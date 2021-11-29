
import React from 'react';
import Rotas from './main/rotas'
import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'

import 'bootswatch/dist/cerulean/bootstrap.css'
import Login from './views/login';
import Navbar from './components/navbar';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import HomePublico from './views/homePublico';
import BuscarPaciente from './views/buscarPaciente';
import ExamesLista from './views/examesLista';
import AgendaLista from './views/agendaLista';
import AuthService from './app/services/authService';


function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
  return (
      <Route exact {...props} render={ (componentProps) => {
          if(AuthService.isPacienteAutenticado()){
              return (
                  <Component {...componentProps} />
              )
          }else{
              return(
                  <Redirect to={ {pathname : '/buscarpaciente', state : { from: componentProps.location } } } />
              )
          }
      }}  />
  )
}


function App() {
  return (
    <>
    <div>
    <HashRouter>
            <Switch>
            <RotaAutenticada  exact path="/agendaspaciente" component={AgendaLista}/>
             <RotaAutenticada  exact path="/resultadosexames" component={ExamesLista}/>
            <Route  exact path="/modulopublico" component={HomePublico}/>
              <Route  exact path="/modulopublico" component={HomePublico}/>
              <Route  exact path="/buscarpaciente" component={BuscarPaciente}/>
                <Route exact path="/login" component={Login}/> 
                <Route path="/" component={Navbar}/> 
            </Switch>
         </HashRouter>  
    </div>
    <div >
      <Rotas/>
    </div>
    </>
  );
}

export default App;
