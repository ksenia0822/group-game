function Card(shape, color, fill, number) {
	this.shape = shape;
	this.color = color;
	this.fill = fill;
	this.number = number;
}

function getRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function createArray() {
	var arrayOfCards = [];
	var shapes =["diamond", "oval", "snake"];
	var colors = ["red", "green", "purple"];
	var fills = ["full", "empty", "halfhalf"];
	var numbers = [1,2,3];
	for (var i = 0; i < 100; i++) {
		var newCard = new Card(getRandom(shapes), getRandom(colors), getRandom(fills), getRandom(numbers));
		arrayOfCards.push(newCard)
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

function compareThree(obj1, obj2, obj3) {
	var first = compareTwo(obj1, obj2);
	var second = compareTwo(obj2, obj3); 
	var third = compareTwo(obj1, obj3)
	if (first === second && second === third && first === third) {
		return true;
	}
	return false;
}