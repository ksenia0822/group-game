app.controller('ClassicGameController', function($scope, ClassicGameFactory) {

	$scope.cards = ClassicGameFactory.createArray();

	$scope.selectCard = function(card) {
		ClassicGameFactory.selectCard(card)
	}

	$scope.count = function() {
		return ClassicGameFactory.returnCount();
	}

	$scope.startNewGame = function() {
		// $scope.cards = [];
		$scope.cards = ClassicGameFactory.createArray();
	}

})

