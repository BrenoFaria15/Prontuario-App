
import React from 'react';
import Rotas from './main/rotas'
import {Route,Switch,HashRouter} from 'react-router-dom'

import 'bootswatch/dist/cerulean/bootstrap.css'
import Login from './views/login';
import Navbar from './components/navbar';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import HomePublico from './views/homePublico';
import BuscarPaciente from './views/buscarPaciente';
import ExamesLista from './views/examesLista';




function App() {
  return (
    <>
    <div>
    <HashRouter>
            <Switch>
             <Route  exact path="/resultadosexames" component={ExamesLista}/>
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
