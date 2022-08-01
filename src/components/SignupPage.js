import React from 'react'
import { useContext } from 'react'
import Context from './ContextApi'

const SignupPage = () => {
    const contextApi = useContext(Context);

    return (
        <section className="main-content">
            <h3>Signup</h3>
            <form onSubmit={contextApi.handleSubmitSignup}>
                <input type="text" name="username" id="username" />
                <input type="password" name="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default SignupPage