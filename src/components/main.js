import TeamList from "./team-list";
import TeamDetails from "./team-details";
import { Routes, Route} from 'react-router-dom';
function Main() {

  return (
      <Routes>
          <Route exact path="/" element={<TeamList/>}/>
          <Route exact path="/details/team/:id" element={<TeamDetails/>}/>
      </Routes>

  );
}

export default Main;
