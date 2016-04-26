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
	// var shapes =["diamond", "oval", "snake"];
	var shapes = ["unchecked", "heart-empty", "off"]
	var colors = ["red", "green", "purple"];
	var fills = ["full", "empty", "halfhalf"];
	var numbers = [1,2,3];

    ClassicGameFactory.cardStyle = [];
    ClassicGameFactory.shapes = [];
    ClassicGameFactory.numbers = [];

	function createNewCard(index) {
		var newCard = new Card(getRandom(shapes), getRandom(colors), getRandom(fills), getRandom(numbers), index);

			return newCard;
	}



	ClassicGameFactory.createArray = function() {
		for (var i = 0; i < 12; i++) {
			var newCard = new Card(getRandom(shapes), getRandom(colors), getRandom(fills), getRandom(numbers), i);
			arrayOfCards.push(newCard)
			ClassicGameFactory.cardStyle[i] = {
				"color": newCard.color
			}
			ClassicGameFactory.shapes[i] = {
				shape: newCard.shape
			}
			ClassicGameFactory.numbers[i] = {
				number: newCard.number
			}
		}

		return arrayOfCards;
	}


	function compareTwo(obj1, obj2) {
		var count = 0;
		for (var i in obj1) {
			if (obj1[i] !== obj2[i]) {
				console.log(obj1[i], obj2[i])
				count++;
			}
		}
		return count
	}

	var threeCards = [];

	ClassicGameFactory.selectCard = function(card) {
		threeCards.push(card)
		console.log(threeCards)
		if(threeCards.length > 2) {
			return compareThree(threeCards) 
		} 
	}

	function replaceCards(arr) {
		for(var i = 0; i < 2; i++) {
			var newCard = createNewCard(arr[i].index)
			arrayOfCards[arr[i].index] = newCard;
			ClassicGameFactory.cardStyle[arr[i].index] = {
				"color": newCard.color
			}
			ClassicGameFactory.shapes[arr[i].index] = {
				shape: newCard.shape
			}
			ClassicGameFactory.numbers[arr[i].index] = {
				number: newCard.number
			}
		}	
	}

	function compareThree(arr) {
		var first = compareTwo(arr[0], arr[1]);
		var second = compareTwo(arr[1], arr[2]); 
		var third = compareTwo(arr[0], arr[2])
		console.log(first, second, third)
		if (first === second && second === third && first === third) {
			replaceCards(arr);
			threeCards = [];	
		}
		threeCards = [];
	}

	return ClassicGameFactory;
	
})

