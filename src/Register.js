import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Alert, Badge, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './App.css';
import Loader from "react-loader-spinner";
import React from "react";

export const Register = () => {
    const [phone, setPhone] = useState();
    const [fullname, setName] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory ();

    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("https://gamee-backend.herokuapp.com/api/v2/account/register", {
            fullname: fullname,
            phone: phone,
            password: phone
        })
        .then(resp => {
            console.log(resp.data);
            setLoading(false);
            history.push("/login");
        })
        .catch(error => {
            setError(true)
            console.log(error);
            setLoading(false);
        })
    }

    return(
        <React.Fragment>
            <Loader
                type="Bars"
                color="#00BFFF"
                height={100}
                width={100}
                visible={loading}
                className="loader-center"
            />
        <div className="register">
            <div className="b-logo">
                <img style={{borderRadius: "5px"}} src="https://crosscheck.solutions/HTML5-Games/boat_rush_g.png" alt="Banglalink Logo"/>
            </div>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control style={{borderColor: "#ff8126"}} type="text" placeholder="Name" value={fullname} onChange={handleNameChange} maxlength="64"/>
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">019</InputGroup.Text>
                    <Form.Control 
                        style={{borderColor: "#ff8126"}}
                        autoComplete="off" 
                        type="tel" 
                        pattern="^[0-9]\d*$" 
                        value={phone} 
                        onChange={e => {
                            const val = e.target.value;
                            if (e.target.validity.valid) setPhone(e.target.value);
                            else if (val === "" || val === "-") setPhone("");
                        }} 
                        maxlength="8"/>
                </InputGroup>
                <Button className="rl" variant="primary" type="submit" size="lg" style={{backgroundColor: "#ff8126", color: "white", borderColor: "#ff8126", borderRadius: "10px"}}>
                    Register
                </Button>
            </Form>
            {error && (
                <div className="error-margin-top">
                <Alert variant="danger">
                    Can not register with this phone number please try with another number!
                </Alert>
                </div>
            )}
            <div className="not-register">
                <h6 style={{color: "#ff8126"}}>
                    Already registered? <Badge bg="secondary" onClick={e => history.push("/login")}>Login</Badge>
                </h6>
            </div>
        </div>
        </React.Fragment>
    )
}