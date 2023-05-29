const INITIAL_STATE = {
    lista: ['Job', 'Jeh', 'Gih', 'Victor'],
}

const jogador = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_PLAYER': return { ...state, lista: [...state.lista, action.payLoad] }
        default: return state;
    }
}

export default jogador;