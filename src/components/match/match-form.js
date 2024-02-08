import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {createTheme, FormControl, InputLabel, Select, ThemeProvider} from "@mui/material";
import {createMatch, updateMatch} from "../../services/match-services";
import {sendPerformance} from "../../services/performance-services";
import {NotificationManager} from "react-notifications";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatch} from "../../hooks/fetch-match";
import {createTeam, getTeamsNames} from "../../services/team-services";
import MenuItem from "@mui/material/MenuItem";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {useEffect} from "react";

const tableTheme = createTheme({});

export default function MatchForm({onReloadMatchList}) {
    const [open, setOpen] = React.useState(false);
    const {authData} = useAuth();
    const [ownerTeams, setOwnerTeams] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const [selectedOwnerTeam, setSelectedOwnerTeam] = React.useState('');
    const [selectedTeam, setSelectedTeam] = React.useState('');

    useEffect(() => {
        const fetchTeamsData = async () => {
            try {
                const ownerTeamsData = await getTeamsNames({owner: authData.user.id});
                setOwnerTeams(ownerTeamsData);
                const teamsData = await getTeamsNames({});
                setTeams(teamsData);
            } catch (error) {
                console.error('Error fetching teams data:', error);
            }
        };
        fetchTeamsData();
    }, [authData.user.id]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                color="primary"
                variant="contained" onClick={handleClickOpen}>
                Zaplanuj nowy mecz
            </Button>
            {ownerTeams && teams && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            formJson.time = `${formJson.date}T${formJson.time}:00Z`;
                            createMatch(formJson, authData.token)
                                .then(res => {
                                    console.log(res);
                                    if(res.id){
                                        NotificationManager.success("Mecz dodany");
                                        onReloadMatchList();
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                    NotificationManager.error("Wystąpił błąd podczas dodawania meczu");
                                });
                            handleClose();
                        },
                    }
                    }
                >
                    <DialogTitle textAlign={'center'}>Zaplanuj nowy mecz</DialogTitle>
                    <DialogContent>
                        <ThemeProvider theme={tableTheme}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="team1">Twoja drużyna</InputLabel>
                                <Select
                                    value={selectedOwnerTeam}
                                    onChange={(event) => setSelectedOwnerTeam(event.target.value)}
                                    label="Twoja drużyna"
                                    id="team1"
                                    name="team1"
                                >
                                    {ownerTeams.map((teamName) => (
                                        <MenuItem key={teamName} value={teamName}>
                                            {teamName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="team2">Drużyna przeciwna</InputLabel>
                                <Select
                                    value={selectedTeam}
                                    onChange={(event) => setSelectedTeam(event.target.value)}
                                    label="Drużyna przeciwna"
                                    id="team2"
                                    name="team2"
                                >
                                    {teams.map((teamName) => (
                                        <MenuItem key={teamName} value={teamName}>
                                            {teamName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="date"
                                    name="date"
                                    type="date"
                                    variant="standard"
                                    fullWidth
                                />
                                <FormControl fullWidth margin="normal">
                                </FormControl>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="time"
                                    name="time"
                                    type="time"
                                    variant="standard"
                                    fullWidth
                                />
                            </FormControl>
                        </ThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button type="submit">Zapisz</Button>
                    </DialogActions>
                </Dialog>
            )}
        </React.Fragment>
    )
        ;
}