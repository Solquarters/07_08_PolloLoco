/**
 * Class representing a level in the game.
 * 
 * @property {object} world - Reference to the world object that this level is part of.
 * @property {Array<MoveableObject>} enemies - An array of enemies in the level.
 * @property {Array<MoveableObject>} clouds - An array of cloud objects in the level.
 * @property {Array<MoveableObject>} backgroundObjects - An array of background objects in the level.
 * @property {Array<MoveableObject>} items - An array of collectible items in the level.
 * @property {number} level_end_x - The x-coordinate where the level ends.
 */
class Level {
  world;
  enemies;
  clouds;
  backgroundObjects;
  items;
  level_end_x = 7800;

  constructor(enemies, clouds, backgroundObjects, items) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.items = items;
  }
}
