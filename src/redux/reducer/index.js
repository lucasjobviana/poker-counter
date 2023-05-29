import { combineReducers } from "redux";
import exemplo from "./exemplo.reducer";
import jogador from "./jogador.reducer";
import partida from "./partida.reducer";

const rootReducer = combineReducers({
    exemplo,
    jogador,
    partida,
});

export default rootReducer;