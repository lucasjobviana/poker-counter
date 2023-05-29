const actionCreator = (name = 'null', payLoad = undefined) => ({
    type: name,
    payLoad,
});


export const SET_EXEMPLO = 'SET_EXEMPLO';
export const setExemplo = (payLoad) => actionCreator(SET_EXEMPLO, payLoad);

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = (payLoad) => actionCreator(ADD_PLAYER, payLoad);

export const ADD_PARTIDA = 'ADD_PARTIDA';
export const addPartida = (payLoad) => actionCreator(ADD_PARTIDA, payLoad);