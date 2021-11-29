import React from "react";

import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'
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
import listAtendimentos from "../views/listaAtendimentos";
import ListaExames from "../views/listaExames";
import CadastroExame from "../views/cadastroExames";
import LancarExame from "../views/lancarExame";
import NovoAtendimento from "../views/novoAtendimento";
import Consulta from "../views/consulta";
import TipoAtendimentoLista from "../views/tipoAtendimentoLista";
import CadastroTipoAtentimento from "../views/cadastroTipoAtendimentos";
import HistoricoConsulta from "../views/historicoConsulta";
import HistoricoLista from "../views/historicoLista";
import ListaAgenda from "../views/listaAgenda";
import CadastroAgenda from "../views/cadastroAgenda";
import HomePublico from "../views/homePublico";
import HistoricoExames from "../views/historicoExames";
import AuthService from "../app/services/authService";

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return (
        <Route exact {...props} render={ (componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } } />
                )
            }
        }}  />
    )
}



function Rotas(){
    return(
        <>
        
        <HashRouter>
            <Switch>
                <RotaAutenticada exact path="/unidades/cadastro/:id" component={CadastroUnidade}/>
                <RotaAutenticada  exact path="/usuarios/cadastro/:id" component={CadastroUsuario}/>
                <RotaAutenticada  exact path="/usuarios" component={ListaUsuario}/>
                <RotaAutenticada exact path="/" component={Home}/>
                <RotaAutenticada  exact path="/pacientes" component={listaPacientes}/>
                <RotaAutenticada  exact path="/profissionais" component={listaProfissionais}/>
                <RotaAutenticada  exact path="/unidades" component={listaUnidades}/>
                <RotaAutenticada exact path="/profissionais/cadastro/:id" component={CadastroProfissional}/>
                <RotaAutenticada exact path="/pacientes/cadastro/:id" component={CadastroPaciente}/>
                <RotaAutenticada exact path="/atendimentos" component={listAtendimentos}/>
                <RotaAutenticada exact path="/exames" component={ListaExames}/>
                <RotaAutenticada  exact path="/exames/cadastro/:id" component={CadastroExame}/>
                <RotaAutenticada  exact path="/exames/lancarexame/:id" component={LancarExame}/>
                <RotaAutenticada  exact path="/atendimentos/novo/:id" component={NovoAtendimento}/>
                <RotaAutenticada  exact path="/atendimentos/consulta/:id" component={Consulta}/> 
                <RotaAutenticada  exact path="/atendimentos/consulta/historico/:id" component={HistoricoConsulta}/>
                <RotaAutenticada  exact path="/atendimentos/consulta/historico/lista/:id" component={HistoricoLista}/>    
                <RotaAutenticada exact path="/atendimentos/consulta/historico/exames/:id" component={HistoricoExames}/>              
                <RotaAutenticada  exact path="/tipoatendimentos" component={TipoAtendimentoLista}/>
                <RotaAutenticada  exact path="/tipoatendimentos/cadastro/:id" component={CadastroTipoAtentimento}/>
                <RotaAutenticada  exact path="/agenda" component={ListaAgenda}/>
                <RotaAutenticada  exact path="/agenda/cadastro/:id" component={CadastroAgenda}/>
               
            </Switch>
         </HashRouter>   
        </> 
    )

}

export default Rotas;