import React from 'react'
import Context from './ContextApi';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const VotePage = () => {
    const [votes, setVotes] = useState([]);
    const contextApi = useContext(Context);
    const navigate = useNavigate();

    const submitVote = async (e) => {
        e.preventDefault();
        await fetch('https://dudley-voting-app.herokuapp.com/api/votes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + contextApi.accessToken
            },
            body: JSON.stringify({
                'user': contextApi.user.user_id,
                'candidate': e.target.candidate.value
            })
        });
        navigate('/');
        // console.log(e.target.candidate.value);
    }

    const deleteVote = async (id) => {
        await fetch('https://dudley-voting-app.herokuapp.com/api/votes/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + contextApi.accessToken
            },
            body: JSON.stringify({
                'id': id
            })
        });
        navigate('/');
    }

    useEffect(() => {
        const getVotes = async () => {
            const response = await fetch('https://dudley-voting-app.herokuapp.com/api/votes/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + contextApi.accessToken
                }
            });
            const data = await response.json();
            // console.log(data);
            setVotes(data);
        }

        getVotes()
    }, [])

    return (
        <>
        <h1 className='main-heading'>Your Vote</h1>
        <section className="main-content">
            {votes.length === 0 ? 
            <form onSubmit={submitVote} className='vote-form'>
                {contextApi.candidates.map((candidate) => {
                    return <label key={candidate.id} htmlFor={candidate.name} className='vote-form-candidate'>
                        <input type="radio" name='candidate' value={candidate.id}/>
                        {candidate.name}
                    </label>
                })}
                <button type="submit" className='submit-button'>Submit</button>
            </form>
            :
            <ul>
                {votes.map((vote) => {
                    return <li key={vote.id}>Voted for: {vote.candidate_name} <button onClick={() => {deleteVote(vote.id)}} className='vote-delete-button'>Delete</button></li>
                })}
            </ul>
            }
        </section>
        </>
    )
}

export default VotePage