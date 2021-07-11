import * as React from 'react';
import { Image, Shape } from 'react-konva';

import { TILE_WIDTH, TILE_DEPTH, terrainMapping, TileData, TileProps, TILE_HEIGHT, BlockContext, BlockType } from '../../state/Definitions';
import ImageManager from '../../state/ImageManager';

export module Grass{

    export class SVG extends React.Component<TileData & {focused: boolean, onHover:(tile: TileData) => void, surroundings: BlockContext}>{
    
        render(){
            const {
                focused,
                onHover,
                surroundings,
                ...tileProps
            } = this.props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("Grass1");
            switch(tileProps.variant){
                case 1:
                    img = ImageManager.get("Grass2");
                    break;
                case 2:
                    img = ImageManager.get("Grass3");
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
                        scaleX={1}
                        scaleY={1}
                    />
                );
            }
            
            tiles.push(
                <Image
                    key={`surface_${tileProps.u}_${tileProps.v}_terrain`}
                    x={0}
                    y={-(tileProps.h - 1) * TILE_HEIGHT}
                    image={img}
                    scaleX={1}
                    scaleY={1}
                />
            )

            if((tileProps.v % tileProps.u) < 1){
                tiles.push(
                    <Image
                        key={`surface_${tileProps.u}_${tileProps.v}_top`}
                        x={0}
                        y={-(tileProps.h - 1) * TILE_HEIGHT}
                        image={ImageManager.get("Grass_Top_1")}
                        scaleX={1}
                        scaleY={1}
                    />
                );
            }

