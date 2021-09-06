import { getType } from "typesafe-actions";
import { Action } from "../actions/Actions";
import { MAP_SET } from "../actions/MapActions";
import { SessionState } from "../SessionState";


export const FieldReducer = (state: SessionState, action: Action) => {
    let newState = state;
    if(state == undefined){
        newState = new SessionState();    
    }
    switch(action.type){
        case "field/set":
            newState = new SessionState(state.map, state.actors, state.fieldState.concat([action.payload]), state.hover, state.selection, state.rotation);
            break;
        case "field/replaceall":
            newState = new SessionState(state.map, state.actors, action.payload, state.hover, state.selection, state.rotation);
            break;
    }
    return newState;
}