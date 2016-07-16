myApp = angular.module('toastApp',['ui.bootstrap','ngAnimate']);
myApp.controller("TileController",['$scope','$http','$uibModal',function($scope, $http, $uibModal) {
    $http.get("../data/tile_data.json").then(function(tileData) {
        $scope.myTiles = tileData.data;
    });
    $scope.hideTile = function(tile) {
        tile.showTile = false;
    };

    $scope.loadPayPartial = function(tile) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pay.html',
            backdrop: 'static',
            resolve: {
                amount: function() {
                    return tile.price;
                }
            },
            controller: 'PayModalInstanceCtrl'               
        });
    };

    $scope.loadAddTilePartial = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addTile.html',
            backdrop: 'static',
            controller: 'AddTileModalInstanceCtrl'
        });    
    };
           
}]);
    
myApp.controller('PayModalInstanceCtrl',['$scope','$uibModalInstance','amount', function ($scope, $uibModalInstance, amount) {
    $scope.amount = amount;
    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

myApp.controller('AddTileModalInstanceCtrl',['$scope','$uibModalInstance', function($scope,$uibModalInstance){
    $scope.tile = [{
        "title" : '',
        "price" : '',
        "where" : '',
        "day" : {
            "su" : '',
            "mu" : '',
            "tu" : '',
            "we" : '',
            "th" : '',
            "fr" : '',
            "sa" : '' },
        "time" : ''
    }];

    $scope.submit = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);