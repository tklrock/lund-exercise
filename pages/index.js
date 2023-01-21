import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import Head from "next/head";
import { Col, Row } from "reactstrap";
import React, { useState } from 'react'
import path from 'path';
import { Button } from 'reactstrap';
import { SessionTable } from '../components/Custom/sessionTable';
import { PersonCard } from '../components/Custom/personCard';


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
            <p>No exercise sessions to display</p>
            }
        </>
        }
        
    </>
)
}

export default Home;