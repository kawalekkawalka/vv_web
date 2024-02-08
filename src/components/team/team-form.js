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
import {createTeam} from "../../services/team-services";

const tableTheme = createTheme({});

export default function TeamForm({ onReloadTeamList }) {
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
                Załóż nową drużynę
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
                        formJson.owner = authData.user.id
                        createTeam(formJson, authData.token)
                            .then(res => {
                                console.log(res);
                                NotificationManager.success("Drużyna dodana");
                                onReloadTeamList();
                            })
                            .catch(error => {
                                console.error(error);
                                NotificationManager.error("Wystąpił błąd podczas dodawania drużyny");
                            });
                        handleClose();
                    },
                }
                }
            >
                < DialogTitle textAlign={'center'}>Załóż drużynę</DialogTitle>
                <DialogContent>
                    <ThemeProvider theme={tableTheme}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Nazwa drużyny"
                            type="text"
                            variant="standard"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Opis drużyny"
                            type="text"
                            variant="standard"
                            fullWidth
                        />
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