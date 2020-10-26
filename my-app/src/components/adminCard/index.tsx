import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TransitionsModal from '../edit'
import { useDispatch } from 'react-redux'
import { deleteVacationAction } from '../../redux/actions'
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: "mediumblue",
            width: 59,
            height: 56,
        },
        desc: {
            height: '100px',
            overflow: 'auto'
        },
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
    }),
);


export default function AdminCard(props: any) {

    const classes = useStyles();
    const { vacation } = props
    const dispatch = useDispatch()
    const deleteVacation = async (vacationId: any) => {
        dispatch(deleteVacationAction(vacationId))
    }

    return (<div>
        <div className="body-card">
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {vacation.price}$
         </Avatar>
                    }

                    title={vacation.destination}

                />
                <CardMedia
                    className={classes.media}
                    image={vacation.picture}
                    title={vacation.depart}
                />
                <CardContent>
                    <div className={classes.desc}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {vacation.description}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        depart: {format(new Date(vacation.depart), 'yyyy-MM-dd')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        return:  {format(new Date(vacation.return), 'yyyy-MM-dd')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete">
                        <DeleteForeverIcon onClick={() => deleteVacation(vacation.id)} />
                    </IconButton>

                    <TransitionsModal vacation={vacation} />

                </CardActions>
            </Card>
        </div>
    </div >
    )
}