import React,{Component} from 'react';

// import Background from '../components/background';
import FeatureCard from '../components/featureCard';
import SubCard from '../components/subCard';

import firestoreDB from '../components/firestore.js';
import AddDialog from '../components/addDialog.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });


 class Dashboard extends Component {

    state = {
        featureditem: null,
        itineraries:[],
        isExpanded:true
    }


    componentDidMount() {
        
        firestoreDB.collection("itineraries").get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(doc.data().isFeaturedItem){
                    this.populateFeaturedItem(doc.id,doc.data());
                }else{
                    console.log(doc.id);
                    this.populateItineraries(doc.id,doc.data());
                }
            });
        });
    }


    populateItineraries = (id,data) =>{
        let item = {};

        
        item = {...data,id};
       
        item.datePosted = data.datePosted.toDate().toString();
        this.setState({itineraries:[...this.state.itineraries,item]});
    }

    populateFeaturedItem = async (id,data) => {
        const newFeaturedItem = {
            ...data,
            id,
            datePosted: data.date.toDate()
        }

        await this.setState({featureditem:{...newFeaturedItem}});
    }

    
    handleFeatureChange = (data) =>{
        this.setState({featureditem:{...data}})
    }

    handleExpandedChange = async (data)=>{

        await this.setState({isExpanded:false})
    }
    
    render(){
        const { classes } = this.props;

        if(!this.state.featureditem){
            return <CircularProgress className={classes.progress} />
        }

        return(
         <div>
          <div className='container'>
            <div className='row'>
              
            {this.state.featureditem !== null &&  <FeatureCard 
                item={this.state.featureditem} 
                isExpanded={this.state.isExpanded} 
                toggleExpanded={() => this.setState(prevState => ({isExpanded: !prevState.isExpanded}))}></FeatureCard>}          
                
            </div>
            <div className='row'>
                {
                    this.state.itineraries.map((item,i)=>{
                        return(
                            <div className='col-md-3' key={i}><SubCard onFeatureChange={this.handleFeatureChange} isExpanded= {this.state.isExpanded} onExpandedChange={this.handleExpandedChange} item={item} ></SubCard></div>
                        );
                    })
                }
            </div>
          </div>
          <AddDialog></AddDialog>
         </div>
            
        );
    }

   
    
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Dashboard);