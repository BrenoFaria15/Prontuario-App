import React from "react"
import '../css/custom.css'
import imagemLogin from '../css/user.png'
import UsuarioService from "../app/services/usuarioServices"
import LocalStorageService from "../app/services/localStorageService"
import { mensagemErro } from "../components/toastr"
import ImagemLogo from '../css/logo.png'
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import NavbarLogin from "../components/navbarlogin"
import UnidadeService from "../app/services/unidadeServices";


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
class Login extends React.Component {
    state = {
        nome: '',
        senha: '',
        show: false,
        unidades:[]
    }

    constructor() {
        super();
        this.service = new UsuarioService();
        this.unidadeService = new UnidadeService();
    }
    entrar = () => {
        this.service.autenticar({
            nome: this.state.nome,
            senha: this.state.senha
        }).then(response => {
            this.selectUnidade()
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            
            //this.props.history.push('/')
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

   

    selectUnidade = () =>{
        this.setState({ show: true })
    }

    componentDidMount(){
        this.getUnidades();
    }

    getUnidades(){
        this.unidadeService.buscarTodos().then(
            (response) =>
               this.setState({unidades:response.data}));
               
    }

    entrarUnidade = (unidade) =>{
        LocalStorageService.adicionarItem('_unidade_logada', unidade)
        this.props.history.push('/')
    }       


    render() {
        return (
            <>
                <NavbarLogin />
                <div className="container-fluid">
                    <form className="formlogin">
                        <div className="card" >
                            <div className="cardtop">
                                <img src={imagemLogin} alt=""></img>
                                <br></br>
                                <br></br>
                                <h3 >Login</h3>
                            </div>

                            <label htmlFor="nome" className="col-sm-2 col-form-label">Usuario</label>
                            <input type="text" value={this.state.nome}
                                onChange={e => this.setState({ nome: e.target.value })}
                                className="form-control" id="usuario" placeholder="Usuario"></input>
                            <br></br>
                            <label htmlFor="senha">Senha</label>
                            <input type="password"
                                value={this.state.senha}
                                onChange={e => this.setState({ senha: e.target.value })}
                                className="form-control" id="senha" placeholder="Senha"></input>
                            <br></br>
                            <button type="submit" onClick={this.entrar} className="btn btn-primary">Entrar</button>
                        </div>

                    </form>
                    <div>
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
                            { this.state.unidades.map(
                                    unidade =>
                                <tr className="table-primary">
                                    <th scope="row">{unidade.id_unidade}</th>
                                    <td>{unidade.nomeFantasia}</td>
                                    <td>{unidade.cnes}</td>
                                    <td>{unidade.telefone}</td>
                                    <td>
                                    <button type="button" className="btn btn-primary btn-space"
                                        onClick={() =>this.entrarUnidade(unidade)}>Entrar</button>
                        
                                    </td>

                                </tr>
                                )
                            }
                            </tbody>
                        </table>
                        </Dialog>

                    </div>


                </div>
            </>
        )
    }



}

export default Login;