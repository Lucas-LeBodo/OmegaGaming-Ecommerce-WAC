// import libs
import React, {Fragment} from 'react';

const Historic = (props) => {

    const Historic = props.showHistoric

    let showHistoric = [];
    Historic.forEach(element => {
        showHistoric.push(<span>Command n° {element}</span>)    
    });

    return (
        <Fragment>
            <div className={"containers-form"}>
                <div className="showHistoric">
                    {showHistoric}
                </div>
            </div>
        </Fragment>
    )
}

export default Historic;