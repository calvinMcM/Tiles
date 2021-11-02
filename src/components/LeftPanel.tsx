import * as React from 'react';
import { Form } from 'react-bootstrap';

import { MAP_EDIT_SET_TYPE } from '../redux/actions/MapActions';
import { SessionState } from '../redux/SessionState';
import store from '../redux/SessionStore';
import { ActorData, BlockContext, BlockType, TileData } from '../state/Definitions';
import { UnitPanel } from './hud/UnitPanel';

export const LeftPanel: React.FC<{ tileData: TileData | null, context: BlockContext, state: SessionState }> = props => {
    const { tileData, context, state } = props;
    if (!tileData) {
        return (
            <>
                <h3>Side Panel</h3>
            </>
        );
    }
    return (
        <>
            <h3>Side Panel</h3>
            {tileData.u}, {tileData.v}
            <Form.Control
                as="select"
                value={tileData.t}
                onChange={ev => {
                    store.dispatch(MAP_EDIT_SET_TYPE(tileData.u, tileData.v, ev.target.value as BlockType))
                }}
            >
                {
                    BlockType.List
                        .map(t => {
                            return (
                                <option value={t}>{t.toUpperCase()}</option>
                            )
                        })
                }
            </Form.Control>
            {
                props.state.actors
                    .filter(actor => {
                        const actorAt = props.state.fieldState.find(t => t.x === props?.tileData?.u && t.y === props?.tileData?.v)
                        return actorAt?.id === actor.id;
                    })
                    .map(actor => {
                        return (
                            <UnitPanel unit={actor} />
                        );
                    })
            }
        </>
    );
}