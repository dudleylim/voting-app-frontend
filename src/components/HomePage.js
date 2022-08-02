import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import Context from './ContextApi'

const HomePage = () => {
    const contextApi = useContext(Context);
    const [votesAll, setVotesAll] = useState([]);

    useEffect(() => {
        const getVotesAll = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/votes/all/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + contextApi.accessToken
                }
            });
            const data = await response.json();
            // console.log(data);
            setVotesAll(data);
        }
        getVotesAll();
    }, [])

    return (
        <>
            <h1 className='main-heading'>Vote Count</h1>
            <section className="main-content">
                <ul>
                    {contextApi.candidates.map((candidate) => {
                        return <li key={candidate.id}>{candidate.name}: {votesAll.filter((vote) => {return vote.candidate === candidate.id}).length}</li>
                    })}
                </ul>
            </section>
        </>
    )
}

export default HomePage