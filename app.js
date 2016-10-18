$(document).ready(function() {
//setting x or o;
  var computerSign;
  var playerSign;
  $("#selectO").click(function() {
    computerSign = "X"; 
    playerSign = "O"; 
  });
  $("#selectX").click(function() {
    computerSign = "O"; 
    playerSign = "X"; 
  });

//Change from start to game board;
  $(".board").hide();
  $(".btn").click(function() {
  	$(".board").show();
  	$(".start").hide();
  });

//Combinations 
  var combinations = [["r1c1", "r1c2", "r1c3"], ["r2c1", "r2c2", "r2c3"], ["r3c1", "r3c2", "r3c3"], ["r1c1", "r2c1", "r3c1"], ["r1c2", "r2c2", "r3c2"], ["r1c3", "r2c3", "r3c3"], ["r1c1", "r2c2", "r3c3"], ["r1c3", "r2c2", "r3c1"]];
  var playerMoves = [];
  var computerMoves = [];

//Printing scores
  var computerScore = 0;
  var playerScore = 0;

  function addScore() { 
    if (turn == "player") {
      playerScore++
      $("#playerScore").html("Player: " + playerScore);
    } else {
      computerScore++
      $("#computerScore").html("Computer: " + computerScore);
    }
  }

//Player turn 
  var square = $(".square");
  var info = $("#info");
  var turn = "player";
  
  square.click(function() {
    var squareId = $(this).attr('id'); 
    if (turn == "player" && empty(squareId)) {
      $(this).html("<p class=\"innerSquare\">" + playerSign + "</p>");
      playerMoves.push(squareId);
      if(notGameEnd(playerMoves)) {
        turn = "computer";
        computerTurn();
      }
    } 
  });	

 // Computer play 
  function computerTurn() {
  	if(turn == "computer") {
  	  checkCombination(computerMoves);
    }
  	if(turn == "computer") {
      checkCombination(playerMoves);
    }
  	if(turn == "computer") {
  	  computerRandomMove();
  	}
  } 

  function checkCombination(movesArr) {
    if (movesArr.length < 2) {
      return false; 
    } else if (checkForMatch(movesArr, 2)) {
      var squareId = checkForMatch(movesArr, 2);
      computerMoves.push(squareId);
      document.getElementById(squareId).innerHTML = "<p class=\"innerSquare\">" + computerSign + "</p>";
      if(notGameEnd(computerMoves)) {
        turn = "player";
      }
    } 
  }

  function findArrDifference(arr, arr2) {
  	for(j = 0; j < arr.length; j++) {
      var val = arr[j];
      if (!isValueInArray(val, arr2)) {
      	return arr[j];	
      }
    } 
  }

  function computerRandomMove() {
    var squareId;
    do {
      var i = Math.floor(Math.random() * 8 + 1) - 1;
      var j = Math.floor(Math.random() * 3 + 1) - 1;
      squareId = combinations[i][j];	
    } while (!empty(squareId));
    computerMoves.push(squareId);
    if(notGameEnd(computerMoves)) {
      turn = "player";
    }
    return document.getElementById(squareId).innerHTML = "<p class=\"innerSquare\">" + computerSign + "</p>";
  }
      

//Checking to end the game
  function notGameEnd(arr) {
    if (!checkForWin(arr) && !checkMovesLimit()){
      return true; 
    }  
    return false; 
  } 

  function checkForWin(movesArr) {
    if (movesArr.length < 3) {
    	return false; 
    } else if (checkForMatch(movesArr, 3)) {
      info.html("<p>WON! " + turn + "</p>");
      addScore();	
      clear();
      return true;
    }
    return false; 
  } 

  function checkForMatch(movesArr, requiredNum) {
    for(i = 0; i < combinations.length; i++) {
      var matchNum = getNumOfMatch(combinations[i], movesArr);
      if (matchNum != requiredNum) {
      	continue;
      }
      if(matchNum == 3) {
      	return true;
      } 
      if (matchNum == 2) {
      	var squareId = findArrDifference(combinations[i], movesArr);
  	  	if (!empty(squareId)) {
  	  	  continue; 	
  	  	} else {
  	  	  return squareId;
  	  	}
      }
    } 
    return false; 
  }

  function getNumOfMatch(combination, movesArr) {
    function match(combinationValue) {
      return isValueInArray(combinationValue, movesArr);	
    }	
    return (combination.filter(match)).length;
  }

  function isValueInArray(value, arr) {
  	return arr.some(equal);
  	function equal(arrValue) {
      return arrValue == value; 
  	}
  }

  function checkMovesLimit() {
  	var totalMoves = playerMoves.length + computerMoves.length;
  	if (totalMoves == 9) {
  	  setTimeout(function() {clear()}, 1000);
      return info.html("<p>DRAW!</p>");
    } 
    return false;
  }

  function clear() {
    turn = "";
    playerMoves = [];
    computerMoves = [];
    setTimeout(function() {
      turn = "player";
    	square.html("");
    	info.html("<p>PLAY</p>");
    }, 1000);
  }

  function empty(squareId) {
    return document.getElementById(squareId).innerHTML == "";
  }

});