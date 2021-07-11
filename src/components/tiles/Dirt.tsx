import * as React from 'react';
import { Image, Shape } from 'react-konva';

import { TILE_WIDTH, TILE_DEPTH, terrainMapping, TileData, TileProps, TILE_HEIGHT, BlockContext, BlockType } from '../../state/Definitions';
import ImageManager from '../../state/ImageManager';

export module Dirt{
    export class SVG extends React.Component<TileData & {focused: boolean, onHover:(tile: TileData) => void, surroundings: BlockContext}>{
        render(){
            
            const {
                focused,
                onHover,
                surroundings,
                ...tileProps
            } = this.props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("Dirt1");
            switch(tileProps.variant){
                case 1:
                    img = ImageManager.get("Dirt2");
                    break;
                case 2:
                    img = ImageManager.get("Dirt3");
                    break;
            }
            
            const tiles = [];
            const lowNeighbor = Math.min(surroundings.E?.h || 0, surroundings.S?.h || 0);
            for(let i = lowNeighbor; i < tileProps.h; i++){
                tiles.push(
                    <Image
                    key={`tile_${tileProps.u}_${tileProps.v}_${i}`}
                        x={0}
                        y={-i * TILE_HEIGHT}
                        image={ImageManager.get("Cliffside_1")}
                        onHover={() => onHover(tileProps)}
                    />
                );
            }
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h - 1) * TILE_HEIGHT}
                    image={img}
                    onHover={() => onHover(tileProps)}
                />
            )
    
            return(
                <>
                    {tiles}
                </>
            )
    
            // return(
            //     <>
            //         <Dirt.Left h={tileProps.h}/>
            //         <Dirt.Right h={tileProps.h}/>
            //         <Dirt.Top h={tileProps.h} onHover={() => onHover(tileProps)}/>
            //     </>
            // )
        }
    }
    

    export function getEdging(tileData: TileData, map: BlockContext): JSX.Element[]{
        const edging: JSX.Element[] = [];
        if(map.N == null || map.N.h != tileData.h || map.N.t !== BlockType.DIRT) {
            edging.push(<Dirt.Edging.North {...tileData}/>);
        }
        if(map.S == null || map.S.h != tileData.h || map.S.t !== BlockType.DIRT) {
            edging.push(<Dirt.Edging.South {...tileData}/>);
        }
        if(map.E == null || map.E.h != tileData.h || map.E.t !== BlockType.DIRT){
            edging.push(<Dirt.Edging.East {...tileData}/>);
        }
        if(map.W == null || map.W.h != tileData.h || map.W.t !== BlockType.DIRT){
            edging.push(<Dirt.Edging.West {...tileData}/>);
        }
        if(map.E != null && map.E.h > tileData.h){
            edging.push(<Dirt.Shadow.East {...tileData}/>);
        }
        return edging;
    }

    export module Edging{
        export const North: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("DirtEdge1N");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={1}
                    scaleY={1}
                />
            );
    
            return(
                <>
                    {tiles}
                </>
            )

        }
        export const South: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("DirtEdge1S");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={1}
                    scaleY={1}
                />
            );
    
            return(
                <>
                    {tiles}
                </>
            )

        }
        export const East: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("DirtEdge1E");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={1}
                    scaleY={1}
                />
            );
    
            return(
                <>
                    {tiles}
                </>
            )

        }
        export const West: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("DirtEdge1W");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={1}
                    scaleY={1}
                />
            );
    
            return(
                <>
                    {tiles}
                </>
            )

        }
    }

    export module Shadow{
        export const East: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("Shadow_E");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_shadow_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={1}
                    scaleY={1}
                />
            );
    
            return(
                <>
                    {tiles}
                </>
            )

        }
    }
}