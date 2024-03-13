import React, {useState} from "react";
import TeamList from "./team-list";
import Paper from "@mui/material/Paper";
import {InputAdornment, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {changePassword} from "../../services/user_services";
import {NotificationManager} from "react-notifications";
import {getTeamByName} from "../../services/team-services";
import {FormTextField} from "../layout/elements";
import {useNavigate} from "react-router-dom";

const SearchTeamForm = React.memo(({ onSearch }) => {
    const [teamName, setTeamName] = useState('');
    const navigate = useNavigate();

    const handleSearchTeam = async (e) => {
        e.preventDefault();
        const team = await getTeamByName({ name: teamName });
        if (team) {
            navigate( `/details/team/${team.id}`);
            NotificationManager.success("Drużyna znaleziona");
        } else {
            NotificationManager.warning("Nie istnieje drużyna o podanej nazwie");
        }
    };

    return (
        <FormTextField
            label="Wyszukaj zespół po nazwie"
            onChange={(e) => setTeamName(e.target.value)}
            type='text'
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon
                            aria-label="search"
                            onClick={handleSearchTeam}
                            edge="end"
                            sx={{ color: 'white' }}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
});

export default function TeamListPage() {
    return (
        <div>
            <br/>
            <br/>
            <SearchTeamForm />
            <TeamList params={{}} />
        </div>
    );
}

