import React, {Component,Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormSignIn from '../../Components/FormSignIn'

export default class login extends Component {
    render(){
        return(
            <Fragment >
                <FormSignIn/>
            </Fragment>
        )
    }


}