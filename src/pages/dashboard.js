import React,{Component} from 'react';

// import Background from '../components/background';
import FeatureCard from '../components/featureCard';
import SubCard from '../components/subCard';

import firestoreDB from '../components/firestore.js';
import AddDialog from '../components/addDialog.js';

export default class Dashboard extends Component {

    state = {
        featureditem: null,
        itineraries:[]
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
        console.log(item.id);
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
        console.log("My Data")
        console.log(data);
        this.setState({featureditem:{...data}})
    }

    render(){
        return(
         <div>
          <div className='container'>
            <div className='row'>
              
            {this.state.featureditem !== null &&  <FeatureCard item={this.state.featureditem} ></FeatureCard>}          
                
            </div>
            <div className='row'>
                {
                    this.state.itineraries.map((item,i)=>{
                        return(
                            <div className='col-md-3' key={i}><SubCard onFeatureChange={this.handleFeatureChange} item={item} ></SubCard></div>
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


  