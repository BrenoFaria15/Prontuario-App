import React from "react";
import 'bootswatch/dist/cerulean/bootstrap.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import  '../css/custom.css'
import imagemHome from '../css/home.png'
import NavbarPublico from "../components/navbarPublico";
class HomePublico extends React.Component{
    render(){
        return(
            <>
            <NavbarPublico/>
            <div className="container-fluid">
                <div className="formcad">
                    <div className="home">
                        <img className="imagemhome" src={imagemHome}></img>
                    </div>   

                </div>   
            </div>
            </>
        )
    }
}

export default HomePublico