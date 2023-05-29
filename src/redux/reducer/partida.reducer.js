const INITIAL_STATE = {
    id: 0,
    rounds: [],
}

const partida = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_PARTIDA': {
            let myArray = {};

            action.payLoad.forEach((jogador, index) => {
                myArray[(index + 1) + '°Lugar'] = action.payLoad[index]
            });

            return {
                ...state,
                id: state.id + 1,
                rounds: [
                    ...state.rounds,
                    {
                        data: 'agora',
                        id: state.id,
                        ...myArray,

                    }
                ],
            }
        }
        default: return state;
    }
}

export default partida;