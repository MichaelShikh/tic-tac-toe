var board;
var boxMatrix = [[],[],[]];
var turn = 0;

function init(){
	board = document.getElementById('board');
	
	for(var row = 0 ; row < 3; row++){
		for(var col = 0 ; col < 3; col++){
			var c = new Cell(row,col);
			c.addToBoard();
			boxMatrix[row][col] = c;
		}
	}		
}

function Cell(row,col){
	this.value = undefined; // x or o for player, undefined for empty.
	this.row = row;
	this.col = col;
	this.addToBoard = function(){
		 var currentObj = this; // this is the cell
		 var cell = document.createElement("div");
		 cell.className = "cell";
		 var cellImg = document.createElement("img");
		 cellImg.className ="cellImg";
		 board.appendChild(cell);
		 cell.appendChild(cellImg);
		 
		 cell.onclick = function(){
			if(turn % 2 == 0 && currentObj.value == undefined){ // put x
				cellImg.src="images/x_image.png";
				currentObj.value = "x";
				turn++;
			}
			else if(turn % 2 == 1 && currentObj.value == undefined){ // put 0;
				cellImg.src="images/o_image.png";
				currentObj.value = "o";
				turn++;
			}
			
			if(turn == 9){
				if(checkForWinner(currentObj.row,currentObj.col))
					alert(currentObj.value + " Wins! ");
				
				else
					setTimeout(function(){alert("game over");},100);
			}
			//after 5 turns there are 3 X , check for winner
			else if(turn >= 5 && checkForWinner(currentObj.row,currentObj.col))
				alert(currentObj.value + " Wins! ");
		 };
	};
}

function checkForWinner(row,col){
	var value = boxMatrix[row][col].value;
	
	//check row
	if( boxMatrix[row][0].value == value && boxMatrix[row][1].value == value && boxMatrix[row][2].value == value){
		return true;
	}
	
	//check col
	if( boxMatrix[0][col].value == value && boxMatrix[1][col].value == value && boxMatrix[2][col].value == value){
		return true;
	}
	
	//check right diagonal
	if(row == col){
		if(boxMatrix[0][0].value == value && boxMatrix[1][1].value == value && boxMatrix[2][2].value == value)
			return true;
	}
	//check left diagonal
	if((row == col && row == 1) || (row == 0 && col == 2) || (row == 2 && col == 0)){		 
		if(boxMatrix[0][2].value == value && boxMatrix[1][1].value == value && boxMatrix[2][0].value == value)
			return true;
	}
	
	return false;
}