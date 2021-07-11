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
            newState = new SessionState(state.map, action.payload, state.rotation);
            break;
        case "map/rotation/set":
            newState = new SessionState(state.map, state.selection, action.payload);
            break;
    }
    return newState;
}