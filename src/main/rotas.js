import React from "react";

import {Route,Switch,HashRouter} from 'react-router-dom'
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import listaPacientes from "../views/listaPacientes";
import listaProfissionais from "../views/listaProfissionais";
import listaUnidades from "../views/listaUnidades";
import ListaUsuario from "../views/listaUsuarios";
import Login from "../views/login";

function Rotas(){
    return(
        <>
        
        <HashRouter>
            <Switch>
                <Route  exact path="/usuarios/cadastro" component={CadastroUsuario}/>
                <Route  exact path="/usuarios" component={ListaUsuario}/>
                <Route  exact path="/" component={Home}/>
                <Route  exact path="/pacientes" component={listaPacientes}/>
                <Route  exact path="/profissionais" component={listaProfissionais}/>
                <Route  exact path="/unidades" component={listaUnidades}/>
                <Route  exact path="/usuarios/cadastro/:id" component={CadastroUsuario}/>
            </Switch>
         </HashRouter>   
        </> 
    )

}

export default Rotas;