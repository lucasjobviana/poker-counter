const actionCreator = (name = 'null', payLoad = undefined) => ({
    type: name,
    payLoad,
});
export const SET_EXEMPLO = 'SET_EXEMPLO';

export const setExemplo = (payLoad) => actionCreator(SET_EXEMPLO, payLoad)