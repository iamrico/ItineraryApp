import React,{Component} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './../pages/dashboard';

export default class Routes extends Component{
    render(){
        return(
            <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="*" component={Dashboard} />
            </Switch>
            </Router>
        );
        
    }
}