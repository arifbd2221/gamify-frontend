/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table, Alert, Button } from 'react-bootstrap';
import './App.css';
import { useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import React from "react";


export const LeaderBoard = () => {
    const history = useHistory ();
    const [players, setPlayers] = useState();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/v2/leaderboard/list")
        .then(resp => {
            setPlayers(resp.data)
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
        
        if(localStorage){
            const token = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
            axios.get("http://localhost:8000/api/v2/account/user", {headers: headers})
            .then(resp => {
                console.log(resp.data);
                setUser(resp.data);
            })
            .catch(error => {
                console.log("Score push error", error);
            })
        }
        return
    }, [])


    console.log(players);

    return (
        <React.Fragment>
        <div className="leaderboard">
            <Alert variant="primary" style={{backgroundColor: "#ff8126", color: "white", fontWeight: "bold"}}>
                Leaderboard
            </Alert>
            <div className="tableStyle">
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Game</th>
                </tr>
            </thead>
            <tbody>
                {players?.map((player) => (   
                        <tr style={player?.phone === user?.phone? {color: "#ff8126"}: {}}>
                            <td>{player.rank}</td>
                            <td>{player.fullname}</td>
                            <td>{player.score}</td>
                            <td>{player.game}</td>
                        </tr>
                        )) }
            </tbody>
            </Table>
            </div>
                <div className="play">
                    <Button class="buttonL" variant="primary" onClick={e => history.push("/play")} style={{backgroundColor: "#ff8126", color: "white", borderColor: "#f9fafb", borderRadius: "10px"}}>Play Again</Button>
                </div>
            </div>
            <Loader
                type="Bars"
                color="#00BFFF"
                height={100}
                width={100}
                visible={loading}
                className="loader-center"
            />
            </React.Fragment>
    )
}