const actionCreator = (name = 'null', payLoad = undefined, from='undefined') => ({
    type: name,
    from,
    payLoad,
});

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = (payLoad) => actionCreator(ADD_PLAYER, payLoad);

export const ADD_PARTIDA = 'ADD_PARTIDA';
export const addPartida = (payLoad,from) => { return actionCreator(ADD_PARTIDA, payLoad, from);};

export const ADD_PONTOS = 'ADD_PONTOS';
export const addPontos = (payLoad) => {   return actionCreator(ADD_PONTOS, payLoad);};

export const RMV_ALL_PARTIDAS = 'RMV_ALL_PARTIDAS';
export const rmvAllPartidas = (payLoad,from) => { return actionCreator(RMV_ALL_PARTIDAS, payLoad, from);};