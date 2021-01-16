import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Regex from './components/pages/Regex';
import Gramatica from './components/pages/Gramatica';
import AutoFin from './components/pages/AutoFin';

function App() {
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/gramatica' component={Gramatica} />
        <Route path='/regex' component={Regex} />
        <Route path='/autofin' component={AutoFin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
