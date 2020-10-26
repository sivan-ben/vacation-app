import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useCustomForm from '../hooks/useCustomForm';
import { useDispatch } from 'react-redux'
import { saveVacationAction } from '../../redux/actions'
import joi from '@hapi/joi'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

const schema = joi.object({
    destination: joi.string().min(3).required(),
    description: joi.string().min(6).required(),
    depart: joi.required(),
    returnn: joi.required(),
    price: joi.number().required(),
    picture: joi.required()
})


export default function AddVacation(props: any) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const initialState = { destination: "", description: "", depart: "", returnn: "", price: "", picture: "" }
    const [data, handleChange] = useCustomForm(initialState)

    const saveVacation = async (e: any) => {
        e.preventDefault()
        const errors = schema.validate(data);
        if (errors.error) {
            const { details } = errors.error
            alert(details[0].message);
            return;
        }

        dispatch(saveVacationAction(data, props))
    }

    return (
        <div>
            <div className="addVacationCard">
                <form className={classes.root} noValidate autoComplete="off">
                    <div>     <TextField id="standard-required" label="destination" name="destination" onChange={handleChange} /></div>
                    <div> <TextField id="standard-basic" label="description" name="description" onChange={handleChange} /></div>
                    <div>  <TextField id="standard-basic" label="picture" name="picture" onChange={handleChange} /></div>
                    <div> <TextField
                        id="datetime-local"
                        label="depart date"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="depart"
                        onChange={handleChange}
                    />
                        <TextField
                            id="datetime-local"
                            label="return date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="returnn"
                            onChange={handleChange}
                        /></div>
                    <div> <TextField id="standard-basic" type="number" label="price" name="price" onChange={handleChange} /></div>
                    <br></br>
                    <div >
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={saveVacation}
                        >
                            save vacation
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}