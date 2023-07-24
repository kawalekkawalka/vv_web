import TeamList from "../team/team-list";
import TeamDetails from "../team/team-details";
import Login from "../user/login"
import { Routes, Route} from 'react-router-dom';
import Register from "../user/register";
import Account from "../user/account";
function Main() {

  return (
      <Routes>
          <Route exact path="/" element={<TeamList/>}/>
          <Route exact path="/details/team/:id" element={<TeamDetails/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/account" element={<Account/>}/>
      </Routes>

  );
}

export default Main;
