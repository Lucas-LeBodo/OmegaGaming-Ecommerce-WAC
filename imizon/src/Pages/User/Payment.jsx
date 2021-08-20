import React, {Fragment, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const Payment = (props) => {
    const history = useHistory();
    console.log(props)

    useEffect(() => {
        // history.push("/basket")
    }, [])
    
    return(
        <Fragment >
            <p>Hi</p>
        </Fragment>
    )
}

export default Payment;