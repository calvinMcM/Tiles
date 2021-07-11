import * as React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ActorMapping } from '../redux/SessionState';
import { TILE_WIDTH, TILE_DEPTH, TileData, BlockContext } from '../state/Definitions';
import { Block } from './Block';

export const TileDataPanel = (props: TileData & {context: BlockContext, actors: ActorMapping}) => {
    if(props === null){
        return <React.Fragment/>
    }
    return(
        <Group>
            <Rect
                width={innerWidth * .1}
                height={innerHeight * .3}
                fill={"#00000088"}
            />
            <Group
                x={3}
                y={3}
            >
                <Text text={`X: ${props.u}, Y: ${props.v}, H: ${props.h}`} fill="white"/>
                <Text
                    x={0}
                    y={12}
                    text={`Type: ${props.t}`}
                    fill="white"
                />
            </Group>
            <Block
                {...props}
                focused={false}
                onHover={()=>{}}
                surroundings={BlockContext.isolated(props)}
                x={3}
                y={70}
                h={1}
                actors={props.actors}
            />
            <Group
                x={3}
                y={153}
            >
                <Text text={`N X: ${props.context.N?.u}, Y: ${props.context.N?.v}, H: ${props.context.N?.h}, T: ${props.context.N?.t}`} fill="white"/>
                <Text y={12} text={`E X: ${props.context.E?.u}, Y: ${props.context.E?.v}, H: ${props.context.E?.h}, T: ${props.context.E?.t}`} fill="white"/>
                <Text y={24} text={`S X: ${props.context.S?.u}, Y: ${props.context.S?.v}, H: ${props.context.S?.h}, T: ${props.context.S?.t}`} fill="white"/>
                <Text y={36} text={`W X: ${props.context.W?.u}, Y: ${props.context.W?.v}, H: ${props.context.W?.h}, T: ${props.context.W?.t}`} fill="white"/>
            </Group>
        </Group>
    )
}