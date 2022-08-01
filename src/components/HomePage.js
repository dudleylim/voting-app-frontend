import React from 'react'
import { useContext } from 'react'
import Context from './ContextApi'

const HomePage = () => {
    const contextApi = useContext(Context);

    return (
        <main>
            <h1>home</h1>
            <section className='token-details'>
                <p>Access token: {contextApi.accessToken}</p>
                <p>Refresh token: {contextApi.refreshToken}</p>
            </section>
        </main>
    )
}

export default HomePage