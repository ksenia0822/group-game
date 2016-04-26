'use strict'

window.app = angular.module('set', ['ui.router']);

app.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('home', {
		url: '/', 
		templateUrl: 'browser/views/home.html'
	})
	.state('classic', {
		url: '/classicset', 
		templateUrl: 'browser/views/classicset.html'
	})


})