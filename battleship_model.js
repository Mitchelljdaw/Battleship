var gameState={
  grid:
  [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
  ],
  oppGrid:
  [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
  ],
  turns:0,
  turn:"yours",
  gameOver:false,
  gameStart:false,
}
var largeShip={
  size:5,
  location:"unplaced",
  orientation:"verticle",
  damage:2,
};
var mediumShip={
  size:4,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};
var mediumShip2={
  size:4,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};
var midShip={
  size:3,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};
var smallShip={
  size:2,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};

var oLargeShip={
  size:5,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};
var oMediumShip={
  size:4,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};
var oMediumShip2={
  size:4,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};
var oMidShip={
  size:3,
  location:"unplaced",
  orientation:"verticle",
  damage:2,
};
var oSmallShip={
  size:2,
  location:"unplaced",
  orientation:"verticle",
  damage:0,
};

function getCell(row,colum){
  return gameState.grid[row][colum];
}
function getOppCell(row,colum){
  return gameState.oppGrid[row][colum];
}
function click(){
gameState.turns ++;
};
function sunk(){

}
function gameOver()
{
if(smallShip.damage == 2 && midShip.damage == 3 && mediumShip.damage ==4 && mediumShip2.damage == 4 && largeShip.damage == 5){
  gameState.gameOver = true;
}
else if(oSmallShip.damage == 2 && oMidShip.damage == 3 && oMediumShip.damage ==4 && oMediumShip2.damage == 4 && oLargeShip.damage == 5){
  gameState.gameOver = true;
}
else{
  return false;
}
}

function turn(){
  var temp = gameState.turns;
  while (temp > 0){
    temp -=2;
    if(temp == 0){
      gameState.turn = "opp"
      return gameState.turn;
    }
    else if(temp < 0){
      gameState.turn = "yours"
      return gameState.turn;
    }
  }
  return gameState.turn;
}

function gameStart()
{
  if(smallShip.location == "placed" && midShip.location == "placed" && mediumShip.location == "placed" && mediumShip2.location == "placed" && largeShip.location == "placed")
  {
    return gameState.gameStart = true;
  }
}
