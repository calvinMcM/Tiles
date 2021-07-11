import {Obstacle, SpriteData, SpriteSheetData} from "../Definitions"

const BushSpriteSheetData = new SpriteSheetData({
    "Bush1": new SpriteData(1.6, -.7, "Bush1", 10, 10),
});

export class Bush extends Obstacle{
    constructor(){
        super("Bush1", 4, 4, "", "Bush1", BushSpriteSheetData)
    }
}