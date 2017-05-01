READ ME


This file is titled battleship.XML and can be found in the same file as all other documents from this project.

In the file there is a game data about the two players playing the game.
It has their name,amount of hits, turns taken, and ships left on board.
each of these data bits have their own specific tags in the xml file.
I added an event handler to the "loadGame" button that can be found on the "gameplay" page.
once you click on this button it will request the information from the XML page using a XMLHttpRequest.
I then used a for loop to go through all the data in the file and displayed the data parsed in the "information" div at
the bottom of the gameplay page.

You can go to the XML page if you would like to change anything.

Does not work in chrome.
