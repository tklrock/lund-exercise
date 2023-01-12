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
  

const AddSession = () => {
    const [state, setState] = React.useState({
        firstName: "",
        goal: "",
        imageLink: "",
      })
    
    const [successMessage, setSuccessMessage] = React.useState(false);

    function handleChange(evt) {
        const value = evt.target.value;
        console.log(value);
        setState({
          ...state,
          [evt.target.name]: value
        });
      }


    const submitPerson = async () => {
        try {
            setSuccessMessage(false);

            console.log(state);
            const baseURL = path.join(process.cwd(), 'api');
            // console.log(baseURL);
            await axios.post(path.join(baseURL, 'addPerson'), {
                first_name: state.firstName,
                goal: state.goal,
                image_link: state.imageLink,                
            }).then((response) => {
                console.log(response.data.results);
            });
            setState({
                firstName: "",
                goal: "",
                imageLink: "",
            });
            document.getElementById("firstName").value = "";
            document.getElementById("goal").value = "";
            document.getElementById("imageLink").value = "";

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
                        <h2>Sign Up</h2>
                    </div>
                    <div className="col-6">
                    {successMessage ? (
                        <FlashMessage duration={5000} persistOnHover={true}>
                            <strong className="text-primary">Successfully signed up</strong>
                        </FlashMessage>
                    ):(<></>)}
                    </div>
                </div>
            </div>
            
            
            <Form>
                <Label for="firstName"><b>First Name:</b></Label><br/>
                <Input type="text" id="firstName" name="firstName" onChange={handleChange}></Input><br/>
                <Label for="goal"><b>Goal: </b></Label><br/>
                <Input type="textarea" id="goal" name="goal" onChange={handleChange} 
                    // defaultValue={new Date().toLocaleDateString('en-CA', {timeZone: 'America/New_York'})}
                ></Input><br/>
                <Label for="imageLink"><b>Image Link:</b></Label><br/>
                <Input type="text" id="imageLink" name="imageLink" onChange={handleChange}></Input><br/>
                <Button color="success" onClick={submitPerson}>Submit</Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link href={`people`}><Button color="secondary" >Cancel</Button></Link>

            </Form>        
        </>
    )
}

export default AddSession;