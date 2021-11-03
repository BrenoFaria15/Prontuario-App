import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import {withRouter} from 'react-router-dom'

class ListaProfissionais extends React.Component {

    prepareCadastrar= () =>{
        this.props.history.push('/usuarios/cadastro')


    }

    render() {
        return (
            <div className="container-fluid">
                <div className="formcad">
                    <div className="lista">
                        <legend >Profissionais</legend>
                         <br></br>
                         <br></br>
                        <button type="button" className="btn btn-primary "
                        onClick={this.prepareCadastrar}>Novo</button>
                        <br></br>
                        <br></br>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Especialidade</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-primary">
                                    <th scope="row">Primary</th>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-space">Editar</button>
                                        <button type="button" className="btn btn-danger btn-space">Excluir</button>
                                    </td>

                                </tr>
                                <tr>

                                </tr>
                                <tr>

                                </tr>


                            </tbody>
                        </table>
                        
                    </div>

                </div>
            </div>

        )
    }
}

export default withRouter (ListaProfissionais)