import * as React from 'react';
import { Form } from 'react-bootstrap';

import { MAP_EDIT_SET_TYPE } from '../redux/actions/MapActions';
import store from '../redux/SessionStore';
import { ActorData, BlockContext, BlockType, TileData } from '../state/Definitions';

export const LeftPanel: React.FC<{ tileData: TileData | null, context: BlockContext, actors: ActorData[] }> = props => {
    const { tileData, context, actors } = props;
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
        </>
    );
}