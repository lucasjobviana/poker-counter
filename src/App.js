import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

import './App.css';
import View from './pages/View';


function App() {
  return (
    <div className="App">
      Poker Counter App
      <Switch>
        <Route exact path="/" component={View} ></Route>
      </Switch>

    </div>
  );
}

export default App;
