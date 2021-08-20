// import libs
import React, {Fragment} from 'react';

const Historic = (props) => {
    const Historic = props.showHistoric

    let i = 0;
    let showHistoric = [];
    Historic.forEach(element => {
        showHistoric.push(<span key={element+" " + i}>Command n° {element}</span>);
        i++  ;
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