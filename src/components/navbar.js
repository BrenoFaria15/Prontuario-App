import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import ImagemLogo from '../css/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import AuthService from "../app/services/authService";
import { Dialog } from 'primereact/dialog';
import { Redirect } from "react-router";
import UnidadeService from "../app/services/unidadeServices";
import LocalStorageService from "../app/services/localStorageService";

//<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
//<span className="navbar-toggler-icon"></span>
//</button>

const deslogar = () => {
  AuthService.removerUsuarioLogado();

}


class Navbar extends React.Component {
  state = {
    unidades: [],
    show: false,
    showUsuario:false,
    showUnidade:false,
    showProfissional:false,
    showPaciente:false,
    showExame:false
  }

  constructor() {
    super();
    this.unidadeService = new UnidadeService();
  }

  trocarUnidade = () => {
    this.setState({ show: true })
  }

  componentDidMount() {
    //const profissional = document.getElementById("profissional")
    //const paciente = document.getElementById("paciente")
    //const unidade = document.getElementById("unidade")
    //const usuarioid = document.getElementById("usuario")
   // const exame = document.getElementById("exame")
    let usuario = LocalStorageService.obterItem('_usuario_logado')

    if(usuario){
    if(usuario.tipoUsuario=='RECEPCAO'){
      this.setState({
        showExame:true,
        showProfissional:true,
        showUnidade:true,
        showUsuario:true
      })
    }
      if(usuario.tipoUsuario=='MEDICO'){
        this.setState({
          showExame:true,
          showProfissional:true,
          showUnidade:true,
          showUsuario:true
        })}
     
        if(usuario.tipoUsuario=='ENFERMEIRO'){
          this.setState({
            showExame:true,
            showProfissional:true,
            showUnidade:true,
            showUsuario:true
          })}
        }
    this.getUnidades();
  }

  getUnidades() {
    this.unidadeService.buscarTodos().then(
      (response) =>
        this.setState({ unidades: response.data }));

  }

  entrarUnidade = (unidade) => {
    LocalStorageService.adicionarItem('_unidade_logada', unidade)
   this.setState({show:false})
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#/">
          <img className="imagemlogo" src={ImagemLogo}>
          </img>
        </a>
        <div className="collapse navbar-collapse" id="navbarColor01">

          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <a className="nav-link sizeletra" id="atendimento" href="#/atendimentos">Atendimentos

              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link sizeletra" id="agenda" href="#/agenda">Agenda</a>
            </li>

            <li className="nav-item active">
              <a className="nav-link sizeletra" id="paciente" hidden={this.state.showPaciente} href="#/pacientes">Pacientes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link sizeletra" id="exame" hidden={this.state.showExame} href="#/exames">Exames</a>
            </li>
            <li className="nav-item">
              <a className="nav-link sizeletra" id="profissional" hidden={this.state.showProfissional} href="#/profissionais">Profissionais</a>
            </li>
            <li className="nav-item">
              <a className="nav-link sizeletra" id="unidade" hidden={this.state.showUnidade} href="#/unidades">Unidades</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link sizeletra" id="usuario" hidden={this.state.showUsuario} href="#/usuarios/">Usuarios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link sizeletra" onClick={() => this.trocarUnidade()} href="#/">Trocar Unidade</a>
            </li>

            <li className="nav-item">
              <a className="nav-link sizeletra" onClick={deslogar} href="#/login">Sair</a>

            </li>

          </ul>
        </div>
        <Dialog header="Selecione a Unidade"
          visible={this.state.show}
          style={{ width: '50vw' }}
          onHide={() => this.setState({ show: false })}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome Fantasia</th>
                <th scope="col">CNES</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.state.unidades.map(
                unidade =>
                  <tr className="table-primary">
                    <th scope="row">{unidade.id_unidade}</th>
                    <td>{unidade.nomeFantasia}</td>
                    <td>{unidade.cnes}</td>
                    <td>{unidade.telefone}</td>
                    <td>
                      <button type="button" className="btn btn-primary btn-space"
                        onClick={() => this.entrarUnidade(unidade)}>Entrar</button>

                    </td>

                  </tr>
              )
              }
            </tbody>
          </table>
        </Dialog>

      </nav>




    )

  }

}

export default Navbar;