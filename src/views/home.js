import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import  '../css/custom.css'
import imagemHome from '../css/home.png'
class Home extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="formcad">
                    <div className="home">
                        <img className="imagemhome" src={imagemHome}></img>
                    </div>   

                </div>   
            </div>
        )
    }
}

export default Home