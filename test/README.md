luminateExtend.js - Tests
=========================

Test suites built using [QUnit](http://qunitjs.com/).

Running the tests
-----------------

If you haven't already done so, you'll need to follow the [basic setup instructions](https://github.com/noahcooper/luminateExtend#libSetup) 
for using luminateExtend.js.

Once you've completed setup, download the HTML and JavaScript files found here to your desktop. You'll need to make a change to one of these files.

At the very top of [setup.js](https://raw.github.com/noahcooper/luminateExtend/master/tests/js/setup.js), you'll need to change the API Key and the non-secure and secure paths for your organization:

```js
luminateExtend({
  apiKey: '123456789', 
  path: {
    nonsecure: 'http://shortname.convio.net/site/', 
    secure: 'https://secure2.convio.net/shortname/site/'
  }
});
```

You'll also need to change the test Survey ID to the ID of any published Survey on your organization's Luminate Online site. This Survey ID is used in the luminateExtend.api test suite.

```js
var apiTestSurveyId = '1';
```

After you've made these changes, you can upload the files to a server of your choosing and begin testing.

API tests
---------

Some of the API tests require an active, logged in session to succeed. Before running the API tests, make sure you first navigate to the login page on your organization's Luminate Online site and login as a constituent.