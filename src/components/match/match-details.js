import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";
import {useFetchMatch} from "../../hooks/fetch-match";
import {DateTime} from "luxon";
import {calculateSetResults} from "../../utils";
import {useFetchPerformances} from "../../hooks/fetch-performances";
import MatchPerformanceTable from "../tables/match-performance-table";
import Player from "../player/player";
import Button from "@mui/material/Button";
import MatchWithScore from "./match-with-score";
import {useFetchMatchParticipants} from "../../hooks/fetch-match-participants";

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        margin: '20px',
        padding: '20px',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    playersContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        marginTop: '10px',
    },
    totalScore: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
})

function splitPerformancesByTeam(performances, team1Id, team2Id) {
    const team1Performances = performances.filter((performance) => performance.team.id === team1Id);
    const team2Performances = performances.filter((performance) => performance.team.id === team2Id);
    if (team1Performances.length == 0 && team2Performances.length == 0) {
        return NaN, NaN;
    }
    return {
        team1Performances, team2Performances
    };
}

function findPerformanceWithHighestScore(performances) {
    if (!performances || performances.length === 0) {
        return null;
    }

    const highestScorePerformance = performances.reduce((maxPerformance, currentPerformance) => {
        return currentPerformance.total_score > maxPerformance.total_score ? currentPerformance : maxPerformance;
    }, performances[0]);

    return highestScorePerformance;
}

function findPerformanceWithMostAces(performances) {
    if (!performances || performances.length === 0) {
        return null;
    }

    const highestScorePerformance = performances.reduce((maxPerformance, currentPerformance) => {
        return currentPerformance.serve_ace > maxPerformance.serve_ace ? currentPerformance : maxPerformance;
    }, performances[0]);

    return highestScorePerformance;
}

function findPerformanceWithMostPositiveReceptions(performances) {
    if (!performances || performances.length === 0) {
        return null;
    }

    const highestScorePerformance = performances.reduce((maxPerformance, currentPerformance) => {
        return currentPerformance.positive_reception > maxPerformance.positive_reception ? currentPerformance : maxPerformance;
    }, performances[0]);

    return highestScorePerformance;
}

function findPerformanceWithMostSpikePoints(performances) {
    if (!performances || performances.length === 0) {
        return null;
    }

    const highestScorePerformance = performances.reduce((maxPerformance, currentPerformance) => {
        return currentPerformance.spike_point > maxPerformance.spike_point ? currentPerformance : maxPerformance;
    }, performances[0]);

    return highestScorePerformance;
}

function findPerformanceWithMostBlocks(performances) {
    if (!performances || performances.length === 0) {
        return null;
    }

    const highestScorePerformance = performances.reduce((maxPerformance, currentPerformance) => {
        return currentPerformance.block_amount > maxPerformance.block_amount ? currentPerformance : maxPerformance;
    }, performances[0]);

    return highestScorePerformance;
}

const PlayerComparison = ({team1Performances, team2Performances, findPerformanceFunc, statLabel, label}) => {
    const classes = useStyles();

    const performance1 = findPerformanceFunc(team1Performances);
    const performance2 = findPerformanceFunc(team2Performances);

    return (
        <div className={classes.container}>
            <h2 className={classes.header}>{label}:</h2>
            <div className={classes.playersContainer}>
                <Player player={performance1.player}/>
                <span className={classes.totalScore}>{performance1[statLabel]}</span>
                <span className={`${classes.header} ${classes.totalScore}`} style={{fontSize: '30px'}}>vs</span>
                <span className={classes.totalScore}>{performance2[statLabel]}</span>
                <Player player={performance2.player}/>
            </div>
        </div>
    );
};

function MatchDetails() {

    const {id} = useParams();
    const [match, loading, error] = useFetchMatch(id);
    const [performances] = useFetchPerformances({match: id})
    const [participants] = useFetchMatchParticipants({match: id})
    const {authData} = useAuth()
    const classes = useStyles();
    const [team1Performances, setTeam1Performances] = useState();
    const [team2Performances, setTeam2Performances] = useState();
    const [isParticipant, setParticipant] = useState(false);

    useEffect(() => {
        if (match && performances) {
            const {team1Performances, team2Performances} = splitPerformancesByTeam(
                performances, match.team1, match.team2);
            setTeam1Performances(team1Performances);
            setTeam2Performances(team2Performances);
        }
    }, [performances])

    useEffect(() => {
        if (participants && authData?.user) {
            setParticipant(!!participants.find(participant => participant.id === authData.user.player.id));
        }
    }, [participants])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            {match &&
                <div>
                    <MatchWithScore match={match}/>
                    <hr/>
                    {team1Performances && team2Performances ? (
                        <div>
                            <MatchPerformanceTable performances={team1Performances}
                                                   tableName={match.team1_name}></MatchPerformanceTable>
                            <MatchPerformanceTable performances={team2Performances}
                                                   tableName={match.team2_name}></MatchPerformanceTable>
                            <hr/>
                            <PlayerComparison team1Performances={team1Performances}
                                              team2Performances={team2Performances}
                                              findPerformanceFunc={findPerformanceWithHighestScore}
                                              label="Najwięcej punktów" statLabel="total_score"/>
                            <PlayerComparison team1Performances={team1Performances}
                                              team2Performances={team2Performances}
                                              findPerformanceFunc={findPerformanceWithMostAces} label="Najwięcej asów"
                                              statLabel="serve_ace"/>
                            <PlayerComparison team1Performances={team1Performances}
                                              team2Performances={team2Performances}
                                              findPerformanceFunc={findPerformanceWithMostPositiveReceptions}
                                              label="Najwięcej pozytywnych przyjęć"
                                              statLabel="positive_reception"/>
                            <PlayerComparison team1Performances={team1Performances}
                                              team2Performances={team2Performances}
                                              findPerformanceFunc={findPerformanceWithMostSpikePoints}
                                              label="Najwięcej skończonych ataków"
                                              statLabel="spike_point"/>
                            <PlayerComparison team1Performances={team1Performances}
                                              team2Performances={team2Performances}
                                              findPerformanceFunc={findPerformanceWithMostBlocks}
                                              label="Najwięcej bloków"
                                              statLabel="block_amount"/>
                        </div>
                    ) : (
                        <div>
                            <h1>Brak statystyk dla tego spotkania</h1>

                        </div>
                    )
                    }
                    {isParticipant && (
                        <Button href={`/details/match/edit/${match.id}`} color="primary" variant="contained">
                            Dodaj statystyki
                        </Button>
                    )
                    }
                    <div>
                        <hr/>
                        <Comments comments={match.comments} objectId={match.id} contentType={'match'}/>
                    </div>
                </div>
            }
        </div>
    )
        ;

};

export default MatchDetails;
