// 'use strict'

app.factory('ClassicGameFactory', function() {
	var ClassicGameFactory = {};

	function Card(shape, color, fill, number) {
		this.shape = shape;
		this.color = color;
		this.fill = fill;
		this.number = number;
		this.selected = false;
	}

	var threeSelectedCards = [];
	var fullSet = createFullSet();
	var arrayOfTwelve = [];
	var count = 0;
	var shapes = ["oval", "squiggle", "diamond"];
	var colors = ["red", "green", "purple"];
	var fills = ["striped", "empty", "solid"];
	var numbers = [1,2,3];	
	var hintMessage = false;

// Function that shuffles array
	function shuffle (array) {
		var j = 0, temp = null;
	  	for (var i = 0; i< array.length; i++) {
		    j = Math.floor(Math.random() * (i + 1))
		    temp = array[i]
		    array[i] = array[j]
		    array[j] = temp
		}
	  return array;
	}

// Function that creates a full set of 81 unique cards
	function createFullSet() {
		var set = [];
			var shapes = ["oval", "squiggle", "diamond"];
			var colors = ["red", "green", "purple"];
			var fills = ["striped", "empty", "solid"];
			var numbers = [1,2,3];

		
		for(var s = 0; s <3; s++) {
			for(var c = 0; c < 3; c++) {
				for(var f = 0; f < 3; f++) {
					for(var n = 0; n < 3; n++) {
						var curNumber = numbers[n]
						var newCard = new Card(shapes[s], colors[c], fills[f], numbers[n])
						set.push(newCard)
					}
				}
			}
		}

		return shuffle(set);
	}

// Function that checks if 3 cards are the set
	function isSet(arr){
		// var shapes = ["oval", "squiggle", "diamond"];
		// var colors = ["red", "green", "purple"];
		// var fills = ["striped", "empty", "solid"];
		// var numbers = [1,2,3];
		var s = [];
		s[0] = shapes.indexOf(arr[0].shape) + shapes.indexOf(arr[1].shape) + shapes.indexOf(arr[2].shape)
		s[1] = colors.indexOf(arr[0].color) + colors.indexOf(arr[1].color) + colors.indexOf(arr[2].color)
		s[2] = fills.indexOf(arr[0].fill) + fills.indexOf(arr[1].fill) + fills.indexOf(arr[2].fill)
		s[3] = numbers.indexOf(arr[0].number) + numbers.indexOf(arr[1].number) + numbers.indexOf(arr[2].number)
		for (var i = 0; i < s.length; i++){
			if(s[i]%3 !== 0){
				return false
			}
				
		} 
		return true;
	}

// Function that start a new game
	ClassicGameFactory.startNewGame = function() {
		fullSet = createFullSet();
		return ClassicGameFactory.createArray();
	}

// Function that shifts 12 cards from the set and created an array of 12 cards
	ClassicGameFactory.createArray = function() {
		arrayOfTwelve = [];	
		for (var i = 0; i < 12; i++) {
			if(fullSet.length)
			arrayOfTwelve.push(fullSet.shift());
		}
		count = 0;
		return arrayOfTwelve;
	}

// Function that selects 3 cards and called compareThree function 
	ClassicGameFactory.selectCard = function(card) {
		hintMessage = false;
		if(card.selected) disselect(card)
		else select(card);

	}

function select(card) {
	card.selected = true;
	threeSelectedCards.push(card)
	if(threeSelectedCards.length > 2) {
		compareThree(threeSelectedCards) 
	} 
}

function disselect(card) {
	card.selected = false;
	for(var i = 0; i < threeSelectedCards.length; i++) {
		if(threeSelectedCards[i] === card) {
			threeSelectedCards.splice(i, 1)
		}
	}
}

// Function that returns true if the game is over and false otherwise
	function isGameOver(){
		if(fullSet.length===0){
			if(!ClassicGameFactory.containsSet())
				return true;
		}
		return false;
	}

// Function that calls isSet on array and if it is a set, calls replaceCards() function and 
// calls isGameOver() function. It disselects 3 selected cards and clears threeSelectedCards array
function compareThree(arr) {
	if(isSet(arr)){
		replaceCards();
		count++;
	} 		
 	// return disselect(arr);
 	threeSelectedCards = [];
 	for(var i = 0; i < arr.length; i++) {
 		arr[i].selected = false;
 	}
}


// Function that replaces 3 cards if it is a set
	function replaceCards() {
		var i = 0;
		while(i < arrayOfTwelve.length) {
			if(arrayOfTwelve[i].selected === true) {
				if(fullSet.length > 0 && arrayOfTwelve.length < 13) {
					arrayOfTwelve[i] = fullSet.shift();		
				}
				else {
					arrayOfTwelve.splice(i, 1)
					i--;
				}
			}
			i++;

		}
		return arrayOfTwelve;
	}

// Function that returns the count of matches
	ClassicGameFactory.returnCount = function() {
		return count;
	}

// Function that returns the number of the remaining cards in the set
	ClassicGameFactory.returnRemainingInSet = function() {
		return fullSet.length;
	}

// Function that checks if the 12 cards on the table contain set
	ClassicGameFactory.containsSet = function() {
		for(var i = 0; i < arrayOfTwelve.length; i++) {
			var f1 = arrayOfTwelve[i];
			for(var j = 0; j <arrayOfTwelve.length; j++) {
				if(j!==i){
					var s2 = arrayOfTwelve[j];
					for(var k = 0; k <arrayOfTwelve.length; k++) {
						if(!(k===i || k===j)){
							var t3 = arrayOfTwelve[k];
							if(isSet([f1,s2,t3])) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}


// // Function that finds a set in 12 cards and replaces them
// 	ClassicGameFactory.pickSet = function() {
// 		for(var i = 0; i < arrayOfTwelve.length; i++) {
// 			var firstCard = arrayOfTwelve[i];
// 			for(var j = 0; j <arrayOfTwelve.length; j++) {
// 				if(j!==i){
// 					var secondCard = arrayOfTwelve[j];
// 					for(var k = 0; k <arrayOfTwelve.length; k++) {
// 						if(!(k===i || k===j)){
// 							var thirdCard = arrayOfTwelve[k];
// 							if(isSet([firstCard,secondCard,thirdCard])) {
// 								firstCard.selected = true
// 								secondCard.selected = true
// 								thirdCard.selected = true
// 								compareThree([firstCard,secondCard,thirdCard])
// 								return true;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		return false;
// 	}


// Function that finds a set in 12 cards and replaces them
	ClassicGameFactory.giveHint = function() {
		for(var i = 0; i < arrayOfTwelve.length; i++) {
			var firstCard = arrayOfTwelve[i];
			for(var j = 0; j <arrayOfTwelve.length; j++) {
				if(j!==i){
					var secondCard = arrayOfTwelve[j];
					for(var k = 0; k <arrayOfTwelve.length; k++) {
						if(!(k===i || k===j)){
							var thirdCard = arrayOfTwelve[k];
							if(isSet([firstCard,secondCard,thirdCard])) {
								if(firstCard.selected && secondCard.selected && thirdCard.selected) {
									compareThree([firstCard,secondCard,thirdCard])	
									
								} 
								else if(firstCard.selected && secondCard.selected)  {
									thirdCard.selected = true
									select(thirdCard)
									count--;
								} 
								else if(firstCard.selected) {
									secondCard.selected = true
									select(secondCard)
								} 
								else {
									firstCard.selected = true
									select(firstCard)							
								}


								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}


// Function that adds 3 cards on the table if there is no set
	ClassicGameFactory.addCards = function() {
		if(!ClassicGameFactory.containsSet()) {
			for(var i = 0; i < 3; i++) {
				if(fullSet.length > 0)
					arrayOfTwelve.push(fullSet.shift())
			}
			hintMessage = false;
		} else {
			hintMessage = true;
		}
	}

	ClassicGameFactory.showHintMessage = function() {
		return hintMessage;
	}

	return ClassicGameFactory;
	
})










