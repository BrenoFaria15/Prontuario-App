import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import '../css/custom.css'
import AtendimentoService from "../app/services/atendimentoServices";
import { mensagemErro, mensagemOk } from "../components/toastr"


/*private boolean flg_atendido; 

private float peso; 
private int altura; 
private float imc;
 bpm 
 private float temperatura; 
 private String glicemia; 
 private String saturacao; 
 private String avaliacao; 
 private String
 entrevistaClinica; 
 private String cid;
  pressao 1
   pressao 2!*/
class Consulta extends React.Component {

    constructor(props) {
        super(props);
        this.service = new AtendimentoService();
        this.state = {
            id_atendimento: props.match.params.id,
            peso: null,
            altura: null,
            imc: null,
            bpm: null,
            temperatura: null,
            glicemia: null,
            saturacao: null,
            avaliacao: null,
            hipotese:'',
            entrevistaClinica: '',
            cid: '',
            pressao1: null,
            pressao2: null,
            atendimento:null,
            id_paciente: null,
            id_profissional: null,
            id_tipo_atendimento:null,
            id_unidade:7,
            id_usuario:16,
            data:''

        }
    }

    componentDidMount(){
        this.getAtendimento()
        
    }

    preencherIds = () => {
        const data = this.state.atendimento
        this.setState({id_paciente:data.paciente.id_paciente,
        id_profissional:data.profissional.id_profissional,
        id_tipo_atendimento:data.tipoatendimento.id_tipo_atendimento,
        data:data.data})
        
        console.log(this.state.id_paciente)
        
    }

    getAtendimento(){
        this.service.buscarPorId(this.state.id_atendimento).then(
            (response) =>
               this.setState({atendimento:response.data})); 
               
        
    }
    
    cadastrar = () =>{
        //const msg = this.validar();

       // if(msg && msg.length>0){
        //    msg.forEach((msg, index) => {
       //         mensagemErro(msg);
        //    } );
        //    return false;
      //  }
      
        var data = new Date()
        var hora = data.getHours
        var min = data.getMinutes

        

        var horaFinal =(data.getHours()+":"+data.getMinutes())

        const atendimento ={
            peso: this.state.peso,
            altura: this.state.altura,
            imc: this.state.imc,
            bpm: this.state.bpm,
            temperatura: this.state.temperatura,
            glicemia: this.state.glicemia,
            saturacao: this.state.saturacao,
            avaliacao: this.state.avaliacao,
            hipotese:this.state.hipotese,
            entrevistaClinica: this.state.entrevistaClinica,
            cid: this.state.cid,
            pressao1: this.state.pressao1,
            pressao2: this.state.pressao2,
            paciente: this.state.id_paciente,
            profissional: this.state.id_profissional,
            unidade:this.state.id_unidade,
            usuario:this.state.id_usuario,
            tipoatendimento:this.state.id_tipo_atendimento,
            data:this.state.data,
            horaFim:horaFinal,
            flg_atendido:true
        }

        if(this.state.id_atendimento==="_add"){
        this.service.salvar(atendimento).then(response =>{
            mensagemOk('Atendimento Salvo !')
            this.props.history.push('/atendimentos') 
        }).catch(error =>{
            mensagemErro(error.response.data)
        })}else{
            atendimento.id_atendimento = this.state.id_atendimento
            this.service.atualizar(atendimento).then(
                response =>{
                     mensagemOk('Atendimento Salvo com Sucesso')
                     this.props.history.push('/atendimentos') 
                }
            ).catch(
                error =>{
                    mensagemErro(error.response.data)
                }
            )
        }
        console.log(this.state)
      } 

      cancelarCadastro = () => {
        this.props.history.push('/atendimentos')
    }


    render() {
        return (
            <div className="formcad">
                <div className="formcadconsulta">
                    <form>
                        <fieldset>
                            <legend>Consulta</legend>
                            <div className="numAntrop">
                                <h6>Dados Antropometricos</h6>
                                <div className="form-row ">
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">Peso</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Peso"
                                        value={this.state.peso} onChange={e => this.setState({ peso: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">Altura</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Cm"
                                        value={this.state.altura} onChange={e => this.setState({ altura: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">IMC</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""
                                        value={this.state.imc} onChange={e => this.setState({ imc: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">BPM</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="BPM"
                                        value={this.state.bpm} onChange={e => this.setState({ bpm: e.target.value })}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">P.A(sistólica)</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="mmHg"
                                        value={this.state.pressao1} onChange={e => this.setState({ pressao1: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">P.A(diastólica)</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="mmHg"
                                        value={this.state.pressao2} onChange={e => this.setState({ pressao2: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center ">
                                        <label htmlFor="exampleInputEmail1">Glicemia</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""
                                        value={this.state.glicemia} onChange={e => this.setState({ glicemia: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">Saturação</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="BPM"
                                         value={this.state.saturacao} onChange={e => this.setState({ saturacao: e.target.value })}></input>
                                    </div>
                                    <div className="form-group col-md-1 center">
                                        <label htmlFor="exampleInputEmail1">Temperatura</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="BPM"
                                         value={this.state.temperatura} onChange={e => this.setState({ temperatura: e.target.value })}></input>
                                    </div>

                                </div>

                                <br></br>
                                <br></br>

                                <div className="form-row">
                                    <div className="col-md-8 center">
                                        <div className="form-group">
                                            <label htmlFor="exampleTextarea">Entrevista Clinica</label>
                                            <textarea className="form-control" id="txtAvaliacao" rows="10"
                                            value={this.state.entrevistaClinica} onChange={e => this.setState({ entrevistaClinica: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="cardEntClinica">
                                <div className="form-row">
                                    <div className="form-group col-md-2 center ">
                                        <label htmlFor="exampleInputEmail1">CID</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CID"
                                        value={this.state.cid} onChange={e => this.setState({ cid: e.target.value })}></input>
                                    </div>

                                    <div className="form-group col-md-8 center">
                                        <label htmlFor="exampleInputEmail1">Hipotese Diagnostica</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Hipotese Diagnostica"
                                        value={this.state.hipotese} onChange={e => this.setState({ hipotese: e.target.value })}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-row">
                                    <div className="col-md-8 center">
                                        <div className="form-group">
                                            <label htmlFor="exampleTextarea">Avaliação</label>
                                            <textarea className="form-control" id="exampleTextarea" rows="10"
                                            value={this.state.avaliacao} onChange={e => this.setState({ avaliacao: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <br></br>
                            <br></br>
                            <button type="button" className="btn btn-success btn-space btn-lg "
                                    onClick={this.preencherIds}>Salvar</button>
                             <button type="button" className="btn btn-primary btn-space btn-lg "
                                    onClick={this.cadastrar}>Concluir</button>
                            <button type="button" className="btn btn-danger btn-space btn-lg "
                                onClick={this.cancelarCadastro}>Cancelar</button>
                        </fieldset>
                    </form>
                </div>
            </div>

        )
    }
}
export default Consulta