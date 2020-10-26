import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useCustomForm from '../hooks/useCustomForm'
import mainAxios from '../axios'
import { useDispatch } from 'react-redux';
import { setUser, deleteUser, setIsAdmin } from '../../redux/actions'
import joi from '@hapi/joi'

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: 'white'
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

const schema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.number().min(6).required(),
})



export default function Login(props: any) {
    const dispatch = useDispatch();
    localStorage.removeItem("token")
    localStorage.removeItem('isAdmin')
    const classes = useStyles();

    useEffect(() => {
        dispatch(deleteUser())
    }, [])

    const initialState = { username: "", password: null }
    const [data, handleChange] = useCustomForm(initialState)


    const handlelogin = async (e: any) => {
        e.preventDefault()

        const errors = schema.validate(data);
        if (errors.error) {
            const { details } = errors.error
            alert(details[0].message);
            return;
        }

        try {
            const { password, username } = data
            if (!password || !username) throw new Error
            const result = await mainAxios.post('/login', { ...data })
            const { data: response } = result;
            const { token } = response
            const { admin } = result.data.user
            const isAdmin = admin
            localStorage.setItem("token", token)
            dispatch(setUser({ user: result.data.user, vacations: [] }));

            if (token && !isAdmin) {
                props.history.push("/vacations")
            } else {
                dispatch(setIsAdmin(username))
                props.history.push("/admin")
            }
        } catch (error) {
            alert("invalide password or userName")
        }
    }




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    LOGIN
        </Typography>

                <form className={classes.form} noValidate>
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handlelogin}
                    >
                        LOGIN
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>

        </Container>
    );
}