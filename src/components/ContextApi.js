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
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
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
            logout();
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
        localStorage.removeItem('token');
    }

    const contextData = {
        user,
        accessToken,
        refreshToken,
        candidates,
        handleSubmitLogin,
        handleSubmitSignup,
        logout,
    }

    useEffect(() => {
        const getCandidates = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/candidates/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setCandidates(data);
        }
        getCandidates();
    }, [])

    useEffect(() => {
        const updateToken = async () => {
            if (!loading) {
                setLoading(true)
                const localRefreshToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).refresh : '';
                if (localRefreshToken === '') {
                    console.log('no token to refresh');
                    // console.log(localRefreshToken);
                } else {
                    // console.log(localRefreshToken);
                    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'refresh': localRefreshToken
                        })
                    });
                    const data = await response.json();
                    const userInfo = jwt_decode(data.access);
                
                    if (response.status === 200) {
                        // save in local storage
                        localStorage.setItem('token', JSON.stringify(data));
                    
                        // set states
                        setAccessToken(data.access);
                        setRefreshToken(data.refresh);
                        setUser(userInfo);
                    
                        console.log('Token updated');
                    } else {
                        console.log('Response status of update token: ', response.status);
                        logout();
                    }
                }
            }
            setLoading(false);
        }
        
        // the purpose of this if statement is to prevent updateToken from being invoked when the page is loading
        // this means when the page is refreshed while it is loading, it wont run updateToken() twice and causing an error
        // if (!loading) {
        //     updateToken();
        // }

        const interval = setInterval(() => {
            updateToken();
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}