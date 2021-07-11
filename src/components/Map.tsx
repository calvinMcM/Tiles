import * as React from 'react';
import { Circle, Layer, Stage } from 'react-konva';

import { MAP_ROT_SET, MAP_SEL_SET } from '../redux/actions/MapActions';
import { ActorMapping } from '../redux/SessionState';
import SessionStore from '../redux/SessionStore';
import { BlockContext, TILE_DEPTH, TileData } from '../state/Definitions';
import { Block } from './Block';
import { Conditional } from './Conditional';
import { TileDataPanel } from './TileDataPanel';

export const Map: React.FC<{data: TileData[][], rotation: number, selection: TileData|null, actors: ActorMapping}> = props => {
    const {data: mapData, rotation, selection, actors} = props;
    return(
        <Stage width={window.innerWidth * .8} height={window.innerHeight} scaleX={.8} scaleY={.8}>
            <Layer
                x={window.innerWidth/2}
                y={window.innerHeight/2 - mapData.length * TILE_DEPTH/3}
            >
                {
                    mapData.map((rank, ri) => {
                        return rank.map((space, fi) =>{
                            return(
                                <Block
                                    {...space}
                                    focused={TileData.equal(space, selection)}
                                    surroundings={BlockContext.fromMapContext(mapData, fi, ri)}
                                    onHover={(s) => SessionStore.dispatch(MAP_SEL_SET(s))}
                                    actors={actors}
                                />
                            )
                        })
                    })
                }
            </Layer>
            <Layer>
                <Circle
                    x={window.innerWidth * .2}
                    y={10}
                    radius={10}
                    fill="blue"
                    onClick={ev => SessionStore.dispatch(MAP_ROT_SET((rotation - 1) % 4))}
                />
                <Circle
                    x={window.innerWidth * .8}
                    y={10}
                    radius={10}
                    fill="red"
                    onClick={ev => SessionStore.dispatch(MAP_ROT_SET((rotation + 1) % 4))}
                />
                <Conditional condition={selection !== null}>
                    <TileDataPanel {...selection as TileData} context={BlockContext.fromMapContext(mapData, selection?.u || 0, selection?.v || 0)} actors={actors}/>
                </Conditional>
            </Layer>
        </Stage>
    )
}
