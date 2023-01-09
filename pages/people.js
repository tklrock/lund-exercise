import React, { useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import path from 'path';
import { PersonCard } from '../components/Custom/personCard';

const People = () => {

    const [people, setPeople] = useState(null);

    React.useEffect(() => {
        const baseURL = path.join(process.cwd(), 'api');
        axios.get(path.join(baseURL, 'people')).then((response) => {
           setPeople(response.data.results);
        });
      }, []);

    return (
        <>
            <h1>People</h1>
            {people?.length > 0 
            ? (
                <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                    {people.map(person => (
                        // <Link key={movie.movie_id} href={`movies/${encodeURIComponent(movie.movie_id.toString())}`} className="text-black text-decoration-none" style={{width:'400px'}}>
                        <div key={person.person_id} style={{width:'40%', minWidth:'300px', maxWidth:'90%'}}>
                            <PersonCard  person = {person}/>
                        </div>
                        // </Link>
                        // <>
                        // <h2>{goal.goal_id} - {goal.name}</h2>
                        // <p>{goal.goal}</p>
                        // </>
                    ))}
                </div>
            ): <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-center" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default People;