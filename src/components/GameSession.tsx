import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Unsubscribe } from 'redux';

import { MAP_SET } from '../redux/actions/MapActions';
import { CHAR_SET } from '../redux/actions/UnitActions';
import { ActorsState, SessionState } from '../redux/SessionState';
import SessionStore from '../redux/SessionStore';
import { BlockContext, Actor, Fighter, ActorStats } from '../state/Definitions';
import { generateMap } from '../state/MapGenerator';
import { Dude } from '../state/Obstacles/Dude';
import { LeftPanel } from './LeftPanel';
import { Map } from './Map';
import { PGame } from './PGame';


export class GameSession extends React.Component<{sid: string}, SessionState> {
    private unsubscribe: Unsubscribe|undefined = undefined;
    constructor(props: {sid: string}, context: any){
        super(props, context);
    }

    async componentDidMount(){
        this.unsubscribe = SessionStore.subscribe(() => {
            this.setState(SessionStore.getState())
        });
        const initialState = SessionStore.getState();
        const sessionData = await generateMap(this.props.sid, initialState.rotation, initialState.actors);
        const a = MAP_SET(sessionData.map);
        SessionStore.dispatch(a);
        const teams = sessionData.teams;
        Object.values(teams).forEach(team => {
            const {units, positions} = team;
            Object.keys(units).forEach((unitId: string) => {
                const unit = units[unitId];
                const position = positions[unitId];
                const actorState = new ActorsState(
                    unitId,
                    new Dude(),
                    position
                );
                SessionStore.dispatch(CHAR_SET(actorState));
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe && this.unsubscribe();
    }

    render(){
        if(this.state == undefined){
            return <h2>Loading...</h2>
        }
        return(
            <Container fluid>
                <Row>
                    <Col sm={12} md={9}>
                        {/* <Map
                            data={this.state.map}
                            rotation={this.state.rotation}
                            selection={this.state.selection}
                            actors={this.state.actors}
                        /> */}
                        <PGame/>
                    </Col>
                    <Col sm={12} md={3} className={"html-panel"}>
                        <LeftPanel
                            tileData={this.state.selection}
                            context={BlockContext.fromMapContext(this.state.map, this.state.selection?.u || 0, this.state.selection?.v || 0)}
                            actors={this.state.actors}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}