// import libs
import React, {Fragment} from 'react';
import {Container} from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Historic = (props) => {

    const id = props.id
    const showHistoric = props.showHistoric

    return (
        <Fragment>
            
                <div className={"containers-form"}>
                
                    <div className="showHistoric">
                        <span>Command n° {showHistoric}</span>
                    </div>
                </div>
        </Fragment>
    )
}

export default Historic;