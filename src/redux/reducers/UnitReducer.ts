import { getType } from "typesafe-actions";
import { Action } from "../actions/Actions";
import { MAP_SET } from "../actions/MapActions";
import { SessionState } from "../SessionState";


export const UnitReducer = (state: SessionState, action: Action) => {
    let newState = state;
    if(state == undefined){
        newState = new SessionState();    
    }
    switch(action.type){
        case "char/set":
            const actors = state.actors.map(a => a.id == action.payload.id ? action.payload : a);
            newState = new SessionState(state.map, actors, state.fieldState, state.hover, state.selection, state.rotation);
            break;
        case "char/replaceall":
            newState = new SessionState(state.map, action.payload, state.fieldState, state.hover, state.selection, state.rotation);
            break;
    }
    return newState;
}