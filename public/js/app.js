(function(){
var myApp = angular.module('toastApp',[])
    .controller("TileController",['$scope','$http', function($scope, $http) {
        $http.get("../data/tile_data.json").then(function(tileData) {
            $scope.myTiles = tileData.data;
        });
        $scope.hideTile = function(tile) {
            tile.showTile = false;
        };
    }]);
})();