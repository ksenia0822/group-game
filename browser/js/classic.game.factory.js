'use strict'

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
		

		for(var s = 0; s <3; s++) {
			var curShape = shapes[s];
			for(var c = 0; c < 3; c++) {
				var curColor = colors[c]
				for(var f = 0; f < 3; f++) {
					var curFill = fills[f]
					for(var n = 0; n < 3; n++) {
						var curNumber = numbers[n]
						var newCard = new Card(curShape, curColor, curFill, curNumber)
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

	
	function isSet(arr){
		var shapes = ["oval", "squiggle", "diamond"];
		var colors = ["red", "green", "purple"];
		var fills = ["striped", "empty", "solid"];
		var numbers = [1,2,3];
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
		//console.log(arr[0])
		//console.log(arr[1])
		//console.log(arr[2])
		return true;
	}

	function isGameOver(){
		if(fullSet.length===0){
			if(!ClassicGameFactory.containsSet())
				return true;
		}
		return false;
	}

	function compareThree(arr) {
		if(isSet(arr)){
			replaceCards();
			count++;
			console.log("game over?: " + isGameOver())
			//Check if game over
			//game over if deck is empty and no more sets	
		} 		
		threeSelectedCards = [];
		arr.forEach(function(card) {
			card.selected = false;
		})
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

	ClassicGameFactory.containsSet = function() {
		for(var i = 0; i < arrayOfTwelve.length; i++) {
			var f1 = arrayOfTwelve[i];
			for(var j = 0; j <arrayOfTwelve.length; j++) {
				if(j!==i){
					var s2 = arrayOfTwelve[j];
					for(var k = 0; k <arrayOfTwelve.length; k++) {
						if(!(k===i || k===j)){
							var t3 = arrayOfTwelve[k];
							//console.log("set:")
							//console.log([f1,s2,t3])
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

	ClassicGameFactory.pickSet = function() {
		for(var i = 0; i < arrayOfTwelve.length; i++) {
			var f1 = arrayOfTwelve[i];
			for(var j = 0; j <arrayOfTwelve.length; j++) {
				if(j!==i){
					var s2 = arrayOfTwelve[j];
					for(var k = 0; k <arrayOfTwelve.length; k++) {
						if(!(k===i || k===j)){
							var t3 = arrayOfTwelve[k];
							if(isSet([f1,s2,t3])) {
								f1.selected = true
								s2.selected = true
								t3.selected = true
								compareThree([f1,s2,t3])
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	ClassicGameFactory.addCards = function() {
		if(!ClassicGameFactory.containsSet()) {
			for(var i = 0; i < 3; i++) {
				if(fullSet.length > 0)
					arrayOfTwelve.push(fullSet.shift())
			}
		} else {
			console.log("there is a set")
		}
	}

	return ClassicGameFactory;
	
})










