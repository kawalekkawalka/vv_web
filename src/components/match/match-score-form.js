import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {createTheme, ThemeProvider} from "@mui/material";
import {updateMatch} from "../../services/match-services";
import {sendPerformance} from "../../services/performance-services";
import {NotificationManager} from "react-notifications";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatch} from "../../hooks/fetch-match";

const tableTheme = createTheme({});

export default function MatchScoreForm({match}) {
    const [open, setOpen] = React.useState(false);
    const {authData} = useAuth();

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
                Edytuj wynik setów
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const numericFields = ["set4_team1_score", "set4_team2_score", "set5_team1_score", "set5_team2_score"];
                            numericFields.forEach(field => {
                                formJson[field] = formJson[field] === "" ? 0 : parseInt(formJson[field], 10);
                                });
                                updateMatch(formJson, authData.token, match.id)
                                    .then(res => {
                                        console.log(res);
                                        NotificationManager.success("Wynik zaktualizowany");
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        console.error(error);
                                        NotificationManager.error("Wystąpił błąd podczas aktualizacji meczu");
                                    });
                                handleClose();
                            },
                        }
                    }
                    >
                    < DialogTitle textAlign={'center'}>{match.team1_name} vs {match.team2_name}</DialogTitle>
                    <DialogContent>
                    <DialogContentText textAlign={'center'}>
                Podaj wyniki poszczególnych setów.
            </DialogContentText>
            <ThemeProvider theme={tableTheme}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '8px'}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="set1_team1_score"
                            name="set1_team1_score"
                            label={`Set 1 ${match.team1_name}`}
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="set1_team2_score"
                            name="set1_team2_score"
                            label={`Set 1 ${match.team2_name}`}
                            type="number"
                            style={{marginLeft: '8px'}}
                            variant="standard"
                        />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '8px'}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="set2_team1_score"
                            name="set2_team1_score"
                            label={`Set 2 ${match.team1_name}`}
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="set2_team2_score"
                            name="set2_team2_score"
                            label={`Set 2 ${match.team2_name}`}
                            type="number"
                            style={{marginLeft: '8px'}}
                            variant="standard"
                        />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '8px'}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="set3_team1_score"
                            name="set3_team1_score"
                            label={`Set 3 ${match.team1_name}`}
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="set3_team2_score"
                            name="set3_team2_score"
                            label={`Set 3 ${match.team2_name}`}
                            type="number"
                            style={{marginLeft: '8px'}}
                            variant="standard"
                        />
                    </div>
                </div>

                {/* Set 4 */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '8px'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="set4_team1_score"
                            name="set4_team1_score"
                            label={`Set 4 ${match.team1_name}`}
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="set4_team2_score"
                            name="set4_team2_score"
                            label={`Set 4 ${match.team2_name}`}
                            type="number"
                            style={{marginLeft: '8px'}}
                            variant="standard"
                        />
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '8px'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="set5_team1_score"
                            name="set5_team1_score"
                            label={`Set 5 ${match.team1_name}`}
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="set5_team2_score"
                            name="set5_team2_score"
                            label={`Set 5 ${match.team2_name}`}
                            type="number"
                            style={{marginLeft: '8px'}}
                            variant="standard"
                        />
                    </div>
                </div>
            </ThemeProvider>
        </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button type="submit">Zapisz</Button>
    </DialogActions>
</Dialog>
</React.Fragment>
)
    ;
}