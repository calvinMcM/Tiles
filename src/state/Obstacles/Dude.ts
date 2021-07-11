import {Obstacle, SpriteData, SpriteSheetData} from "../Definitions"

const DudeSpriteSheetData = new SpriteSheetData({
    "Dude1": new SpriteData(80, -70, "Dude1", .45, .45),
    "Gal1": new SpriteData(2, -2.5, "Gal1", 10, 10),
});

export class Dude extends Obstacle{
    constructor(){
        super("Guy", 4, 4, "", Dude.getSkin(), DudeSpriteSheetData)
    }
    static getSkin(){
        switch(Math.floor(Math.random() * 2)){
            case 1: return "Gal1";
            default: return "Dude1";
        }
    }
}