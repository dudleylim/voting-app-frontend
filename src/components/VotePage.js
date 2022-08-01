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
        await fetch('http://127.0.0.1:8000/api/votes/', {
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
    }

    const deleteVote = async (id) => {
        await fetch('http://127.0.0.1:8000/api/votes/', {
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
            const response = await fetch('http://127.0.0.1:8000/api/votes/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + contextApi.accessToken
                }
            });
            const data = await response.json();
            console.log(data);
            setVotes(data);
        }

        getVotes()
    }, [])

    return (
        <section className="main-content">
            <ul>
                {votes.map((vote) => {
                    return <li key={vote.id}>{vote.user_name} {vote.candidate_name} <button onClick={() => {deleteVote(vote.id)}}>Delete</button></li>
                })}
            </ul>

            {votes.length === 0 && 
            <form onSubmit={submitVote}>
            <select name="candidate" id="">
                {contextApi.candidates.map((candidate) => {
                    return <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
                })}
            </select>
            <button type="submit">Submit</button>
            </form>
            }
            
        </section>
    )
}

export default VotePage