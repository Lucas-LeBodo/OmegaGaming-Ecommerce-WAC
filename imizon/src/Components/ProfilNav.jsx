// Import Libs 
import React, { Fragment } from "react";
import {Link} from 'react-router-dom';

const ProfilNav = (props) => {

    return (
        <Fragment>
            <div className="Panel">
                <div className="UserPanel-content">
                        <Link to={"/profil/"+localStorage.name}><div className="UserPanel-Link"> User Settings </div></Link>
                    <div className="darkline"></div>
                        <Link to={"/profil/"+localStorage.name+"/update_information"} ><div className="UserPanel-Link">Modify Information </div></Link>
                    <div className="darkline"></div>
                        <Link to={"/profil/"+localStorage.name+"/adresses"} ><div className="UserPanel-Link">Adresses </div></Link>
                    <div className="darkline"></div>
                        <Link to={"/profil/"+localStorage.name+"/historic"} ><div className="UserPanel-Link">Historic</div></Link>
                    <div className="darkline"></div>
                        <Link to={"/profil/"+localStorage.name+"/payment"} ><div className="UserPanel-Link">Payment informations</div></Link>
                </div>
            </div>
        </Fragment>
    )
} 

export default ProfilNav;
