import React, {useState} from "react";
import {InputAdornment, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {NotificationManager} from "react-notifications";
import {FormTextField} from "../layout/elements";
import {useNavigate} from "react-router-dom";
import {getPlayerByName} from "../../services/player-services";
import PlayersList from "./players-list";

const SearchPlayerForm = React.memo(({ onSearch }) => {
    const [playerData, setPlayerData] = useState('');
    const navigate = useNavigate();

    const handleSearchPlayer = async (e) => {
        e.preventDefault();
        const [name = '', surname = ''] = playerData.split(' ');
        const player = await getPlayerByName({ name, surname });
        if (player) {
            navigate( `/details/player/${player.id}`);
            NotificationManager.success("Zawodnik znaleziona");
        } else {
            NotificationManager.warning("Nie istnieje zawodnik o podanych danych");
        }
    };

    return (
        <FormTextField
            label="Wyszukaj po imieniu i nazwisku"
            onChange={(e) => setPlayerData(e.target.value)}
            type='text'
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon
                            aria-label="search"
                            onClick={handleSearchPlayer}
                            edge="end"
                            sx={{ color: 'white' }}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
});

export default function PlayersListPage() {
    return (
        <div>
            <br/>
            <br/>
            <SearchPlayerForm />
            <PlayersList params={{}} />
        </div>
    );
}

