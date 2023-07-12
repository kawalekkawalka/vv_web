import TeamList from "./team-list";
import TeamDetails from "./team-details";
import Login from "./login"
import { Routes, Route} from 'react-router-dom';
function Main() {

  return (
      <Routes>
          <Route exact path="/" element={<TeamList/>}/>
          <Route exact path="/details/team/:id" element={<TeamDetails/>}/>
          <Route exact path="/login" element={<Login/>}/>
      </Routes>

  );
}

export default Main;
