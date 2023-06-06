import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setExemplo, addPlayer, addPartida, addPontos } from '../redux/action';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exemplo: 'Variável exemplo do state do componente View.',
            btnAddIsDisabled: true,
            selectedNames: [],
            btnEnabledColor: 'red'
        }
    }

    handleChangeSelect = (target, index) => {

        console.log(target.target.name)
        console.log(target.target.value)
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
        const { jogadores, dispatch, pontuacao } = this.props;
        const { selectedNames } = this.state;
        const newPontuacao = [];
        let myArray = [];
        console.log(selectedNames)
        console.log(jogadores)
        jogadores.forEach((j, index) => {
            myArray.push('-');

            let indexOf = 0;

            selectedNames.forEach((name, index) => {
                if (name === j) {
                    indexOf = index;
                }
            })

            newPontuacao[index] = pontuacao[indexOf];
        });
        console.log(newPontuacao)

        dispatch(addPontos(
            newPontuacao
        ));

        dispatch(addPartida(
            selectedNames,
        ));

        this.setState({
            selectedNames: myArray
        })
    }

    componentDidMount() {
        const { jogadores,pontuacao } = this.props;
        let myArray = [];
        jogadores.forEach(() => {
            myArray.push('-');
        });

        

        if(localStorage.getItem('pokerRounds') !==null && localStorage.getItem('pokerRounds').length > 0){
            const { dispatch, jogadores } = this.props;    
            console.log(localStorage.getItem('pokerRounds'))
            const rounds = JSON.parse(localStorage.getItem('pokerRounds'));
            console.log(rounds);
            console.log(jogadores)
            const newPontuacao = [];
            const myArray = ['-','-','-','-'];
            
            rounds.forEach((round,indexOfRound)=>{
            	jogadores.forEach((player,indexOfPlayer)=>{
            		let indexOf = 0;
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
            		rounds[indexOfRound],'localStorage'
        	));
            });
            
        }
        else{
            localStorage.setItem('pokerRounds','[]')
        }

        this.setState({
            selectedNames: myArray
        })
    }

    render() {
        const { exemplo, btnAddIsDisabled, selectedNames, selectPlayer1, btnEnabledColor } = this.state;
        const { dispatch, message, exemplo1, jogadores, partidas, pontuacao, pontucaoJogadores } = this.props;
        const jogadoresOptions = ['-', ...jogadores];
        console.log(localStorage.getItem('pokerRounds'));
        console.log(partidas)

        
 
        
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
                btnAddIsDisabled: true,//eh true
            });

        }

        const jogadoresPontuacao = pontucaoJogadores.map((pontuacao, index) => {
            const newObject = {};
            newObject['pontuacao'] = pontuacao;
            newObject['player'] = jogadores[index];
            return newObject;
        })
        console.log(jogadoresPontuacao)
        const jogadoresOrdenados = jogadoresPontuacao.sort((b, a) => a['pontuacao'] - b['pontuacao']);
        console.log(jogadoresOrdenados);




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
                                                } else {
                                                    //return <option value='-' >-</option>
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

                {/* <button onClick={() => {
                    dispatch(addPartida(['jeh', 'job', 'victor', 'gih', 'criolo', 'pedra', 'anthena']))
                    dispatch(addPlayer('kkk'))
                }} >SetExemplo</button> */}





            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.exemplo.message,
    exemplo1: state.exemplo.exemplo1,
    jogadores: state.jogador.lista,
    pontucaoJogadores: state.jogador.pontos,
    partidas: state.partida,
    pontuacao: state.partida.pontuacao,

});

export default connect(mapStateToProps)(View);
