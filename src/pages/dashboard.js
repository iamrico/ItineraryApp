import React,{Component} from 'react';
import styled from 'styled-components'
// import Background from '../components/background';
import FeatureCard from '../components/featureCard';
import SubCard from '../components/subCard';
import add from '../images/add (1).svg';
import firestoreDB from '../components/firestore.js';


export default class Dashboard extends Component {

    state = {
        featureditem: null,
        itineraries:[]
    }


    componentDidMount() {
        firestoreDB.collection("itineraries").get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                console.log(doc.data())
                if(doc.data().isFeaturedItem){
                    console.log('in here')
                    this.populateFeaturedItem(doc.id,doc.data());
                }else{
                    this.populateItineraries(doc.id,doc.data());
                }
            });
        });
    }

    componentDidUpdate(_, prevState) {
        
            console.log(this.state)
    }

    populateItineraries = (id,data) =>{
        let item = {};

        item.id = id;
        item = {...data};
        item.date = data.date.toDate().toString();
        console.log([...this.state.itineraries,item]);
        this.setState({itineraries:[...this.state.itineraries,item]});
    }

    populateFeaturedItem = async (id,data) => {
        const newFeaturedItem = {
            ...data,
            id,
            date: data.date.toDate()
        }

        await this.setState({featureditem:{...newFeaturedItem}});
        console.log('a ->', this.state.featureditem);
    }

    
    
    
    render(){
        return(
         <div>
          <div className='container'>
            <div className='row'>
              
            {this.state.featuredItem !== null &&  <FeatureCard item={this.state.featureditem}></FeatureCard>}          
                
            </div>
            <div className='row'>
                {
                    this.state.itineraries.map((item,i)=>{
                        return(
                            <div className='col-md-3' key={i}><SubCard item={item} ></SubCard></div>
                        );
                    })
                }
            </div>
          </div>
          <IconBar>
            <Icon src = {add}></Icon> 
          </IconBar>
         </div>
            
        );
    }

    
}

const IconBar = styled.div`
    position: fixed;
    top: 80%;
    left:90%;
    -webkit-transform: translateY(-10%);
    -ms-transform: translateY(-10%);
    transform: translateY(-10%);
`

const Icon = styled.img`
    width:100px;
    height:100px;
    display: block;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
    cursor: pointer;
`

  