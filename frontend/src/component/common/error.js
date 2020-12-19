import React from 'react'
import {Link} from 'react-router-dom'

export default class Error extends React.Component{
    render(){
        return(
            <>
                <h1>ERROR 404</h1>
                <h2>Page Not Found...</h2>
                <h3><Link to='/'>Go Back To Dashboard</Link></h3>
            </>
        )
    }
}