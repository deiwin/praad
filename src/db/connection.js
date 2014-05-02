module.exports = (function() {
  'use strict';
  var mongoose = require('mongoose');

  return {
    offers: (function() {
      var Offer = mongoose.model('Offer');

      return {
        get: function(callback) {
          Offer
          .find({})
          .exec(callback);
        }
      };
    })()
  };
})();
