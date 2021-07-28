import { getType } from "typesafe-actions";
import { Action } from "../actions/Actions";
import { MAP_SET } from "../actions/MapActions";
import { SessionState } from "../SessionState";


export const MapReducer = (state: SessionState, action: Action) => {
    let newState = state;
    if(state == undefined){
        newState = new SessionState();    
    }
    switch(action.type){
        case "map/set":
            newState = new SessionState((action as any).payload);
            break;
        case "map/selection/set":
            newState = new SessionState(state.map, action.payload, state.rotation, state.actors);
            break;
        case "map/rotation/set":
            newState = new SessionState(state.map, state.selection, action.payload, state.actors);
            break;
        case "map/edit/type/set":
            state.map[action.payload.y][action.payload.x] = Object.assign({}, state.map[action.payload.y][action.payload.x], {t: action.payload.type});
            newState = new SessionState(state.map, state.selection, state.rotation, state.actors);
            break;
    }
    return newState;
}