import React, {useState, useEffect} from "react";
import {FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {auth} from "../services/user_services";
import {useAuth} from "../hooks/useAuth";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {authData, setAuth} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await auth({username, password});
        setAuth(data);
        console.log(username, password)
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


  return (
      <div>
          <React.Fragment>
              <h1>Login screen</h1>
              <form onSubmit={handleSubmit}>
              <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="login" sx={{color: 'white'}} >Login</InputLabel>
                      <OutlinedInput
                        id="Login"
                        endAdornment={
                          <InputAdornment position="end" >
                          </InputAdornment>
                        }
                        label="Login"
                        onChange={ e => setUsername(e.target.value)}
                      />
                  </FormControl>
                  </div>
              <div>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                      <InputLabel htmlFor="password" sx={{color: 'white'}}>Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={ e => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
              <Button color="primary" variant="contained" type="submit" sx={{ m: 1, width: '25ch' }}>
                  Login
              </Button>
                  </form>
          </React.Fragment>
      </div>
  );
}

export default Login;
