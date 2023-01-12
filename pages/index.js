import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import Head from "next/head";
import { Col, Row } from "reactstrap";
import React, { useState } from 'react'
import path from 'path';
import { Button } from 'reactstrap';
import Moment from 'moment';


const Home = () => {

  const [sessions, setSessions] = useState(null);

  const getSessions = () => {
    var sorted_sessions = [];
    const baseURL = path.join(process.cwd(), 'api');
    axios.get(path.join(baseURL, 'sessions'))
        .then((response) => {
            setSessions(response.data.results.sort((a, b) => {          
                return new Date(b.date) - new Date(a.date);
            }))  
        }
    );
  }

  React.useEffect(() => {
    getSessions();
  }, []);


  const deleteSession = async (itemId) => {
      const baseURL = path.join(process.cwd(), 'api');
      await axios.post(path.join(baseURL, 'deleteSession'), {
          Id: itemId,
      })
      console.log("Session Deleted");
      getSessions();
  }

return (
    <>
        <h1>Exercise Log</h1>
        <Link href={`addSession`}><Button color="success"><span className="h5">Add Session <b>+</b></span></Button></Link>
        <br /><br />
        {sessions?.length > 0  
        ? (
            <>
                <div class="container">
                    <div class="row">
                        <div class="col-4"><h4>Total sessions: <span className="h3">{sessions?.length}</span></h4></div>
                        <div class="col-4"><h4>Total time: <span className="h3">{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) / 60).toFixed(0)}:{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) % 60).toString().padStart(2, '0')}</span></h4></div>
                        <div class="col-4"><h4>Average minutes: <span className="h3">{((sessions?.reduce((accum,session) => accum + session.minutes, 0)) / sessions?.length).toFixed(1)}</span></h4></div>
                        {/* <div class="col-6"><h4>Total Price: ${items.reduce((partialSum, item) => partialSum + parseFloat(item.price), 0).toFixed(2)}</h4></div> */}
                    </div>
                </div>
                <table className="w-100 table table-hover border border-dark border-2 rounded-5">
                    <thead className="h5 font-weight-bold" style={{height:'20px'}}>
                        <tr className="table-dark">
                            <th style={{width:'10%', margin:'1%'}}>Name</th>
                            <th style={{width:'10%', margin:'1%'}}>Date</th>
                            <th style={{width:'10%', margin:'1%'}}>Length (min)</th>
                            <th style={{width:'10%', margin:'1%'}}>Category</th>
                            <th style={{width:'20%', margin:'1%'}}>Notes</th>
                            {/* <th style={{width:'5%', margin:'1%'}}>Edit</th> */}
                            <th style={{width:'5%', margin:'1%'}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>                    
                {sessions.map((session, index) => (
                    <tr key={session.session_id} className={parseInt(index) % 2 === 0 ?("table-primary"): ("table-light")}>
                        <td style={{width:'10%', margin:'1%'}} className="h5">{session.name}</td>
                        <td style={{width:'10%', margin:'1%'}}>{new Date(session.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</td>
                        <td style={{width:'10%', margin:'1%'}}>{session.minutes}</td>
                        <td style={{width:'15%', margin:'1%'}}>{session.category}</td>
                        <td style={{width:'20%', margin:'1%'}}>{session.notes}</td>
                        {/* <td style={{width:'5%', margin:'1%', fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Button color="warning" onClick={() => editSession(session.session_id)}><i class="bi bi-pencil-square"></i></Button></td> */}
                        <td style={{width:'5%', margin:'1%', fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Button color="danger" onClick={() => deleteSession(session.session_id)}><i class="bi bi-trash3-fill"></i></Button></td>
                    </tr>
                ))}
                    </tbody>
                </table>
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
            <p>No exercise sessions to display</p>
            }
        </>
        }
        
    </>
)
}

export default Home;