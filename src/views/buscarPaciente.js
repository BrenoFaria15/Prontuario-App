import React from "react";
import NavbarPublico from "../components/navbarPublico"
import PacienteService from "../app/services/pacienteServices";
import { mensagemErro, mensagemOk } from "../components/toastr"
import LocalStorageService from "../app/services/localStorageService"
import NavbarLoginPublico from "../components/navbarLoginPublico";

class BuscarPaciente extends React.Component {
    state = {
        cns: ''

    }
    constructor() {
        super();
        this.service = new PacienteService();
    }

    entrar = () => {
        this.service.buscarPorCns(this.state.cns

        ).then(response => {
            LocalStorageService.adicionarItem('_paciente_logado', response.data);
            mensagemOk('Login Efetuado com Sucesso!');
            this.props.history.push('/modulopublico')
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

    render() {
        return (
            <>
                <NavbarLoginPublico />
                <div className="container-fluid">
                    <form className="formlogin">
                        <div className="card center" >

                            <legend >Entrar no Módulo Publico</legend>


                            <br></br>


                            <input type="text"
                                onChange={e => this.setState({ cns: e.target.value })} value={this.state.cns}
                                className="form-control center" id="senha" maxLength="15" placeholder="Digite seu cartão SUS"></input>
                            <br></br>
                            <button type="submit" className="btn btn-primary" onClick={() => this.entrar()}>Entrar</button>
                        </div>

                    </form>

                </div>
            </>

        )
    }
}

export default BuscarPaciente