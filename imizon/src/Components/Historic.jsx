// import libs
import React, {Fragment} from 'react';


const Historic = (props) => {

    const id = props.id
    const showHistoric = props.showHistoric

    return (
        <Fragment>
             <div className={"containers-form"} style={{background: "blue"}}>
                {showHistoric}
            </div>
        </Fragment>
    )
}

export default Historic;