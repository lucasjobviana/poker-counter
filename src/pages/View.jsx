import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setExemplo, addPlayer, addPartida } from '../redux/action';

class View extends Component {
    constructor() {
        super();
        this.state = {
            exemplo: 'Variável exemplo do state do componente View.',
            btnAddIsDisabled: true,
            selectedNames: [],
        }
    }

    handleChangeSelect = (target) => {
        alert('');
        console.log(target.target.name)
        console.log(target.target.value)
        this.setState({
            [target.target.name]: target.value,
            selectedNames: [...this.state.selectedNames, target.target.value]
        });
    }

    render() {
        const { exemplo, btnAddIsDisabled, selectedNames, selectPlayer1 } = this.state;
        console.log(selectedNames)
        const { dispatch, message, exemplo1, jogadores, partidas } = this.props;

        /*
        {
                        partidas.round.map((round, index) => (<tr>Partida {index}</tr>))
                    }
        */
        return (
            <div className='view'>
                <p>Exemplo:{exemplo}</p>
                <p>Exemplo1:{exemplo1}</p>
                <p>Message:{message}</p>

                {
                    jogadores.map((jogador) => (<div>{jogador}</div>))
                }

                <table>
                    <th>Partida</th>
                    {
                        jogadores.map((jogador, index) => (<th>{index + 1}° Lugar</th>))
                    }
                    {
                        partidas.rounds.map((round, index) => (
                            <tr>Partida {index + 1}
                                {

                                    Object.entries(round).filter((entry) => entry[0].includes('Lugar')).map((a) => (
                                        <td>{a[1]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    <tr>
                        <td>Proxima partida </td>
                        {
                            jogadores.map((jogador, index) => (
                                <td>
                                    <select value={selectPlayer1} name={`selectPlayer${index + 1}`} onChange={this.handleChangeSelect} >
                                        {
                                            jogadores.map((player, i) => {
                                                if (!selectedNames.includes(player)) {
                                                    return <option value={player} > {player} </option>
                                                }
                                            })
                                        }
                                    </select>
                                </td>
                            ))
                        }
                    </tr>
                    <button disabled={btnAddIsDisabled} onClick={() => {
                        dispatch(addPartida(
                            jogadores
                        ))
                    }}>
                        +
                    </button>

                </table>

                <button onClick={() => {
                    dispatch(addPartida(['jeh', 'job', 'victor', 'gih', 'criolo', 'pedra', 'anthena']))
                    dispatch(addPlayer('kkk'))
                }} >SetExemplo</button>





            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.exemplo.message,
    exemplo1: state.exemplo.exemplo1,
    jogadores: state.jogador.lista,
    partidas: state.partida,

});

export default connect(mapStateToProps)(View);