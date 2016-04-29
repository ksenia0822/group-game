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

	function getRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)]
	}
	var threeSelectedCards = [];

	ClassicGameFactory.count = 0;

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
	return set;
}

	var fullSet = createFullSet();
	var arrayOfTwelve = [];

	ClassicGameFactory.createArray = function() {
		arrayOfTwelve = [];
		for (var i = 0; i < 12; i++) {
			if(fullSet.length) {
				arrayOfTwelve.push(fullSet.shift());
			} else {
				console.log('game over')				
			}
		}
		ClassicGameFactory.count = 0;
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
			replaceCards(arrayOfTwelve);
			ClassicGameFactory.count++;	
		}
		threeSelectedCards = [];
		arr.forEach(function(card) {
			return card.selected = false;
		})
	}

	// function replaceCards(arr) {
	// 	for(var i = 0; i < 3; i++) {
	// 		var card = arr[i]
	// 		var newCard = fullSet.shift();
	// 		arrayOfTwelve[card.index] = newCard;
	// 	}	
	// }

	function replaceCards(arr) {
		return arrayOfTwelve.forEach(function(card) {
			if(card.selected) {
				card = fullSet.shift();
				console.log(card)
			}
		})
		return arr;
	}

	ClassicGameFactory.returnCount = function() {
		return ClassicGameFactory.count;
	}

	ClassicGameFactory.returnRemainingInSet = function() {
		return fullSet.length;
	}

	return ClassicGameFactory;
	
})

	// var arrayOfCards = [];

	// var storage = {
	// 	shapes: ["oval", "squiggle", "diamond"],
	// 	colors: ["red", "green", "purple"],
	// 	fills: ["striped", "empty", "solid"],
	// 	numbers: [1,2,3]
	// };

	// function createNewCard(index) {
	// 	return new Card(getRandom(storage.shapes), 
	// 					getRandom(storage.colors), 
	// 					getRandom(storage.fills), 
	// 					getRandom(storage.numbers), 
	// 					index
	// 					);
	// }
	// ClassicGameFactory.createArray = function() {
	// 	arrayOfCards = [];
	// 	for (var i = 0; i < 12; i++) {
	// 		arrayOfCards.push(createNewCard(i))
	// 	}
	// 	return arrayOfCards;
	// }








