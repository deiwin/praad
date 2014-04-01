'use strict';
describe('Praad App', function() {
 
  describe('Offer list view', function() {
  
    var offers;

    beforeEach(function() {
      // TODO get rid of the path, probably have to use a server
      browser.driver.get('file:///home/deiwin/workspace/praad/public/index.html');
      offers = element.all(by.repeater('offer in offers'));
    });
 
    it('should initially have 3 offers', function() {
      expect(offers.count()).toBe(3);
    });
 
    it('should filter the offer list as user types into the search box', function() {
      element(by.model('query')).sendKeys('kana');

      expect(offers.count()).toBe(1);
      var title = offers.first().findElement(by.binding('{{offer.title}}')).getText();
      expect(title).toBe('SWEET & SOUR CHICKEN');
    });
  });
});
