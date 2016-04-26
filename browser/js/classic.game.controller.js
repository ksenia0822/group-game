app.controller('ClassicGameController', function($scope, ClassicGameFactory) {

	$scope.cards = ClassicGameFactory.createArray();

	$scope.currentCard;

	$scope.selectCard = function(card) {
		ClassicGameFactory.selectCard(card)
	}

	$scope.cardStyle = function(index) {
		return ClassicGameFactory.cardStyle[index];
	}

	$scope.shape = function(index) {
		return ClassicGameFactory.shapes[index].shape;
	}

	$scope.number = function(index) {
		return ClassicGameFactory.numbers[index].number;
	}

	$scope.qty = function(index) {
		var num = $scope.number(index)
		var arr = []
		for (var i = 0; i < num; i++) {
			arr.push(i)
		}
		return arr;
		// return new Array(num);
	}

})