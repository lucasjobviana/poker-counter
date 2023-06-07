import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import './App.css';
import View from './pages/View';
import { useEffect } from 'react';


function App() {

  return (
    <div className="App">
      <h1>Poker Counter App</h1>
      <Switch>
        <Route exact path="/poker-counter" component={View} ></Route>
        <Redirect to='/poker-counter' />
      </Switch>

    </div>
  );
}

export default App;
