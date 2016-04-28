'use strict'

app.factory('ClassicGameFactory', function() {
	var ClassicGameFactory = {};

	function Card(shape, color, fill, number, index) {
		this.shape = shape;
		this.color = color;
		this.fill = fill;
		this.number = number;
		this.index = index;
	}

	function getRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)]
	}

	var arrayOfCards = [];
	var threeSelectedCards = [];
	var storage = {
		shapes: ["oval", "squiggle", "diamond"],
		colors: ["red", "green", "purple"],
		fills: ["striped", "empty", "solid"],
		numbers: [1,2,3]
	};

	ClassicGameFactory.count = 0;

	function createNewCard(index) {
		return new Card(getRandom(storage.shapes), 
						getRandom(storage.colors), 
						getRandom(storage.fills), 
						getRandom(storage.numbers), 
						index
						);
	}

	ClassicGameFactory.createArray = function() {
		for (var i = 0; i < 12; i++) {
			arrayOfCards.push(createNewCard(i))
		}
		return arrayOfCards;
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
		threeSelectedCards.push(card)
		if(threeSelectedCards.length > 2) {
			return compareThree(threeSelectedCards) 
		} 
	}

	function replaceCards(arr) {
		for(var i = 0; i < 2; i++) {
			var newCard = createNewCard(arr[i].index)
			arrayOfCards[arr[i].index] = newCard;
		}	
	}

	function compareThree(arr) {
		var first = compareTwo(arr[0], arr[1]);
		var second = compareTwo(arr[1], arr[2]); 
		var third = compareTwo(arr[0], arr[2])
		if (first === second && second === third && first === third) {
			replaceCards(arr);
			threeSelectedCards = [];
			ClassicGameFactory.count++;	
		}
		threeSelectedCards = [];
	}

	ClassicGameFactory.returnCount = function() {
		return ClassicGameFactory.count;
	}


	return ClassicGameFactory;
	
})









