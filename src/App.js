import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import './App.css';
import View from './pages/View';


function App() {
  return (
    <div className="App">
      Poker Counter App - hehe
      <Switch>
        <Route exact path="/poker-counter" component={View} ></Route>
        <Redirect to='/poker-counter' />
      </Switch>

    </div>
  );
}

export default App;
