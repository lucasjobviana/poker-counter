const INITIAL_STATE = {
    lista: ['Job', 'Jeh', 'Gih', 'Victor'],
    pontos: [0, 0, 0, 0],
}

const somarArrays = (arr1, arr2) => {
    const newArray = [];
    for (let i = 0; i < arr1.length; i += 1) {
        newArray[i] = arr1[i] + arr2[i];
    }
    return newArray;

}

const jogador = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_PLAYER': return { ...state, lista: [...state.lista, action.payLoad], pontos: [...state.pontos, 0] }
        case 'ADD_PONTOS'://payLoad: array com a pontuação do job,1,2,3,...
            const newArray = somarArrays(action.payLoad, state.pontos);
            console.log("Vou add esse array: ",action.payLoad)
            console.log("Meu array antigo que esta no state:",state.pontos)
            console.log("Novo array de pontos: ",newArray);
            return { ...state, pontos: newArray }
        default: return state;
    }
}

export default jogador;
