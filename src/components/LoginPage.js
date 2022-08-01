import React from 'react'
import { useContext } from 'react'
import Context from './ContextApi'

const LoginPage = () => {
    const contextApi = useContext(Context);

    return (
        <section className="main-content">
            <form onSubmit={contextApi.handleSubmitLogin}>
                <input type="text" name="username" id="username" />
                <input type="password" name="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default LoginPage