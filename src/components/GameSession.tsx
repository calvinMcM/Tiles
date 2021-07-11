import * as React from "react";
import { Unsubscribe } from "redux";
import { MAP_SET } from "../redux/actions/MapActions";
import { SessionState } from "../redux/SessionState";
import SessionStore from "../redux/SessionStore";
import { generateMap } from "../state/MapGenerator";
import { Map } from "./Map";


export class GameSession extends React.Component<{}, SessionState> {
    private unsubscribe: Unsubscribe|undefined = undefined;
    constructor(props: {}, context: any){
        super(props, context);
    }

    componentDidMount(){
        this.unsubscribe = SessionStore.subscribe(() => {
            this.setState(SessionStore.getState())
        });
        const initialState = SessionStore.getState();
        const a = MAP_SET(generateMap(initialState.rotation, initialState.actors));
        SessionStore.dispatch(a);
    }

    componentWillUnmount(){
        this.unsubscribe && this.unsubscribe();
    }

    render(){
        if(this.state == undefined){
            return <h2>Loading...</h2>
        }
        return(
            <Map
                data={this.state.map}
                rotation={this.state.rotation}
                selection={this.state.selection}
                actors={this.state.actors}
            />
        )
    }
}