const actionCreator = (name = 'null', payLoad = undefined, from='undefined') => ({
    type: name,
    from,
    payLoad,
});


export const SET_EXEMPLO = 'SET_EXEMPLO';
export const setExemplo = (payLoad) => actionCreator(SET_EXEMPLO, payLoad);

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = (payLoad) => actionCreator(ADD_PLAYER, payLoad);

export const ADD_PARTIDA = 'ADD_PARTIDA';
export const addPartida = (payLoad,from) => {console.log(payLoad);return actionCreator(ADD_PARTIDA, payLoad, from);};

export const ADD_PONTOS = 'ADD_PONTOS';
export const addPontos = (payLoad) => { console.log(payLoad); return actionCreator(ADD_PONTOS, payLoad);};
//payLoad, enviar array com pontuação na partida de jogador.lista[]
