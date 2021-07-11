import * as React from 'react';
import { Image, Shape } from 'react-konva';

import { TILE_WIDTH, TILE_DEPTH, terrainMapping, TileData, TileProps, TILE_HEIGHT, BlockContext, BlockType } from '../../state/Definitions';
import ImageManager from '../../state/ImageManager';

export module Stone{
    export class SVG extends React.Component<TileData & {focused: boolean, onHover:(tile: TileData) => void, surroundings: BlockContext}>{
        render(){
            
            const {
                focused,
                onHover,
                surroundings,
                ...tileProps
            } = this.props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("Stone1");
            // switch(tileProps.variant){
            //     case 1:
            //         img = ImageManager.get("Dirt2");
            //         break;
            //     case 2:
            //         img = ImageManager.get("Dirt3");
            //         break;
            // }
            
            const tiles = [];
            const lowNeighbor = Math.min(surroundings.E?.h || 0, surroundings.S?.h || 0);
            for(let i = lowNeighbor; i < tileProps.h; i++){
                tiles.push(
                    <Image
                    key={`tile_${tileProps.u}_${tileProps.v}_${i}`}
                        x={0}
                        y={-i * TILE_HEIGHT}
                        image={ImageManager.get("Cliffside_1_Stone")}
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
                    y={-(tileProps.h - 1) * TILE_HEIGHT}
                    image={img}
                    // scaleX={10}
                    // scaleY={10}
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
        // if(map.N == null || map.N.h != tileData.h || map.N.t !== BlockType.ROCK) {
        //     edging.push(<Stone.Edging.North {...tileData}/>);
        // }
        if(map.S == null || map.S.h != tileData.h || map.S.t !== BlockType.ROCK) {
            edging.push(<Stone.Edging.South {...tileData}/>);
        }
        if(map.E == null || map.E.h != tileData.h || map.E.t !== BlockType.ROCK){
            edging.push(<Stone.Edging.East {...tileData}/>);
        }
        // if(map.W == null || map.W.h != tileData.h || map.W.t !== BlockType.ROCK){
        //     edging.push(<Stone.Edging.West {...tileData}/>);
        // }
        if(map.E != null && map.E.h > tileData.h){
            edging.push(<Stone.Shadow.East {...tileData}/>);
        }
        return edging;
    }

    export module Edging{
        export const North: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("StoneEdge1N");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    // scaleX={10}
                    // scaleY={10}
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
    
            let img = ImageManager.get("StoneEdge1S");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    // scaleX={10}
                    // scaleY={10}
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
    
            let img = ImageManager.get("StoneEdge1E");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    // scaleX={10}
                    // scaleY={10}
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
    
            let img = ImageManager.get("StoneEdge1W");
            const tiles = [];
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
                    x={0}
                    y={-(tileProps.h-1) * TILE_HEIGHT}
                    image={img}
                    // scaleX={10}
                    // scaleY={10}
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

    // export function getEdging(tileData: TileData, map: BlockContext): JSX.Element[]{
    //     const edging: JSX.Element[] = [];
    //     if(
    //         map.E == null || map.E.h < tileData.h || map.E.t !== BlockType.DIRT
    //         || map.S == null || map.S.h < tileData.h || map.S.t !== BlockType.DIRT
    //     ) {
    //         edging.push(
    //             <Dirt.Edging {...tileData}/>
    //         );
    //     }
    //     return edging;
    // }

    // export const Edging: React.FC<TileData> = props => {

    //     const {
    //         ...tileProps
    //     } = props;
    //     TileData.from(tileProps)

    //     let img = ImageManager.get("StoneEdge1");
    //     switch(tileProps.variant){
    //         case 1:
    //             img = ImageManager.get("StoneEdge2");
    //             break;
    //         case 2:
    //             img = ImageManager.get("StoneEdge1");
    //             break;
    //     }

    //     const tiles = [];
    //     tiles.push(
    //         <Image
    //             key={`surface_${tileProps.u}_${tileProps.v}_${tileProps.h}`}
    //             x={0}
    //             y={-(tileProps.h-1) * TILE_HEIGHT}
    //             image={img}
    //             scaleX={10}
    //             scaleY={10}
    //         />
    //     );

    //     return(
    //         <>
    //             {tiles}
    //         </>
    //     )
    // }

    export const Left: React.FC<TileProps> = props => {
        return (
            <Shape
                sceneFunc={(ctx, shp) => {
                    ctx.beginPath();
                    ctx.moveTo(0.000000, TILE_DEPTH / 2);
                    ctx.lineTo(0.000000, TILE_DEPTH / 2 + TILE_HEIGHT);
                    ctx.lineTo(TILE_WIDTH / 2, TILE_DEPTH + TILE_HEIGHT);
                    ctx.lineTo(TILE_WIDTH / 2, TILE_DEPTH);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStrokeShape(shp);
                }}
                x={0}
                y={TILE_DEPTH*(1-props.h)}
                strokeWidth={1}
                scaleX={TILE_WIDTH}
                scaleY={TILE_DEPTH}
                fill="rgb(149, 110, 53)"
                stroke="rgb(149, 110, 53)"
                lineCap='butt'
                lineJoin='bevel'
            />
        );
    }

    export const Right: React.FC<TileProps> = props => {
        return (
            <Shape
                sceneFunc={(ctx, shp) => {
                    ctx.beginPath();                 
                    ctx.moveTo(TILE_WIDTH / 2, TILE_DEPTH);
                    ctx.lineTo(TILE_WIDTH, TILE_DEPTH / 2);
                    ctx.lineTo(TILE_WIDTH, TILE_DEPTH / 2 + TILE_HEIGHT);
                    ctx.lineTo(TILE_WIDTH / 2, TILE_DEPTH + TILE_HEIGHT);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStrokeShape(shp);
                }}
                x={0}
                y={TILE_DEPTH*(1-props.h)}
                strokeWidth={1}
                scaleX={TILE_WIDTH}
                scaleY={TILE_DEPTH}
                fill="rgb(175, 129, 62)"
                stroke="rgb(175, 129, 62)"
                lineCap='butt'
                lineJoin='bevel'
            />
        );
    }

    export const Top: React.FC<TileProps & {onHover: () => void}> = props => {
        return (
            <Shape
                x={0}
                y={TILE_DEPTH * -props.h*.33}
                sceneFunc={(ctx, shp) => {                    
                    ctx.beginPath();
                    ctx.moveTo(0.000000, TILE_DEPTH / 2);
                    ctx.lineTo(TILE_WIDTH / 2, 0);
                    ctx.moveTo(TILE_WIDTH, TILE_DEPTH / 2);
                    ctx.lineTo(TILE_WIDTH / 2, TILE_DEPTH);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStrokeShape(shp);
                }}
                strokeWidth={1}
                scaleX={TILE_WIDTH}
                scaleY={TILE_DEPTH}
                fill="rgb(191, 145, 76)"
                stroke="rgb(191, 145, 76)"
                lineCap='butt'
                lineJoin='bevel'
            />
        );
    }
}