import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useCustomForm from '../hooks/useCustomForm';
import { useDispatch } from 'react-redux'
import { editVacationAction } from '../../redux/actions'
import { format } from 'date-fns'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
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



export default function TransitionsModal(props: any) {
    const classes = useStyles();
    const { vacation } = props;

    const initialState: any = {
        destination: vacation.destination,
        description: vacation.description,
        depart: vacation.depart,
        returnn: vacation.return,
        price: vacation.price,
        picture: vacation.picture,
        id: vacation.id
    }
    const [data, handleChange] = useCustomForm(initialState)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const handleClose = async () => {
        dispatch(editVacationAction(data))
        setOpen(false);
    }
    const handleOpen = (vacation: any) => {
        setOpen(true);
    };

    return (
        <div>
            <IconButton aria-label="edit">
                <EditIcon onClick={() => handleOpen(vacation)} />

            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>     <TextField id="standard-required" label="destination" name="destination" defaultValue={vacation.destination} onChange={handleChange} /></div>
                            <div> <TextField id="standard-basic" label="description" name="description" defaultValue={vacation.description} onChange={handleChange} /></div>
                            <div>  <TextField id="standard-basic" label="picture" name="picture" defaultValue={vacation.picture} onChange={handleChange} /></div>
                            <div> <TextField
                                id="datetime-local"
                                label="depart date"
                                type="date"
                                defaultValue={format(new Date(vacation.depart), 'yyyy-MM-dd')}
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
                                    defaultValue={format(new Date(vacation.return), 'yyyy-MM-dd')}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="returnn"
                                    onChange={handleChange}
                                /></div>
                            <div> <TextField id="standard-basic" label="price" type="number" name="price" defaultValue={vacation.price} onChange={handleChange} /></div>
                            <br></br>
                            <div>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                >
                                    save vacation
                        </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}