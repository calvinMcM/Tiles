import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Unsubscribe } from 'redux';
import { FIELD_REPLACE, FIELD_SET } from '../redux/actions/FieldActions';

import { MAP_SET } from '../redux/actions/MapActions';
import { CHAR_REPLACE, CHAR_SET } from '../redux/actions/UnitActions';
import { ActorsState, SessionState } from '../redux/SessionState';
import SessionStore from '../redux/SessionStore';
import { ActorData, BlockContext } from '../state/Definitions';
import { generateMap } from '../state/MapGenerator';
import { LeftPanel } from './LeftPanel';
import { PGame } from './PGame';


export class GameSession extends React.Component<{ sid: string }, SessionState> {
    private unsubscribe: Unsubscribe | undefined = undefined;
    constructor(props: { sid: string }, context: any) {
        super(props, context);
    }

    async componentDidMount() {
        this.unsubscribe = SessionStore.subscribe(() => {
            this.setState(SessionStore.getState())
        });
        const initialState = SessionStore.getState();
        const sessionData = await generateMap(this.props.sid, initialState.rotation);
        const a = MAP_SET(sessionData.map);
        SessionStore.dispatch(a);
        SessionStore.dispatch(CHAR_REPLACE(sessionData.units));
        SessionStore.dispatch(FIELD_REPLACE(sessionData.fieldState));
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    render() {
        if (this.state == undefined) {
            return <h2>Loading...</h2>
        }
        return (
            <Container fluid>
                <Row>
                    <Col sm={12} md={9}>
                        {/* <Map
                            data={this.state.map}
                            rotation={this.state.rotation}
                            selection={this.state.selection}
                            actors={this.state.actors}
                        /> */}
                        <PGame />
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