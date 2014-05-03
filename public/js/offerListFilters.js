(function() {
  'use strict';
  var offerListFilters = angular.module('offerListFilters', []);

  offerListFilters.value('offerFilterState', {});

  offerListFilters.factory('doIntersect', function() {
    return function(as, bs) {
      return !!as && as.some(function(a) {
        return !!bs && bs.some(function(b) {
          return a === b;
        });
      });
    };
  });

  offerListFilters.filter('tag', ['filterFilter', 'offerFilterState', 'doIntersect',
    function(filterFilter, offerFilterState, doIntersect) {
      return function(offers) {
        return filterFilter(offers, function(offer) {
          if (offerFilterState.selectedTags && offerFilterState.selectedTags.length > 0) {
            var tagNames = offer.tags.map(function(tag){
              return tag.name
            });
            return doIntersect(offerFilterState.selectedTags, tagNames);
          }
          return true;
        });
      };
    }
  ]);

  offerListFilters.filter('search', ['filterFilter', 'offerFilterState',
    function(filterFilter, offerFilterState) {
      return function(offers) {
        return filterFilter(offers, function(offer) {
          var query = new RegExp(offerFilterState.query, 'i');

          var result = offer.title.match(query);
          result = result || offer.description.match(query);
          result = result || offer.restaurant.name.match(query);
          result = result || offer.tags.some(function(tag) {
            return tag.name.match(query);
          });
          return result;
        });
      };
    }
  ]);
})();
