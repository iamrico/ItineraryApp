import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import hk from '../images/hk.png';
import classnames from 'classnames'
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
    hover:{
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      transform: 'scale(1.01,1.01)'
    }
};


class SubCard extends Component{

    state = {
      hoverEffect:false,
    }

    hover = () =>{
      this.setState({hoverEffect:true})
    }

    hoverOut = () =>{
      this.setState({hoverEffect:false})
    }

    handleClick = (data) => {
        this.props.onFeatureChange({...this.props.item});
    }

    render(){
      const {classes} = this.props; 
      return (
        <Card className={classnames(classes.card,{
          [classes.hover]:this.state.hoverEffect,
        })}  onMouseOver={this.hover} onMouseOut={this.hoverOut}>
          <CardMedia
            className={classes.media}
            image={ this.props.item.image ? this.props.item.image : hk}
            title="Paella dish"
          />
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            </Typography>
            
            <Typography variant="h5" component="h2">
              {this.props.item.title}
            </Typography>
            <Typography className={classes.pos} variant='h6' component='h6' color="textSecondary">
              <i>{this.props.item.location}</i>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Posted on {this.props.item.datePosted}
            </Typography>
            <Typography component="p">
               &nbsp;
              {this.props.item.description}
              <br />
            </Typography>
            <h6>
              <Typography>
                  &nbsp;
                <b>${this.props.item.totalCost}</b> 
              </Typography>
            </h6>
            
          </CardContent>
          <CardActions>
            <Button size="large" onClick={this.handleClick}>DISCOVER</Button>
          </CardActions>
        </Card>
      );
    }

    
}

SubCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubCard)