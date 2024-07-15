

function initLevel(){
    ////INIT WENN AUF START GEDRÜCKT WIRD
    //let level1 = new Level(
}


function returnLevelBackgroundArray(levelLength){
    backgroundArray = [];
    

    for(let i = 0; i < levelLength; i++){
        backgroundArray.push(new BackgroundObject('./img/5_background/layers/air.png', (-719 + 719*i*2), 0, 0.97));
        backgroundArray.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', (-719+ 719*i*2), 0, 0.97));
        backgroundArray.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png',(-719+ 719*i*2), 0, 0.91));
        backgroundArray.push(new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', (-719+ 719*i*2), 0, 0.1));

        backgroundArray.push(new BackgroundObject('./img/5_background/layers/air.png', 0 + 719*i*2, 0, 0.97));
        backgroundArray.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png',  0 + 719*i*2, 0, 0.97));
        backgroundArray.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png',  0 + 719*i*2, 0, 0.91));
        backgroundArray.push(new BackgroundObject('./img/5_background/layers/1_first_layer/1.png',  0 + 719*i*2, 0, 0.1));
    }
    return backgroundArray;
}

function returnCoinsForLevel(coinInputNumber){
    coinArray = [];
    for(let i = 0; i < coinInputNumber; i++){
        coinArray.push(new Coin());
    }
    return coinArray;
}



//////Setting Level length here ! 
//returnLevelBackgroundArray(1);
let level1 = new Level(
    [new Chicken(),new Chicken(),new Chicken(),new Chicken(),new Chicken(),new Chicken(), new Endboss()],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    returnLevelBackgroundArray(6),
    returnCoinsForLevel(12)
);
