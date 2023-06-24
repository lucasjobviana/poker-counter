import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { updateRounds } from './fetch/FireBase';
import View from './pages/View';
import './App.css';
 
const handleClickBtnSave = (rounds) => {
  const roundsMapToDatabasePattern = rounds.map((round)=> {
    return [round['1°Lugar'],round['2°Lugar'],round['3°Lugar'],round['4°Lugar']];
  });

  const btnSalvar = document.querySelector('.btn-save');
  btnSalvar.style.color = "green";
  setTimeout(() => {
    const btnSalvar = document.querySelector('.btn-save');
  btnSalvar.style.color = "white";
  }, 1000);

  updateRounds(roundsMapToDatabasePattern);
}

function App() {
  const  rounds = useSelector( state => state.partida.rounds) 

  
 
  return (
    <div className="App">
      <button className='btn-save' onClick={()=>{handleClickBtnSave(rounds)}}>SAVE</button> 
      <h1>Poker Counter App</h1>
      <Switch>
        <Route exact path="/poker-counter"  ><View  /></Route>
        <Redirect to='/poker-counter' />
      </Switch>
    </div>
  );
}

export default App;
