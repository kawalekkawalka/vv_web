import TeamList from "../team/team-list";
import TeamDetails from "../team/team-details";
import Login from "../user/login"
import { Routes, Route} from 'react-router-dom';
import Register from "../user/register";
import Account from "../user/account";
import MatchDetails from "../match/match-details";
import PlayerDetails from "../player/player-details";
function Main() {

  return (
      <Routes>
          <Route exact path="/" element={<TeamList params={{}}/>}/>
          <Route exact path="/details/team/:id" element={<TeamDetails/>}/>
          <Route exact path="/details/player/:id" element={<PlayerDetails/>}/>
          <Route exact path="/details/match/:id" element={<MatchDetails/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/account" element={<Account/>}/>
      </Routes>

  );
}

export default Main;
