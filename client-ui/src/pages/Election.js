import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Election = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState({});
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:7000/voteBoard');
                const groupedCandidates = response.data.reduce((acc, candidate) => {
                    if (!acc[candidate.role_being_candidated_for]) {
                        acc[candidate.role_being_candidated_for] = [];
                    }
                    acc[candidate.role_being_candidated_for].push(candidate);
                    return acc;
                }, {});
                setCandidates(groupedCandidates);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        const checkIfUserHasVoted = async () => {
            try {
                const email = localStorage.getItem('email');

                const response = await axios.get('http://localhost:5000/api/auth/hasVoted', {
                    params: { email }
                    });
                setHasVoted(response.data.hasVoted);
            } catch (error) {
                console.error('Error checking if user has voted:', error);
            }
        };

        fetchCandidates();
        checkIfUserHasVoted();
    }, []);

    const handleCandidateSelection = (role, candidateId) => {
        setSelectedCandidates(prevState => ({
            ...prevState,
            [role]: candidateId
        }));
    };

    const handleSubmit = async () => {
        try {
            const votes = Object.values(selectedCandidates);
            await axios.post('http://localhost:7000/send', { votes });
            alert('Votes submitted successfully!');
            setHasVoted(true);  // Update the hasVoted state after successful submission
        } catch (error) {
            console.error('Error submitting votes:', error);
            alert('Error submitting your votes. Please try again.');
        }
    };

    return (
        <div>
            {Object.entries(candidates).map(([role, candidatesForRole]) => (
                <div key={role}>
                    <h2>{role}</h2>
                    {candidatesForRole.map(candidate => (
                        <div key={candidate._id}>
                            <input
                                type="radio"
                                name={role}
                                value={candidate._id}
                                onChange={() => handleCandidateSelection(role, candidate._id)}
                                disabled={hasVoted} // Disable the radio buttons if the user has already voted
                            />
                            <label>
                                <img src={candidate.img_URL} alt={candidate.name} width={100} />
                                <p>{candidate.name}</p>
                                <p>{candidate.motivation_letter}</p>
                                <p>{candidate.phone_number}</p>
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit} disabled={hasVoted}>
                Submit Votes
            </button>
        </div>
    );
};

export default Election;