import TeamList from "../team/team-list";
import TeamDetails from "../team/team-details";
import Login from "../user/login"
import { Routes, Route} from 'react-router-dom';
import Register from "../user/register";
import Account from "../user/account";
import MatchDetails from "../match/match-details";
import PlayerDetails from "../player/player-details";
import PerformanceForm from "../performance/performance-form";
import UserTeams from "../user/user-teams";
import UserMatches from "../user/user-matches";
import UserFriends from "../user/user-friends";
import MatchesList from "../match/matches-list";
import MainPage from "./main-page";
import PlayersListPage from "../player/players-list-page";
import TeamListPage from "../team/team-list-page";
function Main() {

  return (
      <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/teams" element={<TeamListPage/>}/>
          <Route exact path="/matches" element={<MatchesList params={{}}/>}/>
          <Route exact path="/players" element={<PlayersListPage/>}/>
          <Route exact path="/details/team/:id" element={<TeamDetails/>}/>
          <Route exact path="/details/player/:id" element={<PlayerDetails/>}/>
          <Route exact path="/details/match/:id" element={<MatchDetails/>}/>
          <Route exact path="/details/match/edit/:id" element={<PerformanceForm/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/user/account" element={<Account/>}/>
          <Route exact path="/user/teams" element={<UserTeams/>}/>
          <Route exact path="/user/matches" element={<UserMatches/>}/>
          <Route exact path="/user/friends" element={<UserFriends/>}/>
      </Routes>
  );
}

export default Main;
