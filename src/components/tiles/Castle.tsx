import * as React from 'react';
import { Image, Shape } from 'react-konva';

import { TILE_WIDTH, TILE_DEPTH, terrainMapping, TileData, TileProps, TILE_HEIGHT, BlockContext, BlockType } from '../../state/Definitions';
import ImageManager from '../../state/ImageManager';

export module Castle{
    export class SVG extends React.Component<TileData & {focused: boolean, onHover:(tile: TileData) => void, surroundings: BlockContext}>{
        render(){
            
            const {
                focused,
                onHover,
                surroundings,
                ...tileProps
            } = this.props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("Castle1");
            switch(tileProps.variant){
            // switch(tileProps.h % 2){
                case 0:
                    img = ImageManager.get("Castle2");
                    break;
                case 2:
                    img = ImageManager.get("Castle3");
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
                        image={
                            (() => {
                                switch((tileProps.h - i + tileProps.variant) % 3){
                                    case 1: return ImageManager.get("Castle_3_Side");
                                    case 2: return ImageManager.get("Castle_5_Side");
                                }
                                return ImageManager.get("Castle_4_Side");
                            })()
                        }
                        // scaleX={10}
                        // scaleY={10}
                        onHover={() => onHover(tileProps)}
                    />
                );
            }
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    // scaleX={10}
                    // scaleY={10}
                    onHover={() => onHover(tileProps)}
                />
            );
    
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
        // if(map.N == null || map.N.h != tileData.h || map.N.t !== BlockType.ROCK) {
        //     edging.push(<Castle.Edging.North {...tileData}/>);
        // }
        // if(map.S == null || map.S.h != tileData.h || map.S.t !== BlockType.ROCK) {
        //     edging.push(<Castle.Edging.South {...tileData}/>);
        // }
        // if(map.E == null || map.E.h != tileData.h || map.E.t !== BlockType.ROCK){
        //     edging.push(<Castle.Edging.East {...tileData}/>);
        // }
        // if(map.W == null || map.W.h != tileData.h || map.W.t !== BlockType.ROCK){
        //     edging.push(<Castle.Edging.West {...tileData}/>);
        // }
        if(map.E != null && map.E.h > tileData.h){
            edging.push(<Castle.Shadow.East {...tileData}/>);
        }
        return edging;
    }

    export module Edging{
        export const North: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("CastleEdge1N");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={10}
                    scaleY={10}
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
    
            let img = ImageManager.get("CastleEdge1S");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={10}
                    scaleY={10}
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
    
            let img = ImageManager.get("CastleEdge1E");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={10}
                    scaleY={10}
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
    
            let img = ImageManager.get("CastleEdge1W");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    scaleX={10}
                    scaleY={10}
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
                    scaleX={10}
                    scaleY={10}
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