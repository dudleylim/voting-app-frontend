import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from './ContextApi'

const PrivateRoute = ({children}) => {
    const contextApi = useContext(Context);

    // if user not found, navigate to login
    if (!contextApi.accessToken) {
        return (<Navigate to='/login' />)
    }

    // else, return children
    return (
        children
    )
}

export default PrivateRoute