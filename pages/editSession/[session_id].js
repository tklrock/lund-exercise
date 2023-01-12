import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import path from 'path';
import { Progress } from "reactstrap";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
  } from 'reactstrap';
import Link from 'next/link';


const Song = () => {
    const router = useRouter()
    const { session_id } = router.query;

    const [session, setSession] = useState(null);
    const [originalDate, setOriginalDate] = useState(null);

    const [state, setState] = React.useState({
        Name: "",
        Date: new Date(),
        Minutes: 0,
        Category: "",
        Notes: ""
      })

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

    const submitSession = async () => {
        try {

            // console.log(state);
            const baseURL = path.join(process.cwd(), 'api');
            // console.log(baseURL);
            await axios.post(path.join(baseURL, 'editSession'), {
                name: state.Name,
                date: state.Date,
                minutes: state.Minutes,
                category: state.Category,
                notes: state.Notes,
                Id: (session.session_id).toString()
            }).then((response) => {
                console.log(response.data.results);
            });
        } catch (error) {
            alert(error)
        }
    }

    React.useEffect(() => {
        if(session_id){
            const baseURL = path.join(process.cwd(), 'api');
            // console.log(path.join(baseURL, 'song', song_id.toString()));
            axios.get(path.join(baseURL, 'sessions', session_id.toString()))
            .then((response) => {
                setSession(response.data.results[0]);

                // let date = new Date(response.data.results[0].date).toLocaleDateString('', {timeZone: 'UTC'});
                // //use method getDate() , getMonth, getFullYear 
                // let dd = date.getDate().toString(); 
                // let mm = (date.getMonth() + 1).toString();
                // let yyyy= date.getFullYear();
                // //we will insert 0 and month if the month is less than 10 (mean length <2)
                // if (mm.length < 2) {
                //     mm = '0' + mm;
                // }
                // if (dd.length < 2) {
                //     dd = '0' + dd;
                // }
                // setOriginalDate([yyyy, mm, dd].join('-'));
                setOriginalDate(new Date(response.data.results[0].date).toISOString().split('T')[0])

                setState({
                        Name: response.data.results[0].name,
                        Date: response.data.results[0].date,
                        Minutes: response.data.results[0].minutes,
                        Category: response.data.results[0].category,
                        Notes: response.data.results[0].notes
                    });
            })
        };

      }, [session_id, setSession]);
  
    return <>

                <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                    <h2>Edit Exercise Session</h2>
                {session ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Original Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name: </td>
                                <td>{session.name}</td>
                            </tr>
                            <tr>
                                <td>Date: </td>
                                <td>{new Date(session.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</td>
                            </tr>
                            <tr>
                                <td>Minutes: </td>
                                <td>{session.minutes}</td>
                            </tr>
                            <tr>
                                <td>Category: </td>
                                <td>{session.category}</td>
                            </tr>
                            <tr>
                                <td>Notes: </td>
                                <td>{session.notes}</td>
                            </tr>
                        </tbody>
                    </table>
                ):(<></>)}
                </div>
        {session
            ? (
               <> 
               <Form>
                <Label for="Name"><b>Name:</b></Label><br/>
                <Input type="text" id="Name" name="Name" onChange={handleChange} defaultValue={session.name}></Input><br/>
                <Label for="Date">Date: 
                    {/* <span className="text-muted">(Leave blank for today)</span> */}
                </Label><br/>
                <Input type="date" id="Date" name="Date" onChange={handleChange} defaultValue={originalDate}
                    // defaultValue={new Date().toLocaleDateString('en-CA', {timeZone: 'America/New_York'})}
                ></Input><br/>
                <Label for="Minutes" >Minutes:</Label><br/>
                <Input type="number" step='1' min='0' placeholder='30' id="Minutes" name="Minutes" onChange={handleChange} defaultValue={session.minutes}></Input><br/>
                <Label for="Category" >Category:</Label><br/>
                <Input type="text" id="Category" name="Category" placeholder='"weights" or "basketball" etc.' onChange={handleChange} defaultValue={session.category}></Input><br/>
                <Label for="Notes">Notes:</Label><br/>
                <Input type="textarea" id="Notes" name="Notes" onChange={handleChange} defaultValue={session.notes}></Input><br/>
                <Link href={'/'}><Button color="success" onClick={submitSession}>Submit</Button></Link>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link href={`/`}><Button color="secondary" >Cancel</Button></Link>

            </Form>        
               </>
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

export default Song;