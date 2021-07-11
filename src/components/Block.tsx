import * as React from 'react';
import { Group, Shape } from 'react-konva';

import { ActorMapping } from '../redux/SessionState';
import { BlockContext, BlockType, TILE_DEPTH, TILE_HEIGHT, TILE_WIDTH, TileData } from '../state/Definitions';
import { ActorSprite } from './ActorSprite';
import { Conditional } from './Conditional';
import { Castle } from './tiles/Castle';
import { Dirt } from './tiles/Dirt';
import { Grass } from './tiles/Grass';
import { Sand } from './tiles/Sand';
import { Stone } from './tiles/Stone';
import { Water } from './tiles/Water';

export const Block: React.FC<TileData & {focused: boolean, onHover: (t: TileData) => void, surroundings: BlockContext, actors: ActorMapping}> = props => {
    const {
        focused,
        onHover,
        surroundings,
        actors,
        ...tileData
    } = props;
    // console.log(props)
    let block = <></>;
    let edging: JSX.Element[] = [];
    switch(tileData.t){
        case BlockType.GRASS:
            block = <Grass.SVG {...props}/>
            edging = Grass.getEdging(tileData, props.surroundings);
            break;
        case BlockType.WATER:
            block = <Water.SVG {...props}/>
            edging = Water.getEdging(tileData, props.surroundings);
            break;
        case BlockType.SAND:
            block = <Sand.SVG {...props}/>
            edging = Sand.getEdging(tileData, props.surroundings);
            break;
        case BlockType.ROCK:
            block = <Stone.SVG {...props}/>
            edging = Stone.getEdging(tileData, props.surroundings);
            break;
        case BlockType.CASTLE:
            block = <Castle.SVG {...props}/>
            edging = Castle.getEdging(tileData, props.surroundings);
            break;
        default:
            block = <Dirt.SVG {...props}/>
            edging = Dirt.getEdging(tileData, props.surroundings);
            break;
    }
    let actor = <ActorSprite tileData={tileData} actors={props.actors}/>
    return (
        <Group
            x={props.x}
            y={props.y}
        >
            {block}
            <>
                {edging}
            </>
            <Conditional condition={focused}>
                {/* Hover Overlay */}
                <Shape
                    x={0}
                    y={TILE_HEIGHT * -Math.max(props.h-1, 0)}
                    sceneFunc={(ctx, shp) => {                    
                        ctx.beginPath();
                        ctx.moveTo(0.000000, TILE_DEPTH / 2);
                        ctx.lineTo(TILE_WIDTH / 2, 0);
                        ctx.lineTo(TILE_WIDTH, TILE_DEPTH / 2);
                        ctx.lineTo(TILE_WIDTH / 2, TILE_DEPTH);
                        ctx.closePath();
                        ctx.fillStrokeShape(shp);
                    }}
                    fill={"#42a1f588"}
                    // strokeWidth={3}
                    // stroke="42a1f588"
                    lineCap='butt'
                    lineJoin='bevel'
                    onClick={ev => console.log(props.u, props.v, props.h)}
                />
            </Conditional>
            {actor}
            <Shape
                // Mouseover Bounds
                x={0}
                y={TILE_HEIGHT * -Math.max(props.h-1, 0)}
                sceneFunc={(ctx, shp) => {                    
                    ctx.beginPath();
                    ctx.moveTo(0.000000, TILE_DEPTH / 2);
                    ctx.lineTo(TILE_WIDTH / 2, 0);
                    ctx.lineTo(TILE_WIDTH, TILE_DEPTH / 2);
                    ctx.lineTo(TILE_WIDTH / 2, TILE_DEPTH);
                    ctx.closePath();
                    ctx.fillStrokeShape(shp);
                }}
                onMouseEnter={() => props.onHover(props)}
            />
        </Group>
    )
}