myApp = angular.module('toastApp',['ui.bootstrap','ngAnimate']);
myApp.controller("TileController",['$scope','$rootScope','$http','$uibModal',function($scope,$rootScope,$http, $uibModal) {
    $scope.user = 'admin';
    $http.get("../data/tile_data.json").then(function(tileData) {
        $scope.myTiles = tileData.data;
    });
    $scope.hideTile = function(tile) {
        tile.showTile = false;
    };

    $rootScope.$on('addTileEvent', function(event,tile){
        console.log(tile);
        var day = '';
        if (tile.day.su) { day = day + 'Su'; }
        if (tile.day.mo) { 
            if(day != '') { day = day + ', Mo'; }
            else {day = day + 'Mo'} 
        }
        if (tile.day.tu) { 
            if(day != '') { day = day + ', Tu'; }
            else {day = day + 'Tu'} 
        }
        if (tile.day.we) { 
            if(day != '') { day = day + ', We'; }
            else {day = day + 'We'} 
        }
        if (tile.day.th) { 
            if(day != '') { day = day + ', Th'; }
            else {day = day + 'Th'} 
        }
        if (tile.day.fr) { 
            if(day != '') { day = day + ', Fr'; }
            else {day = day + 'Fr'} 
        }
        if (tile.day.sa) { 
            if(day != '') { day = day + ', Sa'; }
            else {day = day + 'Sa'} 
        }
        $scope.myTiles.push({"title":tile.title,"price":'$'+tile.price, "where":tile.where,"day":day,"time":tile.time,"showTile":"true","owner":tile.owner});
    });

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
            resolve: {
                owner: function() {
                    return $scope.user;
                }
            },
            controller: 'AddTileModalInstanceCtrl'
        });    
    };
           
}]);
    
myApp.controller('PayModalInstanceCtrl',['$scope','$uibModalInstance', 'amount', function ($scope, $uibModalInstance, amount) {
    $scope.amount = amount;
    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

myApp.controller('AddTileModalInstanceCtrl',['$scope','$rootScope','$uibModalInstance','owner', function($scope,$rootScope,$uibModalInstance, owner){
    $scope.newTile = {
        "title" : null,
        "price" : null,
        "where" : null,
        "day" : {
            "su" : null,
            "mu" : null,
            "tu" : null,
            "we" : null,
            "th" : null,
            "fr" : null,
            "sa" : null },
        "time" : null,
        "owner" : owner
    };

    $scope.$watch('newTile',function(){
        $scope.disableSubmit = checkDisableSubmit();
    },true);

    var checkDisableSubmit = function() {
        var disable = false;
        var dayCount = 7;
        ($scope.newTile.title == null) ? disable = true : null; 
        ($scope.newTile.price == null) ? disable = true : null;
        ($scope.newTile.where == null) ? disable = true : null; 
        ($scope.newTile.time == null) ? disable = true : null;
        ($scope.newTile.day.su == true) ? dayCount++ : dayCount--;
        ($scope.newTile.day.mo == true) ? dayCount++ : dayCount--;
        ($scope.newTile.day.tu == true) ? dayCount++ : dayCount--;
        ($scope.newTile.day.we == true) ? dayCount++ : dayCount--;
        ($scope.newTile.day.th == true) ? dayCount++ : dayCount--; 
        ($scope.newTile.day.fr == true) ? dayCount++ : dayCount--;
        ($scope.newTile.day.sa == true) ? dayCount++ : dayCount--;
        (dayCount == 0) ? disable = true : null;
        return disable;
    };

    $scope.submit = function () {
        $rootScope.$emit('addTileEvent',$scope.newTile);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);