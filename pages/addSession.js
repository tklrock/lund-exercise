import React, { useState, setState, state } from 'react'
import axios from 'axios';
import path from 'path';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
  

const AddSession = () => {
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
            await axios.post(path.join(baseURL, 'addSession'), {
                name: state.Name,
                date: state.Date,
                minutes: state.Minutes,
                category: state.Category,
                notes: state.Notes,
                
            }).then((response) => {
                console.log(response.data.results);
            });
            setState({
                Name: "",
                Date: new Date(),
                Minutes: 0,
                Category: "",
                Notes: ""
            });
            document.getElementById("Name").value = "";
            document.getElementById("Date").value = "";
            document.getElementById("Minutes").value = "";
            document.getElementById("Category").value = "";
            document.getElementById("Notes").value = "";
        } catch (error) {
            alert(error)
        }
    }
    

    return (
        <>
            <h2>Add Exercise Session</h2>
            <Form>
                <Label for="Name"><b>Name:</b></Label><br/>
                <Input type="text" id="Name" name="Name" onChange={handleChange}></Input><br/>
                <Label for="Date">Date:</Label><br/>
                <Input type="date" id="Date" name="Date" onChange={handleChange} 
                    // defaultValue={new Date().toLocaleDateString('en-CA', {timeZone: 'America/New_York'})}
                ></Input><br/>
                <Label for="Minutes" >Minutes:</Label><br/>
                <Input type="number" step='1' min='0' placeholder='30' id="Minutes" name="Minutes" onChange={handleChange}></Input><br/>
                <Label for="Category" >Category:</Label><br/>
                <Input type="text" id="Category" name="Category" placeholder='"weights" or "basketball" etc.' onChange={handleChange}></Input><br/>
                <Label for="Notes">Notes:</Label><br/>
                <Input type="textarea" id="Notes" name="Notes" onChange={handleChange}></Input><br/>
                <Button color="success" onClick={submitSession}>Submit</Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button color="secondary" >Cancel</Button>
            </Form>        
        </>
    )
}

export default AddSession;