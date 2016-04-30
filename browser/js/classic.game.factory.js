'use strict'

app.factory('ClassicGameFactory', function() {
	var ClassicGameFactory = {};

	function Card(shape, color, fill, number, index) {
		this.shape = shape;
		this.color = color;
		this.fill = fill;
		this.number = number;
		this.index = index;
		this.selected = null;
	}

	var threeSelectedCards = [];

	var count = 0;

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

	function createFullSet() {
		var set = [];
		var shapes = ["oval", "squiggle", "diamond"];
		var colors = ["red", "green", "purple"];
		var fills = ["striped", "empty", "solid"];
		var numbers = [1,2,3];
		var index = 0;

		for(var s = 0; s <3; s++) {
			var curShape = shapes[s];
			for(var c = 0; c < 3; c++) {
				var curColor = colors[c]
				for(var f = 0; f < 3; f++) {
					var curFill = fills[f]
					for(var n = 0; n < 3; n++) {
						var curNumber = numbers[n]
						var newCard = new Card(curShape, curColor, curFill, curNumber, index)
						index++;
						set.push(newCard)
					}
				}
			}
		}
		return shuffle(set);
	}


	var fullSet = createFullSet();
	var arrayOfTwelve = [];

	ClassicGameFactory.startNewGame = function() {
		fullSet = createFullSet();
		return ClassicGameFactory.createArray();
	}

	ClassicGameFactory.createArray = function() {
		arrayOfTwelve = [];	
		for (var i = 0; i < 12; i++) {
			if(fullSet.length > 0)
			arrayOfTwelve.push(fullSet.shift());
		}
		count = 0;
		return arrayOfTwelve;
	}


	function compareTwo(obj1, obj2) {
		var count = 0;
		for (var i in obj1) {
			if (obj1[i] !== obj2[i]) {
				count++;
			}
		}
		return count
	}

	
	ClassicGameFactory.selectCard = function(card) {
		if(card.selected) {
			card.selected = false;
		} else {
			card.selected = true;
		}
		var isInArray = false;

		for(var i = 0; i < threeSelectedCards.length; i++) {
			if (threeSelectedCards[i] === card) {
			 isInArray = true;
			} 
		}
		if(!isInArray) threeSelectedCards.push(card)

		if(threeSelectedCards.length > 2) {
			return compareThree(threeSelectedCards) 
		} 
	}

	function compareThree(arr) {
		var first = compareTwo(arr[0], arr[1]);
		var second = compareTwo(arr[1], arr[2]); 
		var third = compareTwo(arr[0], arr[2])
		if (first === second && second === third && first === third) {
			replaceCards();
			count++;	
		} 
		threeSelectedCards = [];
		arr.forEach(function(card) {
			return card.selected = false;
		})
	}

	function isMatch(arr) {
		var first = compareTwo(arr[0], arr[1]);
		var second = compareTwo(arr[1], arr[2]); 
		var third = compareTwo(arr[0], arr[2])
		if (first === second && second === third && first === third) {
			return true;	
		}
		else {
			return false
		}
	}

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

	ClassicGameFactory.returnCount = function() {
		return count;
	}

	ClassicGameFactory.returnRemainingInSet = function() {
		return fullSet.length;
	}

	ClassicGameFactory.isThereASet = function() {
		for(var i = 0; i < arrayOfTwelve.length; i++) {
			var f1 = arrayOfTwelve[i];
			for(var j = 0; j <arrayOfTwelve.length; j++) {
				var s2 = arrayOfTwelve[j];
				for(var k = 0; k <arrayOfTwelve.length; k++) {
					var t3 = arrayOfTwelve[k];
					if(isMatch([f1,s2,t3])) {
						return true;
					}
				}
			}
		}
		return false;
	}

	ClassicGameFactory.addCards = function() {
		if(!ClassicGameFactory.isThereASet()) {
			for(var i = 0; i < 3; i++) {
				arrayOfTwelve.push(fullSet.shift())
			}
		} else {
			console.log("there is a set")
		}
	}

	return ClassicGameFactory;
	
})










