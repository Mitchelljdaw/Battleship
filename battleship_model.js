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

var yourShips={
    largeShip:"unplaced",
    lDamage:0,
    mediumShip:"unplaced",
    medDamage:0,
    mediumShip2:"unplaced",
    med2Damage:0,
    midShip:"unplaced",
    midDamage:0,
    smallShip:"unplaced",
    sDamage:0,
    placed: false,
};

var oppShips={
  largeShip:"unplaced",
  lDamage:0,
  mediumShip:"unplaced",
  medDamage:0,
  mediumShip2:"unplaced",
  med2Damage:0,
  midShip:"unplaced",
  midDamage:0,
  smallShip:"unplaced",
  sDamage:0,
  placed: false,
  lastRow: 0,
  lastColum: 0,
  hit: true,
  guess: 0,
  originalColum: 0,
  originalRow: 0,
  side: false,
  sunk: false,
};

function getCell(row,colum){
  return gameState.grid[row][colum];
}
function getOppCell(row,colum){
  return gameState.oppGrid[row][colum];
}

function gameOver()
{
if(yourShips.sDamage == 2 && yourShips.midDamage == 3 && yourShips.medDamage==4 && yourShips.med2Damage == 4 && yourShips.lDamage == 5){
  gameState.gameOver = true;
  if(localStorage["Games-won-opp"] == "null"){
    localStorage["Games-won-opp"] = 1;
  }
  else{
    localStorage["Games-won-opp"] += 1;
  }
  alert("I am sorry the oppnant has sunk all of your ships.");
}
else if(oppShips.sDamage == 2 && oppShips.midDamage == 3 && oppShips.medDamage==4 && oppShips.med2Damage == 4 && oppShips.lDamage == 5){
  gameState.gameOver = true;
  if(localStorage["Games-won-you"] == "null"){
    localStorage["Games-won-you"] = 1;
  }
  else{
    localStorage["Games-won-you"] += 1;
  }
  alert("Congradulations you have sunk all the opponants ships.");
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


function clearLocal(){
  localStorage.clear();
}
var isChrome = !!window.chrome && !!window.chrome.webstore;
function loadData(){
  if(isChrome){

  }
  else{
    var request = new XMLHttpRequest();
    request.open("GET","battleship.XML", false);
    request.send();
    var information = document.getElementById("information");
    var xmldoc = request.responseXML;
    var xmlrows = xmldoc.getElementsByTagName("player");
    for(var i = 0; i < xmlrows.length; i++){
      var xmlrow = xmlrows[i];
      if(i == 0){
        xmlrow.getElementsByTagName("wins")[0].childNodes[0].nodeValue = localStorage.getItem("Games-won-you").length;
      }
      else{
        xmlrow.getElementsByTagName("wins")[0].childNodes[0].nodeValue = localStorage.getItem("Games-won-opp").length;
      }
      information.innerHTML += "Player:" + xmlrow.getAttribute("name");
      var wins = xmlrow.getElementsByTagName("wins")[0];
      information.innerHTML += "<br>" + "Wins:" + wins.firstChild.data + "<br>";
    }
  }
}

function generateYourBoard(){
  var cells = document.getElementsByTagName("td");
  var count = 0;
  for(var i = 0; i < gameState.grid.length; i++){
    for(var r = 0; r < gameState.grid.length; r++){
      if(getCell(i,r) == 6 || getCell(i,r) == 5 || getCell(i,r) == 4 || getCell(i,r) == 3 || getCell(i,r) == 2){
        cells[count].className = "placed";
      }
      else if(getCell(i,r) == 10){
        cells[count].className = "hit";
      }
      else if(getCell(i,r) == 9){
        cells[count].className = "miss";
      }
      count++;
  }
}
}

function generateOppBoard(){
  var cells = document.getElementsByTagName("td");
  var count = cells.length/2;
for(var i =0; i < gameState.oppGrid.length; i++){
  for(var r = 0; r < gameState.oppGrid.length; r++){
  cells[count].className = "placed";
  count++;
}
}
}

function createGrids(_oppGrid, _yourships){
  var count = 0;
  while(_yourships.placed == false){
    if(count > 0){
      badGrid(_oppGrid, _yourships, count);
    }
    for(var i = 0; i < gameState.oppGrid.length; i++){
      var one = Math.floor((Math.random()* 2) + 0);
      var space;
      var helper = false;
      if(one == 1 && _yourships.largeShip == "unplaced"){
        space = Math.floor(Math.random() * 4);
          for(var j = 0; j < gameState.oppGrid.length + space; j++){
            if(helper == false){
              while(j < space){
                _oppGrid[i][j] = 0;
                j++;
              }
              helper = true;
            }
            else{
              if(j < 5 + space + 1){
                _oppGrid[i][j] = 6;
                _yourships.largeShip = "placed";
              }
              else{
                _oppGrid[i][j] = 0;
              }
            }
          }
      }
      else if(one == 1 && _yourships.mediumShip == "unplaced"){
        space = Math.floor(Math.random() * 5);
          for(var j = 0; j < gameState.oppGrid.length + space; j++){
            if(helper == false){
              while(j < space){
                _oppGrid[i][j] = 0;
                j++;
              }
              helper = true;
            }
            else{
              if(j < 4 + space + 1){
                _oppGrid[i][j] = 5;
                _yourships.mediumShip = "placed";
              }
              else{
                _oppGrid[i][j] = 0;
              }
            }
          }
      }
      else if(one == 1 && _yourships.mediumShip2 == "unplaced"){
        space = Math.floor(Math.random() * 6);
          for(var j = 0; j < gameState.oppGrid.length; j++){
            if(helper == false){
              while(j < space){
                _oppGrid[i][j] = 0;
                j++;
              }
              helper = true;
            }
            else{
              if(j < 4 + space + 1){
                _oppGrid[i][j] = 4;
                _yourships.mediumShip2 = "placed";
              }
              else{
                _oppGrid[i][j] = 0;
              }
            }
          }
      }
      else if(one == 1 && _yourships.midShip == "unplaced"){
        space = Math.floor(Math.random() * 7);
          for(var j = 0; j < gameState.oppGrid.length; j++){
            if(helper == false){
              while(j < space){
                _oppGrid[i][j] = 0;
                j++;
              }
              helper = true;
            }
            else{
              if(j < 3 + space + 1){
                _oppGrid[i][j] = 3;
                _yourships.midShip = "placed";
              }
              else{
                _oppGrid[i][j] = 0;
              }
            }
          }
      }
      else if(one == 1 && _yourships.smallShip == "unplaced"){
        space = Math.floor(Math.random() * 8);
          for(var j = 0; j < gameState.oppGrid.length; j++){
            if(helper == false){
              while(j < space){
                _oppGrid[i][j] = 0;
                j++;
              }
              helper = true;
            }
            else{
              if(j < 2 + space + 1){
                _oppGrid[i][j] = 2;
                _yourships.smallShip = "placed";
              }
              else{
                _oppGrid[i][j] = 0;
              }
            }
          }
          _yourships.placed = true;
      }
      }
      count++;
  }
}
function badGrid(_oppGrid, ships, _count){
  for(var i = 0; i < gameState.grid.length; i++){
    for(var j = 0; j < gameState.grid.length; j++){
      _oppGrid[i][j] = 0;
    }
  }
  ships.largeShip = "unplaced";
  ships.mediumShip = "unplaced";
  ships.mediumShip2 = "unplaced";
  ships.midShip = "unplaced";
  ships.smallShip = "unplaced";
  ships.placed = false;
  _count = 0;
}

function sameShip(ship){
  if(ship == oppShips.currentShip){
    return true;
  }
  else{
    return false;
  }
}


function oppTurn(){
  if(gameState.hit == true && oppShips.sunk == false){
    if(oppShips.guess == 0){
      var row = oppShips.lastRow;
      var colum = oppShips.lastColum;
      oppShips.originalRow = row;
      oppShips.originalColum = colum;
      oppShips.guess += 1;
    }
    var row = oppShips.lastRow;
    var colum = oppShips.lastColum += 1;
    var attack = getCell(row, colum);
    if(oppShips.side == true){
      while(attack !== 6 && attack !== 5 && attack !== 4 && attack !== 3 && attack !== 2){
        var colum = oppShips.lastColum -= 1;
        var attack = getCell(row,colum);
      }
    }
    while(attack !== 6 && attack !== 5 && attack !== 4 && attack !== 3 && attack !== 2){
      if(colum == 9){
        oppShips.side = true;
        var colum = oppShips.originalColum -= 1;
        var attack = getCell(row, colum);
      }
      else{
        var colum = oppShips.lastColum += 1;
        var attack = getCell(row,colum);
      }
    }
    oppShips.lastRow = row;
    oppShips.lastColum = colum;
  }
  else{
    var row = Math.floor((Math.random()* 10));
    var colum = Math.floor((Math.random()* 10));
    var attack = getCell(row, colum);
    oppShips.lastRow = row;
    oppShips.lastColum = colum;
  }
    if(attack == 6 || attack == 5 || attack == 4 || attack == 3 || attack == 2){
      gameState.hit = true;
    }
    if (attack == 6){
      console.log("Your large ship was hit by your opponant");
      yourShips.lDamage++;
      if(yourShips.lDamage == 5){
        oppShips.sunk = true;
        gameState.hit = false;
        var win = new Audio('Assignment2/explosion.wav');
        win.play();
        alert("Your large ship was just sunk");
      }
    }
    else if(attack == 5){
      console.log("One of your medium ships was hit by your opponant");
      yourShips.medDamage++;
      if(yourShips.medDamage == 4){
        oppShips.sunk = true;
        gameState.hit = false;
        var win = new Audio('Assignment2/explosion.wav');
        win.play();
        alert("One of your medium ships was just sunk");
      }
    }
    else if(attack == 4){
      console.log("One of your medium ships was hit by your opponant");
      yourShips.med2Damage++;
      if(yourShips.med2Damage == 4){
        oppShips.sunk = true;
        gameState.hit = false;
        var win = new Audio('Assignment2/explosion.wav');
        win.play();
        alert("One of your medium ships was just sunk");
      }
    }
    else if(attack == 3){
      console.log("Your mid ship was hit by your opponant");
      yourShips.midDamage++;
      if(yourShips.midDamage == 3){
        oppShips.sunk = true;
        gameState.hit = false;
        var win = new Audio('Assignment2/explosion.wav');
        win.play();
        alert("Your mid ship was just sunk");
      }
    }
    else if(attack == 2){
      console.log("Your small ship was hit by your opponant");
      yourShips.sDamage++;
      if(yourShips.sDamage == 2){
        oppShips.sunk = true;
        gameState.hit = false;
        var win = new Audio('Assignment2/explosion.wav');
        win.play();
        alert("Your small ship was just sunk");
      }
    }
    if(attack == 6 || attack == 5 || attack == 4 || attack ==3 || attack == 2){
      gameState.grid[row][colum] = 10;
      generateYourBoard();
    }
    else if(attack == 9){
      console.log("Opp had to guess again.");
      oppTurn();
    }
    else if(attack == 10){
      console.log("Opp had to guess again.");
      oppTurn();
    }
    else{
      console.log("your ship was not hit by your opponant");
      oppShips.sunk = false;
      gameState.grid[row][colum] = 9;
      generateYourBoard();
    }
    gameState.turn = "yours";
}


function begin(){
  if(gameState.gameStart == true){
    alert("You have already started or finished a game. If you would like to start a new game click 'New game'.")
  }
  else{
    gameState.gameStart = true;
    var wins = localStorage["Games-won-you"];
    var wins0 = localStorage["Games-won-opp"];
    localStorage.setItem("Games-won-you", wins);
    var winsO = localStorage["Games-won-opp"];
    localStorage.setItem("Games-won-opp", winsO);
    createGrids(gameState.oppGrid, yourShips);
    createGrids(gameState.grid, oppShips);
    loadData();
    makeNameForSure()
    generateYourBoard();
    generateOppBoard();
  }
}

function restart(){
  location.reload();
}
