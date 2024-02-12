import React, {useState, useEffect} from "react";
import {FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, Select} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {auth, register} from "../../services/user_services";
import {useAuth} from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {NotificationManager} from "react-notifications";
import {FormSelect, FormTextField} from "../layout/elements";

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
                navigate("/user/account");
                NotificationManager.success("Twoje konto zostało pomyślnie utworzone");
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
                  <div>
                    <FormTextField label="Powtórz hasło" onChange={ e => setPassword2(e.target.value) }
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
                    <FormTextField label="Imię" onChange={ e => setName(e.target.value)}/>
                  </div>
                  <div>
                    <FormTextField label="Nazwisko" onChange={ e => setSurname(e.target.value)}/>
                  </div>
                  <div>
                    <FormTextField label="Email" onChange={ e => setEmail(e.target.value)} type="email"/>
                  </div>
                  <div>
                    <FormTextField label="Rok urodzenia" onChange={ e => setYear(e.target.value)}/>
                  </div>
                  <div>
                    <FormTextField label="Wzrost" onChange={ e => setHeight(e.target.value)}/>
                  </div>
                  <div>
                      <FormControl focused={false}>
                          <InputLabel id="position-label">
                            Pozycja
                          </InputLabel>
                          <FormSelect // Use the custom styled component here
                            labelId="position-label"
                            value={position}
                            label="Pozycja"
                            onChange={(e) => setPosition(e.target.value)}
                          >
                            <MenuItem value={'L'}>Libero</MenuItem>
                            <MenuItem value={'S'}>Rozgrywający</MenuItem>
                            <MenuItem value={'OH'}>Przyjmujący</MenuItem>
                            <MenuItem value={'OP'}>Atakujący</MenuItem>
                            <MenuItem value={'MB'}>Środkowy</MenuItem>
                          </FormSelect>
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
