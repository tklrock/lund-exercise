import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import path from 'path';
import { SessionTable } from '../../components/Custom/sessionTable';
// import { Progress } from "reactstrap";


const Person = () => {
    const router = useRouter()
    const { person_id } = router.query;

    const [person, setPerson] = useState(null);
    const [sessions, setSessions] = useState(null);

    React.useEffect(() => {
        if(person_id){
            const baseURL = path.join(process.cwd(), 'api');
            axios.get(path.join(baseURL, 'people', person_id.toString())).then((response) => {
                setPerson(response.data.results[0]);
                axios.get(path.join(baseURL, 'personsessions', response.data.results[0].first_name)).then((response) => {
                    setSessions(response.data.results.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    }))
                });
            });
            
        };
      }, [person_id, setPerson]);
  
    return <>
        {person
            ? (
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <h1>{person.first_name}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-5">
                            {/* <div className="row">
                                <img src={person.image_link} className="w-100 rounded-4"/>
                            </div> */}
                            <div className="row">
                                <h2>{person.goal}</h2>
                            </div>
                            {/* <div className="row">
                                <p style={{fontSize: '15pt'}}>{person.goal}</p>
                            </div> */}
                        </div>
                        <div className="col-5">
                            {sessions?.length > 0  
                                ? (
                                    <>
                                        <SessionTable sessions={sessions} />
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
                        <div className="col-1"></div>
                        
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