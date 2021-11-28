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
                <Route exact path="/atendimentos" component={listAtendimentos}/>
                <Route exact path="/exames" component={ListaExames}/>
                <Route  exact path="/exames/cadastro/:id" component={CadastroExame}/>
                <Route  exact path="/exames/lancarexame/:id" component={LancarExame}/>
                <Route  exact path="/atendimentos/novo/:id" component={NovoAtendimento}/>
                <Route  exact path="/atendimentos/consulta/:id" component={Consulta}/> 
                <Route  exact path="/atendimentos/consulta/historico/:id" component={HistoricoConsulta}/>
                <Route  exact path="/atendimentos/consulta/historico/lista/:id" component={HistoricoLista}/>                
                <Route  exact path="/tipoatendimentos" component={TipoAtendimentoLista}/>
                <Route  exact path="/tipoatendimentos/cadastro/:id" component={CadastroTipoAtentimento}/>
                <Route  exact path="/agenda" component={ListaAgenda}/>
                <Route  exact path="/agenda/cadastro/:id" component={CadastroAgenda}/>
               
            </Switch>
         </HashRouter>   
        </> 
    )

}

export default Rotas;