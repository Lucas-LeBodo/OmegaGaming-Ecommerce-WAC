// Import Libs 
import React, { Fragment } from "react";
import {Link} from 'react-router-dom';

const ProfilNav = (props) => {

    return (
        <Fragment>
            <div className="Panel">
                <div className="UserPanel-content">
                    <h4> User Settings </h4>
                    <div className="UserPanel-Link">
                        <Link to={"/profil/"+localStorage.name+"/update_information"} >Modify Information</Link>
                    </div>
                    <div className="darkline"></div>
                    <div className="UserPanel-Link">
                        <Link to={"/profil/"+localStorage.name+"/adresses"} >Adresses</Link>
                    </div>
                    <div className="darkline"></div>
                    <div className="UserPanel-Link">
                        <Link to={"/profil/"+localStorage.name+"/historic"} >Historic</Link>
                    </div>
                    <div className="darkline"></div>
                    <div className="UserPanel-Link">
                        <Link to={"/profil/"+localStorage.name+"/payment"} >Payment informations</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
} 

export default ProfilNav;
