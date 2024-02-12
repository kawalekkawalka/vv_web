import React, {useState, } from "react";
import {InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {auth} from "../../services/user_services";
import {useAuth} from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import {FormTextField} from "../layout/elements";
import {NotificationManager} from "react-notifications";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {authData, setAuth} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await auth({username, password});
        setAuth(data);
        if(data){
            navigate("/user/account");
        }else{
            NotificationManager.warning("Podałeś złe dane. Spróbuj ponownie");
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


  return (
      <div>
          <React.Fragment>
              <h1>Zaloguj się</h1>
              <form onSubmit={handleSubmit}>
              <div>
                  <FormTextField label="Nazwa użytkownika" onChange={ e => setUsername(e.target.value)}/>
              </div>
              <div>
                  <FormTextField label="Hasło" onChange={ e => setPassword(e.target.value) }
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
                  Zaloguj
              </Button>
                  </form>
              <Link to={'/register'}>Utwórz nowe konto, jeśli jeszcze go nie posiadasz</Link>
          </React.Fragment>
      </div>
  );
}

export default Login;
