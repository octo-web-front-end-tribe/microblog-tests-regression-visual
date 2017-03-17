var phantomcss = require('phantomcss');
var phantomcssRunner = require('../phantomcssRunner.js');

phantomcssRunner.init();

//Homepage
casper.then(function(){
    //Wait for SPA to load everything
    this.wait(1000, function() {
        phantomcss.screenshot('body', 'homepage');    
    });
});
//Login
casper.then(function(){
    this.fillSelectors('form.login-form__form', {
    	'input.login-form__username': 'piou-piou'
    }, true);
    phantomcss.screenshot('body', 'login_user_messages');
});
//Write message
casper.then(function(){
    this.sendKeys('.message-input__content', 'We are the best team ever!', {keepFocus: true});
    this.sendKeys('.message-input__content', casper.page.event.key.Enter , {keepFocus: true});
    phantomcss.screenshot('body', 'user_add_new_messages');
});
//Logout
casper.then(function(){
    this.click('.navigation-bar__link--logout');
    phantomcss.screenshot('body', 'logout_homepage');
});

phantomcssRunner.end();