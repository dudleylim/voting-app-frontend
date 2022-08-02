import React from 'react'
import { useContext } from 'react'
import Context from './ContextApi'

const LoginPage = () => {
    const contextApi = useContext(Context);

    return (
        <>
        <h1 className='main-heading'>Login</h1>
        <section className="main-content">
            <form onSubmit={contextApi.handleSubmitLogin} className='main-form'>
                <input type="text" name="username" id="username" placeholder='Username' className='form-input-field'/>
                <input type="password" name="password" id="password" placeholder='Password' className='form-input-field'/>
                <button type="submit" className='submit-button'>Submit</button>
            </form>
        </section>
        </>
    )
}

export default LoginPage