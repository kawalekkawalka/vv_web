import React, {useState, useEffect} from "react";
import {FormControl, InputAdornment, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {auth, changePassword, register, uploadAvatar} from "../../services/user_services";
import {useAuth} from "../../hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {NotificationManager} from "react-notifications";
import {FormSelect, FormTextField} from "../layout/elements";
import MenuItem from "@mui/material/MenuItem";
import {updatePlayer} from "../../services/player-services";
import Box from "@mui/material/Box";
import {API_URL} from "../../utils";

function Account() {

    const {authData, setAuth} = useAuth();
    const [photo, setPhoto] = useState();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nick, setNick] = useState('');
    const [weight, setWeight] = useState('');
    const [position, setPosition] = useState('');

    const passMatch = () => {
        return password === password2;
    }
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUpdatePlayerData = async event => {
        event.preventDefault();
        console.log({nick, weight, position})
        const updated = await updatePlayer({
                nick: nick !== '' ? nick : undefined,
                weight: weight !== '' ? weight : undefined, position: position !== '' ? position : undefined
            },
            authData.user.player.id, authData.token)
        if (updated) {
            NotificationManager.success("Zaktualizowano dane");
        }
    }

    const handleChangePassword = async e => {
        e.preventDefault();
        if (passMatch()) {
            const passData = await changePassword(
                {old_password: oldPassword, new_password: password},
                authData.user.id, authData.token);
            if (passData) {
                NotificationManager.success("Hasło zostało pomyślnie zmienione");
            }
        } else {
            NotificationManager.warning("Hasła nie są identyczne");
        }
    }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        if (photo){
            uploadData.append('photo', photo, photo.name)
            const playerData = await uploadAvatar(authData.user.player.id, uploadData, authData.token);
            if (playerData){
                NotificationManager.success("Awatar został zmieniony");
            }
        }

    }


    return (
        <div>
            <React.Fragment>
                <h1>Twoje dane {authData.user.username}</h1>
                <img src={API_URL + authData.user.player.photo_url} alt="user photo" height="100"/>
                <hr/>
                <p>Zmień swoje dane:</p>
                <form onSubmit={handleUpdatePlayerData}>
                    <Box>
                        <FormTextField label="Pseudonim" onChange={(e) => setNick(e.target.value)}/>
                    </Box>
                    <Box>
                        <FormTextField label="Waga" onChange={(e) => setWeight(e.target.value)}/>
                    </Box>
                    <Box>
                        <FormControl focused={false}>
                            <InputLabel id="position-label">Pozycja</InputLabel>
                            <FormSelect
                                labelId="position-label"
                                value={position}
                                label="Pozycja"
                                onChange={(e) => setPosition(e.target.value)}
                            >
                                <MenuItem value={"L"}>Libero</MenuItem>
                                <MenuItem value={"S"}>Rozgrywający</MenuItem>
                                <MenuItem value={"OH"}>Przyjmujący</MenuItem>
                                <MenuItem value={"OP"}>Atakujący</MenuItem>
                                <MenuItem value={"MB"}>Środkowy</MenuItem>
                            </FormSelect>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button color="primary" variant="contained" type="submit" sx={{m: 1, width: "25ch"}}>
                            Zmień dane
                        </Button>
                    </Box>
                </form>
                <hr/>
                <form onSubmit={uploadFile}>
                    <label>
                        <p>Wybierz swoje zdjęcie:</p>
                        <TextField type="file" onChange={e => setPhoto(e.target.files[0])}/>

                    </label>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained">Wrzuć zdjęcie</Button>
                    <br/>
                </form>

                <hr/>
                <p>Zmień hasło:</p>
                <form onSubmit={handleChangePassword}>
                    <div>
                        <FormTextField label="Stare hasło" onChange={e => setOldPassword(e.target.value)}
                                       type={showPassword ? 'text' : 'password'}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                       edge="end"
                                                       sx={{color: 'white'}}
                                                   >
                                                       {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}
                        />
                    </div>
                    <div>
                        <FormTextField label="Nowe hasło" onChange={e => setPassword(e.target.value)}
                                       type={showPassword ? 'text' : 'password'}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                       edge="end"
                                                       sx={{color: 'white'}}
                                                   >
                                                       {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}
                        />
                    </div>
                    <div>
                        <FormTextField label="Powtórz nowe hasło" onChange={e => setPassword2(e.target.value)}
                                       type={showPassword ? 'text' : 'password'}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                       edge="end"
                                                       sx={{color: 'white'}}
                                                   >
                                                       {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}
                        />
                    </div>


                    <Button color="primary" variant="contained" type="submit" sx={{m: 1, width: '25ch'}}>
                        Zmień hasło
                    </Button>
                </form>
            </React.Fragment>
        </div>
    );
}

export default Account;
