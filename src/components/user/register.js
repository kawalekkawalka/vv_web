import React, {useState, useEffect} from "react";
import {FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, Select} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {auth, register} from "../../services/user_services";
import {useAuth} from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [year_of_birth, setYear] = useState('');
    const [height, setHeight] = useState('');
    const [position, setPosition] = useState('');
    const {authData, setAuth} = useAuth();
    const navigate = useNavigate();

    const passMatch = () => {
        return password === password2;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(passMatch()){
            const regData = await register({username, password, email,
                player: {name, surname, year_of_birth, height, position}});
            if(regData){
                const data = await auth({username, password});
                setAuth(data);
                navigate("/account");
            }
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
              <h1>Uzupełnij dane</h1>
              <form onSubmit={handleSubmit}>
              <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="login" >Nazwa użytkownika</InputLabel>
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
                    <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
                      <InputLabel htmlFor="password">Hasło</InputLabel>
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
                  <div>
                    <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
                      <InputLabel htmlFor="password2">Powtórz hasło</InputLabel>
                      <OutlinedInput
                        id="password2"
                        type={showPassword ? 'text' : 'password'}
                        onChange={ e => setPassword2(e.target.value)}
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
                        label="Password2"
                      />
                    </FormControl>
                  </div>
                  <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="name" >Imię</InputLabel>
                      <OutlinedInput
                        id="name"
                        endAdornment={
                          <InputAdornment position="end" >
                          </InputAdornment>
                        }
                        label="Name"
                        onChange={ e => setName(e.target.value)}
                      />
                  </FormControl>
                  </div>
                  <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="surname" >Nazwisko</InputLabel>
                      <OutlinedInput
                        id="surname"
                        endAdornment={
                          <InputAdornment position="end" >
                          </InputAdornment>
                        }
                        label="Surname"
                        onChange={ e => setSurname(e.target.value)}
                      />
                  </FormControl>
                  </div>
                  <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="email" >Email</InputLabel>
                      <OutlinedInput
                        id="Email"
                        endAdornment={
                          <InputAdornment position="end" >
                          </InputAdornment>
                        }
                        label="Email"
                        onChange={ e => setEmail(e.target.value)}
                      />
                  </FormControl>
                  </div>
                  <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="year" >Rok urodzenia</InputLabel>
                      <OutlinedInput
                        id="year"
                        endAdornment={
                          <InputAdornment position="end" >
                          </InputAdornment>
                        }
                        label="Year"
                        onChange={ e => setYear(e.target.value)}
                      />
                  </FormControl>
                  </div>
                  <div>
                  <FormControl sx={{ m: 1, width: '25ch',} } variant="outlined" >
                      <InputLabel htmlFor="height" >Wzrost</InputLabel>
                      <OutlinedInput
                        id="height"
                        endAdornment={
                          <InputAdornment position="end" >
                          </InputAdornment>
                        }
                        label="Height"
                        onChange={ e => setHeight(e.target.value)}
                      />
                  </FormControl >
                  </div>
                  <div>
                      <FormControl sx={{ m: 1, width: '25ch',} }>
                          <InputLabel id="position">Pozycja</InputLabel>
                          <Select
                            id="position"
                            value={position}
                            label="Age"
                            onChange={ e => setPosition(e.target.value)}
                          >
                            <MenuItem value={"L"}>Libero</MenuItem>
                            <MenuItem value={"S"}>Rozgrywający</MenuItem>
                            <MenuItem value={"OH"}>Przyjmujący</MenuItem>
                            <MenuItem value={"OP"}>Atakujący</MenuItem>
                            <MenuItem value={"MB"}>Środkowy</MenuItem>
                          </Select>
                      </FormControl>
                  </div>

              <Button color="primary" variant="contained" type="submit" sx={{ m: 1, width: '25ch' }}>
                  Stwórz konto
              </Button>
                  </form>

          </React.Fragment>
      </div>
  );
}

export default Login;
