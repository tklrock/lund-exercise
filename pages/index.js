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
    const baseURL = path.join(process.cwd(), 'api');
    axios.get(path.join(baseURL, 'sessions')).then((response) => {
        setSessions(response.data.results)  
    });
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
        <h2>Exercise Log</h2>
        <Link href={`addSession`}><Button color="success"><span className="h5">Add Session <b>+</b></span></Button></Link>
        {sessions?.length > 0  
        ? (
            <>
                <div class="container">
                    <div class="row">
                        <div class="col-12"><h4>Total sessions: <span className="h3">{sessions?.length}</span></h4></div>
                        {/* <div class="col-6"><h4>Total Price: ${items.reduce((partialSum, item) => partialSum + parseFloat(item.price), 0).toFixed(2)}</h4></div> */}
                    </div>
                </div>
                <table className="w-100 table table-hover table-striped border border-dark border-2 rounded-5">
                    <thead className="h5 font-weight-bold" style={{height:'20px'}}>
                        <th style={{width:'15%', margin:'1%'}}>Name</th>
                        <th style={{width:'15%', margin:'1%'}}>Date</th>
                        <th style={{width:'10%', margin:'1%'}}>Length (min)</th>
                        <th style={{width:'15%', margin:'1%'}}>Category</th>
                        <th style={{width:'28%', margin:'1%'}}>Notes</th>
                        {/* <th style={{width:'5%', margin:'1%'}}>Edit</th> */}
                        <th style={{width:'5%', margin:'1%'}}>Delete</th>
                    </thead>
                    <tbody>                    
                {sessions.map((session) => (
                    <tr key={session.session_id}>
                        <td style={{width:'15%', margin:'1%'}} className="h5">{session.name}</td>
                        <td style={{width:'15%', margin:'1%'}}>{new Date(session.date).toLocaleDateString()}</td>
                        <td style={{width:'10%', margin:'1%'}}>{session.minutes}</td>
                        <td style={{width:'15%', margin:'1%'}}>{session.category}</td>
                        <td style={{width:'28%', margin:'1%'}}>{session.notes}</td>
                        {/* <td style={{width:'5%', margin:'1%', fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Button color="warning" onClick={() => editSession(session.session_id)}><i class="bi bi-pencil-square"></i></Button></td> */}
                        <td style={{width:'5%', margin:'1%', fontWeight:'bold'}} className="font-weight-bold h3 text-center"><Button color="danger" onClick={() => deleteSession(session.session_id)}>X</Button></td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </>
            
        ): <>
            {sessions === null
            ? (
                <div className="d-flex">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            ):
            <p>No exercise sessions to display</p>
            }
        </>
        }
        
    </>
)
}

export default Home;