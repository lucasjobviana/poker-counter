import { combineReducers } from "redux";
import jogador from "./jogador.reducer";
import partida from "./partida.reducer";

const rootReducer = combineReducers({
    jogador,
    partida,
});

export default rootReducer;