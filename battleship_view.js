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
      click();
      gameOver();
      var whosTurn = turn();
      var cell = this.cellIndex + 1;
      var row = this.parentNode.rowIndex + 1;
      if(this.className == "hit"){
        alert("already been hit");
      }
      else if(this.className == "placed"){
        this.className = "hit";

      }
      else if(this.className == "miss"){
        alert("You've already guessed here and its wrong!");
      }
      else{
        this.className = "miss";
        this.innerHTML = gameState.turns;
      }
      if(gameState.gameOver == true && gameState.turn == "yours"){
        alert("Congradulations you sunk all the enemies ships!")
      }
      else if(gameState.gameOver == true && gameState.turn == "opp"){
        alert("I am sorry the enemy has sunk all of you ships!")
      }
      inform.innerHTML = "<p>You cliked on cell:" + cell + " and row:" + row + "<br>It is " + whosTurn + "'s turn." + "<br>The game is still not over becasue gameOver is " + gameOver() + "<br>That was the " + gameState.turns + " turn" + "</p>";
    }
  }
}
var move = 600;
var lmove = 0;
var move2 = 0;

var right = setInterval(right,100);
var left = setInterval(left,200);
var down = setInterval(down,100);
var up = setInterval(up,200)


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
    name.innerHTML = text.value;
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
