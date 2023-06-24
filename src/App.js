import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import { updateRounds } from './fetch/FireBase';
import { rmvAllPartidas } from './redux/action';
import View from './pages/View';
import './App.css';
 
const handleClickBtnReset = () => {
	const btnSalvar = document.querySelector('.btn-reset');
  btnSalvar.style.color = "green";
  setTimeout(() => {
    const btnSalvar = document.querySelector('.btn-reset');
  btnSalvar.style.color = "white";
  }, 1000);
	
	updateRounds([]);
}

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
  const  rounds = useSelector( state => state.partida.rounds);
  const dispatch = useDispatch();
 
  return (
    <div className="App">
    <div className="btn-menu ">
      <button className='btn-save' onClick={()=>{handleClickBtnSave(rounds)}}>SAVE</button> 
       <button className='btn-reset' onClick={()=>{handleClickBtnReset();dispatch(rmvAllPartidas());}}>RESET</button> 
       <button className='btn-reset' >THEME</button> 
       <button className='btn-reset' >OTHER</button> 
       </div>
      <h1>Poker Counter App</h1>
      <Switch>
        <Route exact path="/poker-counter"  ><View  /></Route>
        <Redirect to='/poker-counter' />
      </Switch>
    </div>
  );
}

export default App;
