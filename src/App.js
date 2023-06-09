import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import './App.css';
import View from './pages/View';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setExemplo, addPlayer, addPartida, addPontos } from './redux/action';


function App(props) {
     const dispatch = useDispatch();
   const  jogadores  = useSelector( state => state.jogador.lista);
   const  pontuacao  = useSelector( state => state.partida.pontuacao);
   
   

   
   
  const dispatchRound = (round) => { 

    const newPontuacao = [];
    
    jogadores.forEach((jogador,indexOfJogador) => {
      let indexOf = 0;
      
      round.forEach((name,index) => {
        if(name === jogador){
          indexOf = index;
          console.log('achei no if index=',index,name,jogador)
        }
      });
      newPontuacao[indexOfJogador] = pontuacao[indexOf];
      console.log('newPontuacao[indexofjogador]',newPontuacao[indexOfJogador])
      console.log('pontuacao[indexof]', pontuacao[indexOf])
      
    });
    
    console.log('Minha pontuação nova no app: ',newPontuacao)
    dispatch(addPontos(
      newPontuacao
    ));

    dispatch(addPartida(
      round,
    ));
    
    
    
  }

  useEffect(() => {
    //saveOnGitRepository()
  });

  return (
    <div className="App">
      <h1>Poker Counter App</h1>
      <Switch>
        <Route exact path="/poker-counter"  ><View dispachar={dispatchRound} /></Route>
        <Redirect to='/poker-counter' />
      </Switch>

    </div>
  );
}

export default App;
