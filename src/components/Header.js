import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from './ContextApi'

const Header = () => {
    const contextApi = useContext(Context);

    return (
        <header className='header'>
            <nav className='nav'>
                {contextApi.accessToken ?  
                <>
                    <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/vote' className='nav-link'>Vote</Link>
                    <button onClick={contextApi.logout} className='nav-logout'>Logout</button>
                </>
                :
                <>
                    <Link to='/login' className='nav-link'>Login</Link>
                    <Link to='/signup' className='nav-link'>Signup</Link>
                </>
                }
            </nav>
        </header>
    )
}

export default Header