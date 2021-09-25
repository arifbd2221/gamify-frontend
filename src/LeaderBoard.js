/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table, Alert, Button } from 'react-bootstrap';
import './App.css';
import { useHistory } from 'react-router-dom';



export const LeaderBoard = () => {
    const history = useHistory ();
    const [players, setPlayers] = useState()

    useEffect(() => {
        axios.get("https://gamee-backend.herokuapp.com/api/v2/leaderboard/list")
        .then(resp => {
            setPlayers(resp.data)
        })
    }, [])


    console.log(players);

    return (
        <div className="leaderboard">
            <Alert variant="primary">
                Leaderboard
            </Alert>
            <div className="tableStyle">
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Rank</th>
                <th>Phone</th>
                <th>Score</th>
                <th>Game</th>
                </tr>
            </thead>
            <tbody>
                {players?.map((player) => (   
                        <tr>
                            <td>{player.rank}</td>
                            <td>{player.phone}</td>
                            <td>{player.score}</td>
                            <td>{player.game}</td>
                        </tr>
                        )) }

            </tbody>
            </Table>
            </div>
            <div className="play">
            <Button variant="primary" onClick={e => history.push("/play")}>Play Again</Button>
            </div>
            </div>
    )
}