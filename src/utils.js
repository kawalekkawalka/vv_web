export const API_URL = process.env.REACT_APP_API_URL;

export function status(res) {
    if( res.ok){
        return res.json();
    }
    throw new Error(res.statusText);
}

export function calculateSetResults(match) {
        const setResults = [];
        let team1 = 0;
        let team2 = 0;

        for (let i = 1; i <= 5; i++) {
            const team1Score = match[`set${i}_team1_score`];
            const team2Score = match[`set${i}_team2_score`];

            if(team1Score == 0 && team2Score == 0) {
                break;
            }
            if (team1Score > team2Score) {
                team1++;
            } else if (team1Score < team2Score) {
                team2++;
            }
        }
        if (team1 != 0 || team2 != 0) {
            setResults.push({team1score: team1, team2score: team2});
            return setResults
        }
        return null;
    }