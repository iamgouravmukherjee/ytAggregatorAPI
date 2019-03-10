import React, { Component } from 'react';
import './App.css';

import Home from './containers/Home';
import Channel from './containers/Channel';

import { Switch, Route } from 'react-router-dom';

class App extends Component {
   render() {
      return(
      <Switch>
         <Route exact path ="/" component={Home} ></Route>
         <Route exact path="/channel/:id" component={Channel}></Route>
      </Switch>
      );
   }
}

export default App;
