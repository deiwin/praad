(function(){
  'use strict';
  var offerListControllers = angular.module('offerListControllers', [
    'ngResource',
    'offerListFilters',
    'offerListSorters'
    ]);

  offerListControllers.controller('OfferListCtrl', ['$scope', '$resource', function ($scope, $resource) {
    $scope.offers = $resource('offers/offers.json').query();
  }]);

  offerListControllers.controller('TagListCtrl', ['$scope', 'offerFilterState', '$resource',
    function ($scope, offerFilterState, $resource) {
      $scope.tagList = $resource('offers/tags.json').query();

      $scope.$watch('tagList', function (tagList){
        offerFilterState.selectedTags = [];
        tagList.forEach(function (tag){
          if (tag.selected){
            offerFilterState.selectedTags.push(tag.id);
          }
        });
      }, true);
    }
    ]);

  offerListControllers.controller('SearchCtrl', ['$scope', 'offerFilterState', function ($scope, offerFilterState) {
    $scope.$watch('query', function (query){
      offerFilterState.query = query;
    }, true);
  }]);
})();
