let level1;


/**
 * Returns an array of background objects for the level based on its length.
 * @param {number} levelLength - The number of background layers for the level.
 * @returns {BackgroundObject[]} An array of background objects.
 */
function returnLevelBackgroundArray(levelLength) {
  backgroundArray = [];

  for (let i = 0; i < levelLength; i++) {
    backgroundArray.push(
      new BackgroundObject(
        "./img/5_background/layers/air.png",
        -719 + 719 * i * 2,
        0,
        0.97
      )
    );
    backgroundArray.push(
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        -719 + 719 * i * 2,
        0,
        0.97
      )
    );
    backgroundArray.push(
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719 + 719 * i * 2,
        0,
        0.91
      )
    );
    backgroundArray.push(
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        -719 + 719 * i * 2,
        0,
        0
      )
    );

    backgroundArray.push(
      new BackgroundObject(
        "./img/5_background/layers/air.png",
        0 + 719 * i * 2,
        0,
        0.97
      )
    );
    backgroundArray.push(
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        0 + 719 * i * 2,
        0,
        0.97
      )
    );
    backgroundArray.push(
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        0 + 719 * i * 2,
        0,
        0.91
      )
    );
    backgroundArray.push(
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/1.png",
        0 + 719 * i * 2,
        0,
        0
      )
    );
  }
  return backgroundArray;
}


/**
 * Returns an array of coin and bottle objects for the level.
 * @param {number} coinInputNumber - The number of coins to add to the level.
 * @param {number} bottleInputNumber - The number of bottles to add to the level.
 * @returns {Array} An array containing Coin and Bottle objects.
 */
function returnCoinsAndBottlesForLevel(coinInputNumber, bottleInputNumber) {
  let itemArray = [];
  for (let i = 0; i < coinInputNumber; i++) {
    itemArray.push(new Coin());
  }
  for (let i = 0; i < bottleInputNumber; i++) {
    itemArray.push(new Bottle());
  }
  return itemArray;
}


/**
 * Returns an array of chicken enemies and the end boss for the level.
 * @param {number} chickenInputNumber - The number of chickens to add to the level.
 * @returns {Array} An array containing Chicken objects and the Endboss.
 */
function returnChickensForLevel(chickenInputNumber) {
  chickenArray = [];
  for (let i = 0; i < chickenInputNumber; i++) {
    chickenArray.push(new Chicken());
  }
  chickenArray.push(new Endboss());
  return chickenArray;
}


/**
 * Initializes the level by setting up enemies, clouds, backgrounds, coins, and bottles.
 */
function initLevel() {
  level1 = new Level(
    returnChickensForLevel(20),
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    returnLevelBackgroundArray(7),
    returnCoinsAndBottlesForLevel(12, 30)
  );
}
