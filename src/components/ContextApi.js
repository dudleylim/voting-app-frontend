import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

const Context = React.createContext()
export default Context

export const ContextApi = ({children}) => {
    const [user, setUser] = useState(
        localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : {}
    );
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).access : ''
    );
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).refresh : ''
    );
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        });
        const data = await response.json();
        const userInfo = jwt_decode(data.access);

        if (response.status === 200) {
            console.log(response.status);
            // console.log(data.access);
            // console.log(data.refresh);
            // console.log(userInfo)

            // save in local storage
            localStorage.setItem('token', JSON.stringify(data));

            // set states
            setAccessToken(data.access);
            setRefreshToken(data.refresh);
            setUser(userInfo);
        } else {
            console.log('Response status of login: ', response.status);
            setAccessToken('');
            setRefreshToken('');
        }

        navigate('/');
    }

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/api/createUser/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        });
        navigate('/login');
    }

    const logout = () => {
        setUser({});
        setAccessToken('');
        setRefreshToken('');
        localStorage.clear();
    }

    const contextData = {
        user,
        accessToken,
        refreshToken,
        handleSubmitLogin,
        handleSubmitSignup,
        logout
    }

    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}