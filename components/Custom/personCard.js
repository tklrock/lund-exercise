import React, { useState, useEffect } from "react";
import path from 'path';
import axios from 'axios';
// import { Progress } from "reactstrap";
export const PersonCard = ({person}) => {

    const [latestSession, setLatestSession] = useState('');

    React.useEffect(() => {
        // console.log(person.first_name);
        const baseURL = path.join(process.cwd(), 'api');
        axios.post(path.join(baseURL, 'latestSession'), {
            name: person.first_name       
        }).then((response) => {
            // console.log(new Date(response.data.results[0].latest_session).toLocaleDateString('en-US', {timeZone: 'UTC'}));
            if(response.data.results[0].latest_session !== null){
                setLatestSession(new Date(response.data.results[0].latest_session).toLocaleDateString('en-US', {timeZone: 'UTC'}))
            } else {
                setLatestSession('Not yet!')
            }
        });
    }, []);

    return (
        <>
        <div className="border border-dark border-2 rounded-5 bg-image hover-overlay bg-white p-1 m-3 container cardHover">
                <div className="row">
                    <div className="col text-center">
                        <h2 className="font-weight-boldest font-size-largest">{person.first_name}</h2>                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    {person.image_link !== null && person.image_link !== ""
                    ? (
                        <>
                        <div className="col-6">
                        <h4><b>Goal: </b> {person.goal}</h4>
                        {/* <br /> */}
                        <h5><b>Last Exercise: </b>{latestSession}</h5>
                        </div>
                        <div className="col-4">
                            
                            <img src={person.image_link} className="w-100 m-1 rounded-circle border border-2 border-dark"/>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="col-10">
                        <h4><b>Goal: </b> {person.goal}</h4>
                        <br />
                        <h5><b>Last Exercise: </b>{latestSession}</h5>
                        </div>
                        </>
                    )}
                    <div className="col-1"></div>
                </div>
                {/* <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10 text-center">
                        <h3>
                        <Progress style= {{height: '25px', fontSize:'14pt'}}striped color="danger" value={movie.rating * 10} >{movie.rating}</Progress>
                        </h3>
                    </div>
                    <div className="col-1"></div>                    
                </div> */}
                <div className="row"></div>
        </div>
    </>
    )
}