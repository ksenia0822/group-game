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
	var shapes = ["unchecked", "heart-empty", "off"]
	var colors = ["red", "green", "purple"];
	// var fills = ["full", "empty", "halfhalf"];
	var numbers = [1,2,3];
	var fills = [
	"url(http://forum.profantasy.com/extensions/InlineImages/image.php?AttachmentID=2877)",
	"url(http://4globetrotters.world/wp-content/uploads/2015/08/Light-Grey-Background.jpg",
	null
	]

    ClassicGameFactory.cardStyle = [];
    ClassicGameFactory.shapes = [];
    ClassicGameFactory.numbers = [];

	function createNewCard(index) {
		var newCard = new Card(getRandom(shapes), getRandom(colors), getRandom(fills), getRandom(numbers), index);
		ClassicGameFactory.cardStyle[index] = {
			"color": newCard.color,
			// "background-color": newCard.color,
			"background-image": newCard.fill
		}
		ClassicGameFactory.shapes[index] = {
			shape: newCard.shape
		}
		ClassicGameFactory.numbers[index] = {
			number: newCard.number
		}

	    return newCard;
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
		}	
	}

	function compareThree(arr) {
		var first = compareTwo(arr[0], arr[1]);
		var second = compareTwo(arr[1], arr[2]); 
		var third = compareTwo(arr[0], arr[2])
		if (first === second && second === third && first === third) {
			replaceCards(arr);
			threeCards = [];	
		}
		threeCards = [];
	}

	return ClassicGameFactory;
	
})

