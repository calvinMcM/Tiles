import * as React from 'react';
import { Image } from 'react-konva';
import { ActorMapping } from '../redux/SessionState';

import { TILE_HEIGHT, TileData } from '../state/Definitions';
import ImageManager from '../state/ImageManager';


export const ActorSprite: React.FC<{tileData: TileData, actors: ActorMapping}> = props => {
    if(props == null || props == undefined || !props.tileData || !props.tileData.a){
        return <React.Fragment></React.Fragment>
    }
    const {tileData, actors} = props;
    const actorstate = actors[tileData.a];
    if(!actorstate || !actorstate.actor){
        return <React.Fragment></React.Fragment>
    }
    const actor = actorstate.actor

    return (
        <Image
            key={`actor${tileData.u}_${tileData.v}_${tileData.h}`}
            image={ImageManager.get(actor.curr_sprite)}
            x={actor.spritesheetData.sprites[actor.curr_sprite].xOffset * actor.spritesheetData.sprites[actor.curr_sprite].xScale}
            y={-(tileData.h-1) * TILE_HEIGHT + actor.spritesheetData.sprites[actor.curr_sprite].yOffset * actor.spritesheetData.sprites[actor.curr_sprite].yScale}
            scaleX={actor.spritesheetData.sprites[actor.curr_sprite].xScale}
            scaleY={actor.spritesheetData.sprites[actor.curr_sprite].yScale}
        />
    );
}