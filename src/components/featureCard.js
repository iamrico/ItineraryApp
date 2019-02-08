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
import ShareIcon from '@material-ui/icons/Share';
import firestoreDB from '../components/firestore.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';

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
        text:{
            textAlign:'right',
            fontSize:'4vh'
        },
        comment:{
            fontSize:15,
            color:'gray'
        },
        
    
});

class FeatureCard extends Component{
    
    actions = [];

    constructor(){
        super();
        this.state = { expanded: false };
        
    }

    async componentDidMount() {
        console.log("Mounted")
        const itineraryRef = await firestoreDB.collection('itineraries').doc(this.props.item.id)

        itineraryRef.collection("actions").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                let data = {...doc.data()};
                data.id = doc.id;
                
                
                this.actions.push({...data});
            })
        })
    }

    async componentDidUpdate(prevState,prevProps){
        console.log("YO");
        console.log(this.props);

        if(prevState.item.id !== this.props.item.id){
            console.log(this.props.item.id)
            const itineraryRef = await firestoreDB.collection('itineraries').doc(this.props.item.id)

            itineraryRef.collection("actions").get().then(querySnapshot => {
                this.actions = [];
                querySnapshot.forEach(doc => {

                    let data = {...doc.data()};
                    data.id = doc.id;
                    
                    this.actions.push({...data});
                })
            })
        }
    }
            
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    

    render(){
        const {classes} = this.props; 

        

        if (!this.props.item) return <h5>Loading...</h5>

        return (
            <Card className={classes.card} >
              <CardHeader
                title="Featured Itinerary of the Month"
                subheader={`Posted on ${this.props.item && this.props.item.datePosted| ''}`}
              />
              <CardMedia
                className={classes.media}
                image={this.props.item.image ? this.props.item.image : hk}
              />
              <CardContent>
                
                <Typography variant="h4" component="h2">
                  {this.props.item && this.props.item.title}
                </Typography>
                <Typography variant="h6" component="h2">
                 <i> {this.props.item && this.props.item.location}</i>
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
                <IconButton aria-label="Share">
                    <ShareIcon />
                </IconButton>
                <Button size="small" onClick={this.handleExpandClick}>DISCOVER</Button>
                
               
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography><b>Itinerary:</b></Typography>
                        &nbsp;
                        
                        <List>

                        </List>
                        {this.actions.map((item,i) => {
                            
                            return(
                                <div>
                                    <ListItem button>
                                        <ListItemIcon>
                                            {
                                                item.category === "food"? <FastFoodIcon></FastFoodIcon> : ''
                                            }

                                            {
                                                item.category === "transport" ? <AirplaneIcon></AirplaneIcon> : ''
                                            }
                                        </ListItemIcon>
                                        <ListItemText 
                                            
                                            primary={
                                              <React.Fragment>
                                                  <Typography className={classes.title}>
                                                      {item.name}
                                                  </Typography>
                                              </React.Fragment>                                                
                                            } 
                                            secondary={
                                                <React.Fragment>
                                                    <Typography className={classes.comment}>{item.comment}</Typography>
                                                    <Typography className={classes.text}>${item.cost}</Typography>
                                                </React.Fragment>
                                            }/>
                                    </ListItem>
                                    <Divider />
                                &nbsp;
                                </div>
                            );
                        })}
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