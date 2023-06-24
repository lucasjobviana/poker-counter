import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPartida, addPontos } from '../redux/action';
import { getRounds } from '../fetch/FireBase';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnAddIsDisabled: true,
            selectedNames: [],
        }
    }

    myFetch = async () => {
        const rounds = await getRounds();
        const { jogadores, pontuacao, dispatch } = this.props;  
        const newPontuacao = [];

        rounds.forEach((round,indexOfRound)=>{
            jogadores.forEach((player,indexOfPlayer)=>{
                round.forEach((playerOrderByPositionOnRound,indexOfPositionOnRound) => {
                    if(playerOrderByPositionOnRound === player){
                        newPontuacao[indexOfPlayer] = pontuacao[indexOfPositionOnRound];
                    }	
                });          		    	
            });
            
            dispatch(addPontos(
                newPontuacao
            )); 
            
            dispatch(addPartida(
                rounds[indexOfRound],
            ));
        });

        this.setState({
            selectedNames: jogadores.map( jogador => '-'),
        })
    }

    dispatchRound = (round) => { 
        const newPontuacao = [];
        const {jogadores,pontuacao,dispatch} = this.props;
        
        jogadores.forEach((jogador,indexOfJogador) => {
            let indexOf = 0;
            
            round.forEach((name,index) => {
                if(name === jogador){
                    indexOf = index;
                }
            });
            newPontuacao[indexOfJogador] = pontuacao[indexOf];
        });
        
        dispatch(addPontos(
            newPontuacao
        ));
    
        dispatch(addPartida(
            round,
        ));
    }
   
    handleChangeSelect = (target, index) => {
        if (target.target.value !== '-') {
            const copia = this.state.selectedNames;
            copia[index] = target.target.value;
           
            this.setState({
                [target.target.name]: target.target.value,
                selectedNames: copia
            });
        } else {
            const copia = [...this.state.selectedNames];
            copia[index] = '-';
            this.setState({
                selectedNames: copia
            })
        }
    }

    handleClickAdd = () => {  
    		
    		
    		document.body.style.setProperty('--global-color','green');
    		
    		setTimeout(() => {
    			document.body.style.setProperty('--global-color','red');
    		},1000);
    		
        const { selectedNames } = this.state; 
        const { jogadores } = this.props;

        this.dispatchRound(selectedNames); 
        this.setState({
            selectedNames: jogadores.map( jogador => '-'),
        })
    }

    componentDidMount() { //localStorage.setItem('pokerRounds','[]')
        this.myFetch();
    }

    render() {
        const { btnAddIsDisabled, selectedNames  } = this.state;
        const {   jogadores, partidas,  pontucaoJogadores } = this.props;
        const jogadoresOptions = ['-', ...jogadores];
        let count = 0;

        if (!btnAddIsDisabled && selectedNames.length !== 0) {
            document.getElementsByClassName('btn-add')[0].classList.add('enabled');
        } else if (btnAddIsDisabled && selectedNames.length !== 0) {
            document.getElementsByClassName('btn-add')[0].classList.remove('enabled');
        }

        selectedNames.forEach((s) => {
            if (s !== '-') {
                count += 1;
            }
        })

        if (count === selectedNames.length && btnAddIsDisabled && selectedNames.length !== 0) {
            this.setState({
                btnAddIsDisabled: false,
            })
        }

        if (count !== selectedNames.length && !btnAddIsDisabled) {
            this.setState({
                btnAddIsDisabled: true,
            });
        }

        const jogadoresPontuacao = pontucaoJogadores.map((pontuacao, index) => {
            const newObject = {};
            newObject['pontuacao'] = pontuacao;
            newObject['player'] = jogadores[index];
            return newObject;
        });
 
        const jogadoresOrdenados = jogadoresPontuacao.sort((b, a) => a['pontuacao'] - b['pontuacao']);
 
        return (
            <div className='view'>
                <div className='jogadores-ordenados'>
                    {
                        jogadoresOrdenados.map((jogador, index) => (<div>{jogador['player']}:{jogador['pontuacao']}</div>))
                    }
                </div>

                <table>
                    <tr>
                        <th>Partida</th>
                        {
                            jogadores.map((jogador, index) => (<th key={`th${index}`}>{index + 1}° Lugar</th>))
                        }
                    </tr>
                    {
                        partidas.rounds.map((round, index) => (
                            <tr key={`partida${index}`} ><td>P{index + 1}</td>
                            {
                                Object.entries(round).filter((entry) => entry[0].includes('Lugar')).map((a) => (
                                    <td key={`td-${a}${index}`}>{a[1]}</td>
                                ))
                            }
                            </tr>
                        ))
                    }
                    <tr>
                        <td>Atual</td>
                        {
                            jogadores.map((jogador, index) => (
                                <td key={`td${jogador}${index}`}>
                                    <select key={`select${jogador}${index}`} name={`selectPlayer${index + 1}`} onChange={
                                        (target) => { this.handleChangeSelect(target, index) }
                                    } >
                                    {
                                        jogadoresOptions.map((player, i) => {
                                            if (!selectedNames.includes(player)) {
                                                return <option key={`option${index}${player}`} value={player} > {player} </option>
                                            } else if (selectedNames[index] === player) {
                                                return <option key={`option${index}${player}`} value={selectedNames[index]} selected > {selectedNames[index]} </option>
                                            }
                                        })
                                    }
                                    </select>
                                </td>
                            )) 
                        }
                    </tr>
                    <button className='btn-add' disabled={btnAddIsDisabled} onClick={this.handleClickAdd} style={{ color: 'black' }}  >
                        +
                    </button>
                </table>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    jogadores: state.jogador.lista,
    pontucaoJogadores: state.jogador.pontos,
    partidas: state.partida,
    pontuacao: state.partida.pontuacao,
});

export default connect(mapStateToProps)(View);
