import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import hk from '../images/hk.png';

const styles = {
    card:{
        minWidth:275,
        margin:'0 auto',
        marginTop:'5%',
        // width: '70%',
        marginBottom:'0%'
    },
    bullet: {
        display:'inline-block',
        margin:'0 2px',
        transform: 'scale(0.8)',
    },
    title:{
        fontSize:20,
    },
    pos:{
        marginBottom:12,
    },
    media: {
        height:0,
        paddingTop: '46.25%', // 16:9
      },
};

function SubCard(props){
    const {classes} = props; 
    
    return (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={hk}
            title="Paella dish"
          />
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            </Typography>
            <Typography variant="h4" component="h2">
              {props.item.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Posted on {props.item.date}
            </Typography>
            <Typography component="p">
               &nbsp;
              {props.item.description}
              <br />
            </Typography>
            <Typography>
                &nbsp;
              <h6><b>{props.item.totalCost}</b></h6> 
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">DISCOVER</Button>
          </CardActions>
        </Card>
      );
}

SubCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubCard)