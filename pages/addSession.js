import React, { useState, setState, state } from 'react'
import axios from 'axios';
import path from 'path';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
  } from 'reactstrap';
import Link from 'next/link';
import FlashMessage from 'react-flash-message';
import moment from 'moment/moment';
  

const AddSession = () => {

    const today = moment().format();

    const todayYear = new Date(today).getFullYear();
    const todayMonth = parseInt(new Date(today).getMonth())+1;
    const todayDate = new Date(today).getDate();

    const [state, setState] = React.useState({
        Name: "",
        Date: todayYear + '-' + ((todayMonth < 10) ? '0': '') + todayMonth +  '-' + todayDate,
        Minutes: 0,
        Category: "",
        Notes: ""
      })
    
    const [successMessage, setSuccessMessage] = React.useState(false);

    function handleChange(evt) {
        // console.log(new Date(today).getFullYear() + '-' + new Date(today).getMonth()+1 + '-' + new Date(today).getDate());
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }


    const submitSession = async () => {
        try {
            setSuccessMessage(false);
            console.log(state.Date);

            // console.log(state);
            const baseURL = path.join(process.cwd(), 'api');
            // console.log(baseURL);
            await axios.post(path.join(baseURL, 'addSession'), {
                name: state.Name,
                date: state.Date,
                minutes: state.Minutes,
                category: state.Category,
                notes: state.Notes
            }).then((response) => {
                console.log(response.data.results);
            });
            setState({
                Name: "",
                Date: todayYear + '-' + ((todayMonth < 10) ? '0': '') + todayMonth +  '-' + todayDate,
                Minutes: 0,
                Category: "",
                Notes: ""
            });
            document.getElementById("Name").value = "";
            document.getElementById("Date").value = todayYear + '-' + ((todayMonth < 10) ? '0': '') + todayMonth +  '-' + todayDate;
            document.getElementById("Minutes").value = "";
            document.getElementById("Category").value = "";
            document.getElementById("Notes").value = "";

            setSuccessMessage(true);
        } catch (error) {
            alert(error)
        }
    }
    

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h2>Add Exercise Session</h2>
                    </div>
                    <div className="col-6">
                    {successMessage ? (
                        <FlashMessage duration={5000} persistOnHover={true}>
                            <strong className="text-primary">Exercise session added</strong>
                        </FlashMessage>
                    ):(<></>)}
                    </div>
                </div>
            </div>
            
            
            <Form>
                <Label for="Name"><b>Name:</b></Label><br/>
                <Input type="text" id="Name" name="Name" onChange={handleChange}></Input><br/>
                <Label for="Date">Date: 
                    {/* <span className="text-muted">(Leave blank for today)</span> */}
                </Label><br/>
                <Input type="date" id="Date" name="Date" onChange={handleChange} 
                    defaultValue={todayYear + '-' + ((todayMonth < 10) ? '0': '') + todayMonth +  '-' + todayDate}
                ></Input><br/>
                <Label for="Minutes" >Minutes:</Label><br/>
                <Input type="number" step='1' min='0' placeholder='30' id="Minutes" name="Minutes" onChange={handleChange}></Input><br/>
                <Label for="Category" >Category:</Label><br/>
                <Input type="text" id="Category" name="Category" placeholder='"weights" or "basketball" etc.' onChange={handleChange}></Input><br/>
                <Label for="Notes">Notes:</Label><br/>
                <Input type="textarea" id="Notes" name="Notes" onChange={handleChange}></Input><br/>
                <Button color="success" onClick={submitSession}>Submit</Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link href={`/`}><Button color="secondary" >Cancel</Button></Link>

            </Form>        
        </>
    )
}

export default AddSession;