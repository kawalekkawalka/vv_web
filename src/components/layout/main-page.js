import React from "react";
import PlayersList from "../player/players-list";
import TeamList from "../team/team-list";
import MatchesList from "../match/matches-list";


export default function MainPage() {

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{borderRight: '2px solid white'}}>
          <h2>Niedawno dołączyli:</h2>
        <PlayersList params={{ amount: 3, order: 'desc'}} />
          <h2>Niedawno założone zespoły:</h2>
        <TeamList params={{ amount: 3, order: 'desc' }} />
      </div>
      <div>
          <h2>Niedawno dodane mecze:</h2>
        <MatchesList params={{ amount: 6, order: 'desc' }} />
      </div>
    </div>
    )
}
