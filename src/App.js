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
   
   
   const saveOnGitRepository = () => {
   
    const token = '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';
    const owner = 'lucasjobviana';
    const repo = 'poker-counter';
    const path = 'data.json';
    const headers = new Headers();
    const newContent = {myString: 'hehehe'};
    
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    
    
    
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, { headers })
      .then(response =>  response.json())
      .then(data => {
      
        const requestOptions = {
          method: 'DELETE',
          headers: headers,
          body: JSON.stringify({
            message: 'Excluir arquivo JSON',
            sha: data.sha,
          })
        }
        //`https://api.github.com/repos/${owner}/${repo}/contents/${path}
        return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,requestOptions);
    })
      .catch(error =>{console.log('deuruimmmmmm');})
      .finally(()=>{
        const requestOptions = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
            message: 'Criar novo arquivo JSON',
            content: btoa(JSON.stringify(newContent)),
          })
        }
      })
      //excluiu o arquivo
      
        
        //console.log(data)
       // const { jogadores,pontuacao,dispatch } = this.props;
      
        //const rounds = data.partidas;
        //console.log(rounds);
        //console.log(jogadores)
        //const newPontuacao = [];
   
   
   };
   
   
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
    saveOnGitRepository()
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
