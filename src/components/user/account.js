import React, {useState, useEffect} from "react";
import {FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {auth, uploadAvatar} from "../../services/user_services";
import {useAuth} from "../../hooks/useAuth";
import {Link} from "react-router-dom";

function Account() {

    const {authData, setAuth} = useAuth();
    const [photo, setPhoto] = useState();

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('photo', photo, photo.name)
        const playerData = await uploadAvatar(authData.user.player.id, uploadData);
    }


  return (
      <div>
          <React.Fragment>
              <h1>Twoje dane {authData.user.username}</h1>
              <img src={"http://localhost:8000" + authData.user.player.photo} alt="user photo" height="100"/>
              <form onSubmit={uploadFile}>
                  <label>
                      <p>Wybierz swoje zdjęcie</p>
                      <TextField type="file" onChange={ e => setPhoto(e.target.files[0])}/>
                  </label>
                  <Button type="submit" variant="contained">Wrzuć zdjęcie</Button>
              </form>
          </React.Fragment>
      </div>
  );
}

export default Account;
