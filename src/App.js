import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AutoFin from './components/pages/AutoFin';
import Regex from './components/pages/Regex';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/autofin' component={AutoFin} />
        <Route path='/regex' component={Regex} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
