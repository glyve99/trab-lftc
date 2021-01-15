import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AutoFin from './components/pages/AutoFin';
import Regex from './components/pages/Regex';
import Gramatica from './components/pages/Gramatica';
import Test from './components/pages/Test';
import Test2 from './components/pages/Test2';
import Test3 from './components/pages/Test3';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/autofin' component={AutoFin} />
        <Route path='/gramatica' component={Gramatica} />
        <Route path='/regex' component={Regex} />
        <Route path='/test' component={Test} />
        <Route path='/test2' component={Test2} />
        <Route path='/test3' component={Test3} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
