class Level {
    world;
    enemies;
    clouds;
    backgroundObjects;
    items;
    level_end_x = 7800;
    

    constructor(enemies, clouds, backgroundObjects, items){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }
}