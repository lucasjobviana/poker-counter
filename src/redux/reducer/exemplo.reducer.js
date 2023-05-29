const INITIAL_STATE = {
    id: 0,
    message: 'Variável message do initial_state do exmplo.reducer',
}

const exemplo = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_EXEMPLO': return { ...state, exemplo1: action.payLoad }
        default: return state;
    }
}

export default exemplo;