            // if((tileProps.v % tileProps.u % tileProps.h) == 1){
            //     tiles.push(
            //         <Image
            //             key={`surface_${tileProps.u}_${tileProps.v}_occupant`}
            //             x={-12}
            //             y={-(tileProps.h - 1) * TILE_HEIGHT - 100}
            //             image={ImageManager.get("Tree1")}
            //             scaleX={1}
            //             scaleY={1}
            //         />
            //     );
            // }

    
            return(
                <>
                    {tiles}
                    {/* <Grass.Left h={tileProps.h}/>
                    <Grass.Right h={tileProps.h}/>
                    <Grass.Top h={tileProps.h} onHover={() => onHover(tileProps)}/>
                    {variant} */}
                </>
            )
        }
    }

    export function getEdging(tileData: TileData, map: BlockContext): JSX.Element[]{
        const edging: JSX.Element[] = [];
        if(map.N == null || map.N.h != tileData.h || map.N.t !== BlockType.GRASS) {
            edging.push(<Grass.Edging.North key={`${tileData.u}_${tileData.v}_Edge_N`} {...tileData}/>);
        }
        if(map.S == null || map.S.h != tileData.h || map.S.t !== BlockType.GRASS) {
            edging.push(<Grass.Edging.South key={`${tileData.u}_${tileData.v}_Edge_S`} {...tileData}/>);
        }
        if(map.E == null || map.E.h != tileData.h || map.E.t !== BlockType.GRASS){
            edging.push(<Grass.Edging.East key={`${tileData.u}_${tileData.v}_Edge_E`} {...tileData}/>);
        }
        if(map.W == null || map.W.h != tileData.h || map.W.t !== BlockType.GRASS){
            edging.push(<Grass.Edging.West key={`${tileData.u}_${tileData.v}_Edge_W`} {...tileData}/>);
        }
        if(map.E != null && map.E.h > tileData.h){
            edging.push(<Grass.Shadow.East {...tileData}/>);
        }
        return edging;
    }

    export module Edging{
        export const North: React.FC<TileData> = props => {
            const {
                ...tileProps
            } = props;
            TileData.from(tileProps)
    
            let img = ImageManager.get("GrassEdge1N");
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
    
            let img = ImageManager.get("GrassEdge1S");
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
    
            let img = ImageManager.get("GrassEdge1E");
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
    
            let img = ImageManager.get("GrassEdge1W");
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

    export const Left: React.FC<TileProps> = props => {
        return (
            <>
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(0,0);
                        ctx.lineTo(.5,.33);
                        ctx.lineTo(.5, .33 + .33* props.h)
                        ctx.lineTo(0, .33* props.h)
                        ctx.closePath()
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH*(1-props.h)*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill="#966a18"
                    stroke="#966a18"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(0,0);
                        ctx.lineTo(.5,.33);
                        ctx.lineTo(.5, .33 + .15)
                        ctx.lineTo(0, .15)
                        ctx.closePath()
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH*(1-props.h)*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill={"#0c8d15"}
                    stroke={"#008d05"}
                />
            </>
        );
    }

    export const Right: React.FC<TileProps> = props => {
        return (
            <>
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.5,.33);
                        ctx.lineTo(1,0);
                        ctx.lineTo(1,.33* props.h)
                        ctx.lineTo(.5,.33 + .33* props.h)
                        ctx.closePath()
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH*(1-props.h)*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill="#a6751b"
                    stroke="#a6751b"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.5,.33);
                        ctx.lineTo(1,0);
                        ctx.lineTo(1,.15)
                        ctx.lineTo(.5,.33 + .15)
                        ctx.closePath()
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH*(1-props.h)*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill={"#0c8d15"}
                    stroke={"#008d05"}
                />
            </>
        );
    }

    export const Top: React.FC<TileProps & {onHover: () => void}> = props => {
        return (
            <Shape
                x={0}
                y={TILE_DEPTH * -props.h*.33}
                sceneFunc={(ctx, shp) => {
                    ctx.beginPath();
                    ctx.moveTo(0,.33);
                    ctx.lineTo(.5,0);
                    ctx.lineTo(1,.33)
                    ctx.lineTo(.5,.66)
                    ctx.closePath()
                    ctx.fillStrokeShape(shp)
                }}
                strokeWidth={1/TILE_DEPTH}
                scaleX={TILE_WIDTH}
                scaleY={TILE_DEPTH}
                fill={"#1cad25"}
                stroke={"#0c9d15"}
                onMouseEnter={ev => {
                    props.onHover()
                }}
            />
        );
    }

    export const V1: React.FC<TileProps> = props => {
        return (
            <>
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.19,.15);
                        ctx.lineTo(.21,.19);
                        ctx.lineTo(.23,.16);
                        ctx.moveTo(.24,.1);
                        ctx.lineTo(.26,.15);
                        ctx.lineTo(.27,.11);
                        ctx.moveTo(.27,.09);
                        ctx.lineTo(.28,.13);
                        ctx.lineTo(.29,.10);
                        ctx.moveTo(.32,.05);
                        ctx.lineTo(.35,.1);
                        ctx.lineTo(.37,.06);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    stroke="#0b8a13"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.93,.26);
                        ctx.lineTo(.95,.3);
                        ctx.lineTo(.96,.25);
                        ctx.moveTo(.89,.21);
                        ctx.lineTo(.9,.25);
                        ctx.lineTo(.91,.22);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    stroke="#0b8a13"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.44,.3);
                        ctx.lineTo(.45,.31);
                        ctx.lineTo(.47,.29);
                        ctx.moveTo(.46,.28);
                        ctx.lineTo(.48,.32);
                        ctx.lineTo(.49,.29);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    stroke="#0b8a13"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.41,.57);
                        ctx.lineTo(.42,.60);
                        ctx.lineTo(.44,.57);
                        ctx.moveTo(.43,.60);
                        ctx.lineTo(.44,.62);
                        ctx.lineTo(.46,.59);
                        ctx.moveTo(.45,.58);
                        ctx.lineTo(.47,.63);
                        ctx.lineTo(.48,.62);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    stroke="#0b8a13"
                />
            </>
        );
    }

    export const V2: React.FC<TileProps> = props => {
        return (
            <>
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.75,.25);
                        ctx.lineTo(.76,.20);
                        ctx.lineTo(.76,.24);
                        ctx.lineTo(.77,.21);
                        ctx.lineTo(.77,.24);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill="#1cad25"
                    stroke="#0a7a11"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.2,.20);
                        ctx.lineTo(.21,.25);
                        ctx.lineTo(.22,.21);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill="#1cad25"
                    stroke="#0a7a11"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.21,.21);
                        ctx.lineTo(.23,.26);
                        ctx.lineTo(.24,.22);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill="#1cad25"
                    stroke="#0a7a11"
                />
                <Shape
                    sceneFunc={(ctx, shp) => {
                        ctx.beginPath();
                        ctx.moveTo(.23,.23);
                        ctx.lineTo(.25,.28);
                        ctx.lineTo(.26,.23);
                        ctx.fillStrokeShape(shp)
                    }}
                    x={0}
                    y={TILE_DEPTH * -props.h*.33}
                    strokeWidth={1/TILE_DEPTH}
                    scaleX={TILE_WIDTH}
                    scaleY={TILE_DEPTH}
                    fill="#1cad25"
                    stroke="#0a7a11"
                />
            </>
        );
    }
}