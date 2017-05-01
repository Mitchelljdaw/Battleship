function createTable(colums, rows)
{
  var inform = document.getElementById("information")
  var gameboard = document.getElementById("gameboard1")
  var gameboard2 = document.getElementById("gameboard2")
  var table = "<table><tbody>";
  var table2 = "<table><tbody>";
  var row = "<tr>";
  for(i = 0; i < colums; i++)
  {
      table += row;
      table2 += row;
    for(j = 0; j < rows; j++)
    {
      var cell = "<td id=cell </td>";
      var cell2 = "<td id=cell </td>";
           table += cell;
           table2 += cell2;
    }
     table += "</tr>";
     table2 += "</tr>";
    }
  table += "</tbody></table>"
  table2 += "</tbody></table>"
  gameboard.innerHTML += "<h2  id=Yourname>Your Board</h2>";
  gameboard.innerHTML += table;
  gameboard2.innerHTML += "<h2>Opponants Board</h2>";
  gameboard2.innerHTML += table2;
  var cells = document.getElementsByTagName("td")
  for(i = 0;i < cells.length; i++)
  {
    cells[i].onclick = function()
    {
      var cell = this.cellIndex;
      var row = this.parentNode.rowIndex;
      var gridCell = getOppCell(row,cell);
      if(gameState.gameStart == false){
        alert("Please press 'Game start' button");
      }
      else if(gameState.gameOver == true){
        alert("The game is over please start a new game.");
      }
      else if(this.className == "miss" || this.className == "hit"){
        alert("You have already guessed this spot please guess again.")
      }
      else{
        gameOver();
        if(gameState.gameOver == true && gameState.turn == "yours"){
          if(localStorage["Games-won-you"] == "null"){
            localStorage["Games-won-you"] = 1;
          }
          else{
            localStorage["Games-won-you"] += 1;
          }
          alert("Congradulations you sunk all the enemies ships!");
          return;
        }
        else if(gameState.gameOver == true && gameState.turn == "opp"){
          if(localStorage["Games-won-opp"] == "null"){
            localStorage["Games-won-opp"] = 1;
          }
          else{
            localStorage["Games-won-opp"] += 1;
          }
          alert("I am sorry the enemy has sunk all of you ships!");
          return;
        }
        else{
          var cell = this.cellIndex;
          var row = this.parentNode.rowIndex;
          var gridCell = getOppCell(row,cell);
          if(gameState.turn == "opp"){
            alert("It is not your turn.");
          }
          else if(gameState.turn == "yours"){
            whosTurn = turn();
            if(gridCell == 10){
              alert("already been hit");
            }
            else if(gridCell == 6 || gridCell == 5 || gridCell == 4 || gridCell == 3 || gridCell == 2){
              gameState.oppGrid[row][cell] = 10;
              this.className = "hit";
              if(gridCell == 6 ){
                console.log("You just hit the opponant's large ship.");
                oppShips.lDamage++;
                if(oppShips.lDamage == 5){
                  var win = new Audio('Assignment2/explosion.wav');
                  win.play();
                  alert("You just sunk the opponant's largest ship!")
                }
              }
              else if(gridCell == 5 ){
                console.log("You just hit one of the opponant's medium ships.");
                oppShips.medDamage++;
                if(oppShips.medDamage == 4){
                  var win = new Audio('Assignment2/explosion.wav');
                  win.play();
                  alert("You just sunk one of the opponant's medium ships!")
                }
              }
              else if(gridCell == 4 ){
                console.log("You just hit the opponant's medium ships.");
                oppShips.med2Damage++;
                if(oppShips.med2Damage == 4){
                  var win = new Audio('Assignment2/explosion.wav');
                  win.play();
                  alert("You just sunk the opponants medium ships!")
                }
              }
              else if(gridCell == 3){
                console.log("You just hit the opponant's mid ship.");
                oppShips.midDamage++;
                if(oppShips.midDamage == 3){
                  var win = new Audio('Assignment2/explosion.wav');
                  win.play();
                  alert("You just sunk the opponant's mid ship!")
                }
              }
              else if(gridCell == 2){
                console.log("You just hit the opponant's small ship.");
                oppShips.sDamage++;
                if(oppShips.sDamage == 2){
                  var win = new Audio('Assignment2/explosion.wav');
                  win.play();
                  alert("You just sunk the opponant's small ship!")
                }
              }
            }
            else if(gridCell == 0){
              gameState.oppGrid[row][cell] = 9;
              this.className = "miss";
            }
            else{
              this.innerHTML = gameState.turns;
            }
          }
          gameOver();
          if(gameState.gameOver == false){
            oppTurn();
            gameOver();
          }
      }
      }
    }
  }
}














//Animation
var move = 600;
var lmove = 0;
var move2 = 0;

//var right = setInterval(right,100);
//var left = setInterval(left,200);
//var down = setInterval(down,100);
//var up = setInterval(up,200)


function  right(){
  move += 1;
  lmove += 2;
  var cells = document.getElementById("gameboard2")
  var lcells = document.getElementById("gameboard1")
    cells.style.left = move + "px";
    lcells.style.left = lmove + "px";
}

function  left(){
  move -= 2;
  lmove -= 1;
  var cells = document.getElementById("gameboard2")
  var lcells = document.getElementById("gameboard1")
    cells.style.left = move + "px";
    lcells.style.left = lmove + "px";
}

function  down(){
  move2 += 1;
  var cells = document.getElementById("gameboard2")
  var lcells = document.getElementById("gameboard1")
    cells.style.top = move2 + "px";
    lcells.style.top = move2 + "px";
}

function  up(){
  move2 -= 2;
  var cells = document.getElementById("gameboard2")
  var lcells = document.getElementById("gameboard1")
    cells.style.top = move2 + "px";
    lcells.style.top = move2 + "px";
}

function stopAnimation(){
  var cells = document.getElementById("gameboard2")
  var lcells = document.getElementById("gameboard1")
  cells.style.top = "0px"
  lcells.style.top = "0px";
  clearInterval(right)
  clearInterval(left)
  clearInterval(up)
  clearInterval(down)
}

setTimeout(stopAnimation, 5000)

var count = 0;
function text(e){
  var text = document.getElementById("text");
  var name = document.getElementById("Yourname");
  if (e.keyCode === 13 && count == 0){
    e.preventDefault();
    if(text.value !== "NAME"){
      name.innerHTML = text.value;
      text.readOnly = true;
      count++;
    }
  }
}

function makeNameForSure(){
  var text = document.getElementById("text");
  var name = document.getElementById("Yourname");
    if(text.value !== "NAME"){
      name.innerHTML = text.value;
      text.readOnly = true;
      count++;
    }
}

function select(){
  var debug = document.getElementById("debug");
  var selection = document.getElementById("select");
  debug.innerHTML = selection.value;
}

function place(){
  var debug = document.getElementById("debug");
  debug.innerHTML = "You can now place you battle ships on your board"
}
function start(){
  var gameboard2 = document.getElementById("gameboard2")
  gameStart();
  if(gameState.gameStart == false){
    var debug = document.getElementById("debug");
    debug.innerHTML = "All the ships have not been placed yet.<br>Please place all your ships.";
  }
  else{
    alert("Game has already started.")
  }

}
