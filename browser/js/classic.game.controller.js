app.controller('ClassicGameController', function($scope, ClassicGameFactory) {

	$scope.cards = ClassicGameFactory.createArray();

	$scope.selectCard = function(card) {
		ClassicGameFactory.selectCard(card)
	}


	$scope.count = function() {
		return ClassicGameFactory.returnCount();
	}

	$scope.remainingInSet = function() {
		return ClassicGameFactory.returnRemainingInSet();
	}

	$scope.startNewGame = function() {
		$scope.cards = ClassicGameFactory.startNewGame();
	}

	$scope.isSet = function() {
		return ClassicGameFactory.addCards();
	}

})

