import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from './ContextApi'

const Header = () => {
    const contextApi = useContext(Context);

    return (
        <header>
            <nav>
                <ul>
                    {contextApi.accessToken ?  
                    <>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/vote'>Vote</Link></li>
                        <li><button onClick={contextApi.logout}>Logout</button></li>
                    </>
                    :
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header