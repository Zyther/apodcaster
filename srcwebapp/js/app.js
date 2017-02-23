/**
 * Created by alecg on 2/22/2017.
 */
var theApp = angular.module('apodcaster', ['ui.router']);

theApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

});


