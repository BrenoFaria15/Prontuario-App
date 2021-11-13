import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import { withRouter } from 'react-router-dom'

class NovoAtendimento extends React.Component {

    state = {

    }
    constructor() {
        super();
    }

    cancelarCadastro = () =>{
        this.props.history.push('/atendimentos')
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="formcadastrouni">
                        <legend>Novo Atendimento</legend>
                        <form>
                            <fieldset>
                                <div className="form-row">

                                    <div className="form-group col-md-8 center">
                                        <label htmlFor="exampleInputEmail1">Nome do Paciente</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Nome do Paciente"></input>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-group col-md-8 center">
                                        <label htmlFor="exampleInputEmail1">Nome do Profissional</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1"
                                            placeholder="Nome do Profissional"></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-group col-md-4 center">
                                        <label htmlFor="exampleSelect1">Tipo de Atendimento</label>
                                        <select className="form-select" id="exampleSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                        <br></br>
                                        <button type="button" className="btn btn-primary btn-space btn-sm botaotipoatend">Cadastrar Tipo de Atendimento</button>
                                    </div>

                                </div>
                                <div className="form-row ">
                                    <div className="col-md-2 center">
                                        <div className="form-group ">
                                            <label htmlFor="exampleInputEmail1">Data </label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2  center">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Hora</label>
                                            <input type="time" className="form-control" id="exampleInputEmail1"></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <button type="button" className="btn btn-primary btn-space ">Cadastrar</button>
                                <button type="button" className="btn btn-danger btn-space"
                                onClick={this.cancelarCadastro}>Cancelar</button>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NovoAtendimento)