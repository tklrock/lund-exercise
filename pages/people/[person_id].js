import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import path from 'path';
import { SessionTable } from '../../components/Custom/sessionTable';

const Person = () => {
    const router = useRouter()
    const { person_id } = router.query;

    const [person, setPerson] = useState(null);
    const [sessions, setSessions] = useState(null);

    const deleteSession = async (itemId) => {
        const baseURL = path.join(process.cwd(), 'api');
        await axios.post(path.join(baseURL, 'deleteSession'), {
            Id: itemId,
        })
        console.log("Session Deleted");
        getSessions();
    }

    const getSessions = () => {
        const baseURL = path.join(process.cwd(), 'api');
        axios.get(path.join(baseURL, 'people', person_id.toString())).then((response) => {
            setPerson(response.data.results[0]);
            axios.get(path.join(baseURL, 'personsessions', response.data.results[0].first_name)).then((response) => {
                setSessions(response.data.results.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                }))
            });
        });
    }

    React.useEffect(() => {
        if(person_id){
            getSessions(); 
        };
      }, [person_id]);
  
    return <>
        {person
            ? (
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <h1>{person.first_name}</h1>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                        <div style={{flex: '1'}}>
                            {/* <div className="row">
                                <img src={person.image_link} className="w-100 rounded-4"/>
                            </div> */}
                                <h2>{person.goal}</h2>
                            {/* <div className="row">
                                <p style={{fontSize: '15pt'}}>{person.goal}</p>
                            </div> */}
                        </div>
                        <div style={{flex: '2'}}>
                            {sessions?.length > 0  
                                ? (
                                    <>
                                        <SessionTable sessions={sessions} deleteSession = {deleteSession} />
                                    </>
                                ): <>
                                    {sessions === null
                                    ? (
                                    <>
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-center" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>
                                </>
                                    ):
                                    <p>No exercise sessions to display. Better get moving!</p>
                                    }
                                </>
                                }
                        </div>                        
                    </div>
                    
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
  }

export default Person;