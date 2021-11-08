import React from "react";

import {Route,Switch,HashRouter} from 'react-router-dom'
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import listaPacientes from "../views/listaPacientes";
import listaProfissionais from "../views/listaProfissionais";
import listaUnidades from "../views/listaUnidades";
import ListaUsuario from "../views/listaUsuarios";
import Login from "../views/login";
import CadastroUnidade from "../views/cadastroUnidade";
import CadastroProfissional from "../views/cadastroProfissionais";
import CadastroPaciente from "../views/cadastroPacientes";


function Rotas(){
    return(
        <>
        
        <HashRouter>
            <Switch>
                <Route exact path="/unidades/cadastro/:id" component={CadastroUnidade}/>
                <Route  exact path="/usuarios/cadastro/:id" component={CadastroUsuario}/>
                <Route  exact path="/usuarios" component={ListaUsuario}/>
                <Route  exact path="/" component={Home}/>
                <Route  exact path="/pacientes" component={listaPacientes}/>
                <Route  exact path="/profissionais" component={listaProfissionais}/>
                <Route  exact path="/unidades" component={listaUnidades}/>
                <Route exact path="/profissionais/cadastro/:id" component={CadastroProfissional}/>
                <Route exact path="/pacientes/cadastro/:id" component={CadastroPaciente}/>
            </Switch>
         </HashRouter>   
        </> 
    )

}

export default Rotas;