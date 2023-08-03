import React, {useState, useEffect} from "react";
import {FormControl, InputAdornment, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {auth, changePassword, register, uploadAvatar} from "../../services/user_services";
import {useAuth} from "../../hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {NotificationManager} from "react-notifications";
import {FormTextField} from "../layout/elements";

function Account() {

    const {authData, setAuth} = useAuth();
    const [photo, setPhoto] = useState();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const passMatch = () => {
        return password === password2;
    }
      const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangePassword = async e => {
        e.preventDefault();
        if(passMatch()){
            const passData = await changePassword(
                {old_password: oldPassword, new_password: password},
                authData.user.id, authData.token);
            if(passData){
                NotificationManager.success("Hasło zostało pomyślnie zmienione");
            }
        }else {
            NotificationManager.warning("Hasła nie są identyczne");
        }
    }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('photo', photo, photo.name)
        const playerData = await uploadAvatar(authData.user.player.id, uploadData, authData.token);
    }


  return (
      <div>
          <React.Fragment>
              <h1>Twoje dane {authData.user.username}</h1>
              <img src={"http://localhost:8000" + authData.user.player.photo} alt="user photo" height="100"/>
              <form onSubmit={uploadFile}>
                  <label>
                      <p>Wybierz swoje zdjęcie:</p>
                      <TextField type="file" onChange={ e => setPhoto(e.target.files[0])}/>

                  </label>
                  <br/>
                  <Button type="submit" variant="contained">Wrzuć zdjęcie</Button>
              </form>

              <br/>
              <p>Zmień hasło:</p>
              <form onSubmit={handleChangePassword}>
              <div>
                  <FormTextField label="Stare hasło" onChange={ e => setOldPassword(e.target.value) }
                                 type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: 'white' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                        ),
                    }}
                  />
              </div>
              <div>
                  <FormTextField label="Nowe hasło" onChange={ e => setPassword(e.target.value) }
                                 type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: 'white' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                        ),
                    }}
                  />
              </div>
                  <div>
                    <FormTextField label="Powtórz nowe hasło" onChange={ e => setPassword2(e.target.value) }
                                 type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: 'white' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                        ),
                    }}
                  />
                  </div>



              <Button color="primary" variant="contained" type="submit" sx={{ m: 1, width: '25ch' }}>
                  Zmień hasło
              </Button>
                  </form>
          </React.Fragment>
      </div>
  );
}

export default Account;
