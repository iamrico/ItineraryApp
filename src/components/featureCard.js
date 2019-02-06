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
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import firestoreDB from '../components/firestore.js';

const styles = theme => ({
        card:{
            minWidth:275,
            margin:'0 auto',
            marginTop:'5%',
            width: '70%',
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
        actions: {
            display: 'flex',
        },
    
});

class FeatureCard extends Component{
    
    actions = [];

    constructor(){
        super();
        this.state = { expanded: false };
        
    }

    async componentDidMount() {
        console.log('proops', this.props)
        const itineraryRef = await firestoreDB.collection('itineraries').doc(this.props.item.id)

        itineraryRef.collection("actions").get(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id, "=>", doc.data())
            })
        })
    }
            
    



    

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render(){
        const {classes} = this.props; 

        if (!this.props.item) return <h5>Loading...</h5>

        return (
            <Card className={classes.card}>
              <CardHeader
                title="Featured Itinerary of the Month"
                subheader={`Posted on ${this.props.item && this.props.item.date| ''}`}
              />
              <CardMedia
                className={classes.media}
                image={hk}
                title="Paella dish"
              />
              <CardContent>
                
                <Typography variant="h4" component="h2">
                  {this.props.item && this.props.item.title}
                </Typography>
                
                &nbsp;
                <Typography component="p">
                 
                  {this.props.item && this.props.item.description}
                  <br />
                </Typography>
                <Typography>
                    &nbsp;
                    <h4><b>{`$ ${this.props.item && this.props.item.totalCost}`}</b></h4>
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} >
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                    <ShareIcon />
                </IconButton>
                
                <Button size="small" onClick={this.handleExpandClick}>DISCOVER</Button>
                
               
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography><b>Itinerary:</b></Typography>
                        
                    </CardContent>
                </Collapse>
            </Card>
          );
    }
   
}

FeatureCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureCard)