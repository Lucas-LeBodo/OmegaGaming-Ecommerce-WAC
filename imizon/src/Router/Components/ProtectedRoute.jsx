import React from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom";

export default function Auth(props){
    console.log("ici")
    console.log(props)
    return(
        <Route
            path={props.path}
            component={props.component}
        />

        
    )
}