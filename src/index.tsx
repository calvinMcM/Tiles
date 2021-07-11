import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameSession } from "./components/GameSession";
import { Map } from "./components/Map";
import { MAP_SET } from "./redux/actions/MapActions";
import SessionStore from "./redux/SessionStore";
import ImageManager from "./state/ImageManager";
import { generateMap } from "./state/MapGenerator";

new Promise<void>(async (resolve, reject) => {
    try{
        await ImageManager.loadImage("Water1", "/Tiles/Water4.svg");
        await ImageManager.loadImage("Water2", "/Tiles/Water5.svg");
        await ImageManager.loadImage("Water3", "/Tiles/Water6.svg");
        await ImageManager.loadImage("WaterEdge1N", "/Tiles/Water1_Edge_1_N.svg");
        await ImageManager.loadImage("WaterEdge1S", "/Tiles/Water1_Edge_1_S.svg");
        await ImageManager.loadImage("WaterEdge1E", "/Tiles/Water1_Edge_1_E.svg");
        await ImageManager.loadImage("WaterEdge1W", "/Tiles/Water1_Edge_1_W.svg");
        await ImageManager.loadImage("Dirt0", "/Tiles/Dirt0.svg");
        await ImageManager.loadImage("Dirt1", "/Tiles/Dirt4.svg");
        await ImageManager.loadImage("DirtEdge1", "/Tiles/Dirt1_Edge_1.svg");
        await ImageManager.loadImage("DirtEdge2", "/Tiles/Dirt1_Edge_2.svg");
        await ImageManager.loadImage("DirtEdge1N", "/Tiles/Dirt1_Edge_1_N.svg");
        await ImageManager.loadImage("DirtEdge1S", "/Tiles/Dirt1_Edge_1_S.svg");
        await ImageManager.loadImage("DirtEdge1E", "/Tiles/Dirt1_Edge_1_E.svg");
        await ImageManager.loadImage("DirtEdge1W", "/Tiles/Dirt1_Edge_1_W.svg");
        await ImageManager.loadImage("Dirt2", "/Tiles/Dirt5.svg");
        await ImageManager.loadImage("Dirt3", "/Tiles/Dirt6.svg");
        await ImageManager.loadImage("Stone1", "/Tiles/Stone1.svg");
        await ImageManager.loadImage("StoneEdge1S", "/Tiles/Stone1_Edge_1_E.svg");
        await ImageManager.loadImage("StoneEdge1E", "/Tiles/Stone1_Edge_1_E.svg");
        await ImageManager.loadImage("Grass1", "/Tiles/Grass4.svg");
        await ImageManager.loadImage("GrassEdge1", "/Tiles/Grass1_Edge_2.svg");
        await ImageManager.loadImage("GrassEdge1N", "/Tiles/Grass1_Edge_1_North.svg");
        await ImageManager.loadImage("GrassEdge1S", "/Tiles/Grass1_Edge_1_South.svg");
        await ImageManager.loadImage("GrassEdge1E", "/Tiles/Grass1_Edge_1_East.svg");
        await ImageManager.loadImage("GrassEdge1W", "/Tiles/Grass1_Edge_1_West.svg");
        await ImageManager.loadImage("Grass2", "/Tiles/Grass5.svg");
        await ImageManager.loadImage("Grass3", "/Tiles/Grass6.svg");
        await ImageManager.loadImage("Grass_Top_1", "/Tiles/Grass_Top_2.svg");
        await ImageManager.loadImage("Sand1", "/Tiles/Sand1.svg");
        await ImageManager.loadImage("Sand2", "/Tiles/Sand2.svg");
        await ImageManager.loadImage("Sand3", "/Tiles/Sand3.svg");
        await ImageManager.loadImage("Castle1", "/Tiles/Castle_5.svg");
        await ImageManager.loadImage("Castle2", "/Tiles/Castle_4.svg");
        await ImageManager.loadImage("Castle3", "/Tiles/Castle_3.svg");
        await ImageManager.loadImage("Castle_Side_1", "/Tiles/Castle_Side_1.svg");
        await ImageManager.loadImage("Castle_Side_2", "/Tiles/Castle_Side_2.svg");
        await ImageManager.loadImage("Castle_3_Side", "/Tiles/Castle_3_Side.svg");
        await ImageManager.loadImage("Castle_4_Side", "/Tiles/Castle_4_Side.svg");
        await ImageManager.loadImage("Castle_5_Side", "/Tiles/Castle_5_Side.svg");
        await ImageManager.loadImage("Tree1", "/Tiles/Tree_1.svg");
        await ImageManager.loadImage("Bush1", "/Tiles/bush1.svg");
        await ImageManager.loadImage("Boulder1", "/Tiles/Boulder1.svg");
        await ImageManager.loadImage("Boulder2", "/Tiles/Boulder2.svg");
        await ImageManager.loadImage("TallGrass1", "/Tiles/TallGrass_1.svg");
        await ImageManager.loadImage("Cliffside_1", "/Tiles/Cliffside_1.svg");
        await ImageManager.loadImage("Cliffside_1_Stone", "/Tiles/Cliffside_1_Stone.svg");
        await ImageManager.loadImage("Waterfall_Side", "/Tiles/WaterSides.svg");
        await ImageManager.loadImage("Shadow_E", "/Tiles/Shadow_E.svg");
        await ImageManager.loadImage("Dude1", "/Tiles/Knight2.svg");
        await ImageManager.loadImage("Gal1", "/Tiles/Gal.svg");
    }
    catch(e){
        reject(e);
    }
    resolve();
}).then(
    () => {
        ReactDOM.render(
            <GameSession/>,
            document.getElementById('reactive')
        )
    }
).catch(
    (error) => {
        console.error(error)
    }
)

