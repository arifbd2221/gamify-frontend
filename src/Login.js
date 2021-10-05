import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Alert, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './App.css';
import Loader from "react-loader-spinner";
import React from "react";

export const Login = () => {
    const [phone, setPhone] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory ();

    const handlePhoneNumberChange = (e) => {
        setPhone(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("http://localhost:8000/api/v2/account/token", {
            username: phone,
            password: phone
        })
        .then(resp => {
            console.log(resp.data);
            if(localStorage){
                localStorage.setItem("token", resp.data.token);
                setLoading(false);
                history.push("/play");
            }
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
                    <Form.Label style={{color: "#ff8126"}}>Phone Number</Form.Label>
                    <Form.Control style={{borderColor: "#ff8126"}} type="tel" placeholder="Phone Number" value={phone} onChange={handlePhoneNumberChange} maxlength="11" required/>
                </Form.Group>

                <Button className="rl" variant="primary" type="submit" size="lg" style={{backgroundColor: "#ff8126", color: "white", borderColor: "#ff8126", borderRadius: "10px"}}>
                    Login
                </Button>
            </Form>
            {error && (
                <div className="error-margin-top">
                <Alert variant="danger">
                    Can not login with this phone number please register with another number!
                </Alert>
                </div>
            )}

            <div className="not-register">
                <h6 style={{color: "#ff8126"}}>
                    Haven't registered? <Badge bg="secondary" onClick={e => history.push("/register")}>Register</Badge>
                </h6>
            </div>
        </div>
        
        </React.Fragment>
    )
}