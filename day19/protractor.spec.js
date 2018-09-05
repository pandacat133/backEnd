browser.waitForAngularEnabled(false);

describe('basic test', () => {
    it('should be on the correct page', () => {
      browser.get('http://www.google.com');
      expect(browser.getTitle()).toBe('Google');  
    });
});