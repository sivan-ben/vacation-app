import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux'
import { addFolloweAction } from '../../redux/actions'
import { format } from 'date-fns'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        card: {
            maxWidth: 345,
        },
        media: {
            height: '150px'
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
        }
    }),
);


export default function Vacation(props:any) {
    const classes = useStyles();
    const { vacation } = props
    const dispatch = useDispatch()
    const addFolow = async (vacationId:any) => {
        dispatch(addFolloweAction(vacationId))
    }

    const iconColor = vacation.user_id ? 'secondary' : 'primary';

    return (
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
                        depart:  {format(new Date(vacation.depart), 'yyyy-MM-dd')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        return: {format(new Date(vacation.return), 'yyyy-MM-dd')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" color={iconColor}>
                        <FavoriteIcon onClick={async () => addFolow(vacation.id)}

                        />

                    </IconButton>
                    {vacation.followers}
                </CardActions>

            </Card>
        </div>
    )
}