let webdriver = require('selenium-webdriver');

let driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).build();

describe('basic test', () => {
    it('should be on the correct page', done => {
        driver.get('http://www.google.com');
        driver.getTitle().then(title => {
            expect(title).toBe('Google');
            done();
        })
    })
});