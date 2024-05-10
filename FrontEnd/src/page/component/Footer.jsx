import React from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component{
    render(){
        return(
            <div>
                <div className="container">
                <footer className="py-0 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Início</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">FAQs</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Sobre</Link></li>
                    </ul>
                    <p className="text-center text-body-secondary">&copy; 2023+1 o_O🐐</p>
                </footer>
                </div>
            </div>
        )
    }
}
