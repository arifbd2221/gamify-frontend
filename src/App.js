import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { LeaderBoard } from './LeaderBoard';
import { PlayGame } from "./PlayGame";
import { createBrowserHistory } from 'history';
import { Register } from './Register';
import { Login } from './Login';

function App() {
  const history = createBrowserHistory();
  // const tokenExist = localStorage.getItem("token");

  // useEffect(() => {
  //   if(tokenExist){
  //     history.push("/play");
  //   }
  // })
  return (
    <BrowserRouter history={history}>
        <Switch>
          <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/play" exact>
            <PlayGame />
          </Route>
          <Route path="/leaderboard" exact>
            <LeaderBoard />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
