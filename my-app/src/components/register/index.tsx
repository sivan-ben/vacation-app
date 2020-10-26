import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useCustomForm from '../hooks/useCustomForm'
import mainAxios from '../axios'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import joi from '@hapi/joi'


const schema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.number().min(6).required(),
    first_name: joi.string().min(6).required(),
    last_name: joi.string().min(6).required(),
})

export default function Register(props: any) {

    const initialState = { username: "", password: "", first_name: "", last_name: "" }
    const [data, handleChange] = useCustomForm(initialState)


    const handleRegister = async (e: any) => {
        e.preventDefault();

        const errors = schema.validate(data);
        if (errors.error) {
            const { details } = errors.error
            alert(details[0].message);
            return;
        }

        const result = await mainAxios.post('/register', data)
        const { redirect } = result.data
        if (redirect) {
            props.history.push("/login")
        }
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div>
                <Avatar>

                </Avatar>
                <Typography component="h1" variant="h5">
                    REGISTER
                     </Typography>
                <form noValidate>
                    <TextField
                        className="inputLogin"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="user name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        className="inputLogin"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <TextField
                        className="inputLogin"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="first_name"
                        label="first name"
                        type="strinf"
                        id="first_name"
                        autoComplete="first name"
                        onChange={handleChange}
                    />
                    <TextField
                        className="inputLogin"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="last_name"
                        label="lastName"
                        type="lastName"
                        id="lastName"
                        autoComplete="lastName"
                        onChange={handleChange}
                    />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                    >
                        Register
                        </Button>

                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"you have an account? login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}


