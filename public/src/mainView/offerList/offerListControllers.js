(function() {
  'use strict';
  var module = angular.module('offerListControllers', [
    'ngResource',
    'offerListFilters',
    'offerListSorters',
    'favorites',
    'sourceSelection',
  ]);

  module.controller('OfferListCtrl', ['$scope', '$resource', 'favorites',
    function($scope, $resource, favorites) {
      $scope.loadOffersForRegion = function(region) {
        $scope.region = region;
        $scope.offers = $resource('api/v1/regions/'+region+'/offers').query({}, function success() {
          updateFavorites();
        });
      };
      $scope.loadOffersNearLocation = function(lat, lng) {
        delete $scope.region;
        $scope.offers = $resource('api/v1/offers').query({
          lat: lat,
          lng: lng,
        }, function success() {
          updateFavorites();
        });
      };
      $scope.toggleFavorite = function(restaurantName) {
        favorites.toggleInclusion(restaurantName);
        updateFavorites();
      };
      $scope.getLatLng = function(offer) {
        // offer.restaurant.location is a GeoJSON object. This means coordinates
        // is an array of [lng,lat]
        var coords = offer.restaurant.location.coordinates;
        var lng = coords[0];
        var lat = coords[1];
        return lat+","+lng;
      };
      function updateFavorites() {
        favorites.decorateOffers($scope.offers);
        var favoriteOffers = $scope.offers.filter(function(offer) {
          return offer.isFavorite;
        });
        var otherOffers = $scope.offers.filter(function(offer) {
          return !offer.isFavorite;
        });
        $scope.offersGroupedByIsFavorite = [];
        if (favoriteOffers.length > 0) {
          $scope.offersGroupedByIsFavorite.push(favoriteOffers);
        }
        if (otherOffers.length > 0) {
          $scope.offersGroupedByIsFavorite.push(otherOffers);
        }
      }
    }
  ]);

  module.controller('TagListCtrl', ['$scope', 'offerFilterState', '$resource',
    function($scope, offerFilterState, $resource) {
      $scope.tagList = $resource('api/v1/tags').query();

      $scope.$watch('tagList', function(tagList) {
        offerFilterState.selectedTags = [];
        tagList.forEach(function(tag) {
          if (tag.selected) {
            offerFilterState.selectedTags.push(tag.name);
          }
        });
      }, true);
    }
  ]);

  module.controller('SearchCtrl', ['$scope', 'offerFilterState',
    function($scope, offerFilterState) {
      $scope.$watch('query', function(query) {
        offerFilterState.query = query;
      }, true);
    }
  ]);
})();
