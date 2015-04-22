luminateExtend.js - Bootstrap Examples
======================================

These examples show how luminateExtend.js can be used to build a website with [Bootstrap 3](http://getbootstrap.com).

Getting started with the example website
----------------------------------------

If you haven't already done so, you'll need to follow the [basic setup instructions](https://github.com/noahcooper/luminateExtend#libSetup) 
for using luminateExtend.js.

Once you've completed setup, download the HTML and JavaScript files found here to your desktop. You'll need to make a few small tweaks to these files, and then you can upload them to a server of your choosing.

[luminateExtend-examples.js](https://raw.github.com/noahcooper/luminateExtend/master/examples/bootstrap/js/luminateExtend-examples.js) is where all the magic happens. At the very top of this file, you'll need to change the API Key and the non-secure and secure paths for your organization:

```js
/* define init variables for your organization */
luminateExtend({
  apiKey: '123456789', 
  path: {
    nonsecure: 'http://shortname.convio.net/site/', 
    secure: 'https://secure2.convio.net/shortname/site/'
  }
});
```

This is the only change you should need to make to this file. Each of the HTML files detailed below will require additional changes.

Login / Welcome back
--------------------

At the top right of each page on the example site, users are either presented with a login form, or if they are already logged in, a "Welcome back" message and the option to log out.

You'll need to edit the login form within each HTML file to change the login form's action to use your organization's domain:

```html
<form class="navbar-form navbar-right luminateApi hide" id="login-form" method="POST" action="http://shortname.convio.net/site/CRConsAPI" data-luminateApi='{"callback": "loginCallback"}'>
  <input type="hidden" name="method" value="login">
  <div class="form-group">
    <input type="text" class="form-control" id="login-username" name="user_name" placeholder="Username">
  </div>
  <div class="form-group">
    <input type="password" class="form-control" id="login-password" name="password" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-success">Login</button>
</form>
```

On each page load, the [loginTest](http://open.convio.com/api/#single_sign_on_api.loginTest_method.html) API method is used to check if the user is currently logged in. If this API method does not return an error, then the user is logged in.

```js
/* example: check if the user is logged in onload */
/* if they are logged in, call the getUser function above to display the "welcome back" message */
/* if they are not logged in, show the login form */
var loginTestCallback = {
  success: function() {
    getUser();
  }, 
  error: function() {
    $('#login-form').removeClass('hide');
  }
};
luminateExtend.api({
  api: 'cons', 
  callback: loginTestCallback, 
  data: 'method=loginTest'
});
```

If the user is logged in, the getUser function is called to display a message like "Welcome back, Jane!" in place of the login form.

```js
/* example: get information on the currently logged in user, and display a "welcome back" message in the site's header */
window.getUser = function() {
  var getUserCallback = function(data) {
    if(data.getConsResponse && data.getConsResponse.name) {
      $('#login-form').replaceWith('<p class="navbar-text pull-right" id="welcome-back">' + 
                                   'Welcome back' + ((data.getConsResponse.name.first) ? (', ' + data.getConsResponse.name.first) : '') + '! ' + 
                                   '<a href="' + luminateExtend.global.path.nonsecure + 'UserLogin?logout=&NEXTURL=' + encodeURIComponent(window.location.href) + '">Logout</a>' + 
                                   '</p>');
    }
  };
  luminateExtend.api({
    api: 'cons', 
    callback: getUserCallback, 
    data: 'method=getUser', 
    requiresAuth: true
  });
};
```

If the user is not logged in, they will be presented with the login form. Reading the HTML for the login form above, you'll note that the form tag has a callback defined for handling the API response, loginCallback. If the username and password provided by the user are correct, the getUser function is called to display the "Welcome back" message. If the credentials are not correct, a modal is displayed with the specific error message that was returned.

```js
/* example: handle the login form in the site's header */
/* if the user is logged in successfully, call the getUser function above to display the "welcome back" message */
/* if the user is not logged in, display the error message returned by the API in a modal */
window.loginCallback = {
  error: function(data) {
    if($('#login-error-modal').length == 0) {
      $('body').append('<div class="modal fade" id="login-error-modal">' + 
                         '<div class="modal-dialog">' + 
                           '<div class="modal-content">' + 
                             '<div class="modal-header">' + 
                               '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                               '<h4 class="modal-title">Error</h4>' + 
                             '</div>' + 
                             '<div class="modal-body">' + 
                               '<p>' + data.errorResponse.message + '</p>' + 
                             '</div>' + 
                             '<div class="modal-footer">' + 
                               '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' + 
                             '</div>' + 
                           '</div>' + 
                         '</div>' + 
                       '</div>');
    }
    else {
      $('#login-error-modal .modal-body p').html(data.errorResponse.message);
    }
    $('#login-error-modal').modal('show');
  }, 
  success: function(data) {
    getUser();
  }
};
```

Donation form
-------------

[donate.html](https://raw.github.com/noahcooper/luminateExtend/master/examples/bootstrap/donate.html) contains a minimalistic donation form which uses the [donate](http://open.convio.com/api/#donation_api.donate_method.html) API method to process gifts. In this example, the form's donation levels and fields are hardcoded in the page's HTML. A more robust version of this form would use the [getDonationFormInfo](http://open.convio.com/api/#donation_api.getDonationFormInfo_method.html) API method to dynamically build these fields onload.

To use the donation form, you'll first need to edit the donation form's action to use your organization's domain:

```html
<form class="form-horizontal luminateApi donation-form" method="POST" action="https://secure2.convio.net/shortname/site/CRDonationAPI" data-luminateApi='{"callback": "donateCallback"}'>
```

You'll also need to edit the donation form ID to use the appropriate shadow form:

```html
<input type="hidden" name="form_id" value="1234">
```

Finally, you'll need to edit the HTML for the donation levels to use the correct IDs and dollar amounts. As noted above, when building out a real form, you'll likely want to use the API to dynamically generate this HTML instead.

```html
<div class="radio">
  <label>
    <input type="radio" name="level_id" value="13162"> $100
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="level_id" value="13164"> $50
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="level_id" value="13161"> $20
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" id="level-other" name="level_id" value="13163"> Other amount:
  </label>
</div>
```

Reading the HTML for the donation form above, you'll note that the form tag has a callback defined for handling the API response, donateCallback. If the donation is successfully processed, a thank you message is shown to the donor in place of the form. If one or more errors are returned, they are displayed above the form. For your form, you may wish to slightly modify this code to, for example, highlight all fields that are in error in red.

```js
/* example: handle the donation form submission */
/* if the donation is successful, display a thank you message */
/* if there is an error with the donation, display it inline */
window.donateCallback = {
  error: function(data) {
    $('#donation-errors').remove();
    
    $('.donation-form').prepend('<div id="donation-errors">' + 
                                  '<div class="alert alert-danger">' + 
                                    data.errorResponse.message + 
                                  '</div>' + 
                                '</div>');
    
    $('.donation-loading').remove();
    $('.donation-form').show();
  }, 
  success: function(data) {
    $('#donation-errors').remove();
    
    if(data.donationResponse.errors) {
      $('.donation-form').prepend('<div id="donation-errors">' + 
                                    ((data.donationResponse.errors.message) ? ('<div class="alert alert-danger">' + 
                                      data.donationResponse.errors.message + 
                                    '</div>') : '') + 
                                  '</div>');
      
      if(data.donationResponse.errors.fieldError) {
        var fieldErrors = luminateExtend.utils.ensureArray(data.donationResponse.errors.fieldError);
        $.each(fieldErrors, function() {
          $('#donation-errors').append('<div class="alert alert-danger">' + 
                                         this + 
                                       '</div>');
        });
      }
      
      $('.donation-loading').remove();
      $('.donation-form').show();
    }
    else {
      $('.donation-loading').remove();
      $('.donation-form').before('<div class="alert alert-success">' + 
                                   'Your donation has been processed!' + 
                                 '</div>' + 
                                 '<div class="well">' + 
                                   '<p>Thank you for your donation of $' + data.donationResponse.donation.amount.decimal + '.</p>' + 
                                   '<p>Your confirmation code is ' + data.donationResponse.donation.confirmation_code + '.</p>' + 
                                 '</div>');
    }
  }
};
```

Newsletter sign-up form
-----------------------

[sign-up.html](https://raw.github.com/noahcooper/luminateExtend/master/examples/bootstrap/sign-up.html) is a typical newsletter sign-up form which collects users' names and email addresses using a Luminate Online Survey and the [submitSurvey](http://open.convio.com/api/#survey_api.submitSurvey_method.html) API method.

To use the sign-up form, you'll first need to edit the form's action to use your organization's domain:

```html
<form class="form-horizontal luminateApi survey-form" method="POST" action="http://shortname.convio.net/site/CRSurveyAPI" data-luminateApi='{"callback": "submitSurveyCallback", "requiresAuth": "true"}'>
```

You'll also need to edit the Survey ID to use the appropriate Survey from your organization's site:

```html
<input type="hidden" name="survey_id" value="1234">
```

Reading the HTML for the sign-up form above, you'll note that the form tag has a callback defined for handling the API response, submitSurveyCallback. If the Survey is submitted without error, a thank you message is shown to the user in place of the form. If one or more errors are returned, they are displayed above the form.

```js
/* example: handle the Survey form submission */
/* if the Survey is submitted succesfully, display a thank you message */
/* if there is an error, display it inline */
window.submitSurveyCallback = {
  error: function(data) {
    $('#survey-errors').remove();
    $('.survey-form .control-rows .alert').remove();
    
    $('.survey-form').prepend('<div id="survey-errors">' + 
                                '<div class="alert alert-danger">' + 
                                  data.errorResponse.message + 
                                '</div>' + 
                              '</div>');
    
    $('.survey-loading').remove();
    $('.survey-form').show();
  }, 
  success: function(data) {
    $('#survey-errors').remove();
    $('.survey-form .controls-row .alert').remove();
    
    if(data.submitSurveyResponse.success == 'false') {
      $('.survey-form').prepend('<div id="survey-errors">' + 
                                  '<div class="alert alert-danger">' + 
                                    'There was an error with your submission. Please try again.' + 
                                  '</div>' + 
                                '</div>');
      
      var surveyErrors = luminateExtend.utils.ensureArray(data.submitSurveyResponse.errors);
      $.each(surveyErrors, function() {
        if(this.errorField) {
          $('input[name="' + this.errorField + '"]').closest('.controls-row').prepend('<div class="alert alert-danger">' + 
                                                                                        this.errorMessage + 
                                                                                      '</div>');
        }
      });
      
      $('.survey-loading').remove();
      $('.survey-form').show();
    }
    else {
      $('.survey-loading').remove();
      $('.survey-form').before('<div class="alert alert-success">' + 
                                 'You\'ve been signed up!' + 
                               '</div>' + 
                               '<div class="well">' + 
                                 '<p>Thanks for joining. You should receive your first issue of the e-newsletter shortly.</p>' + 
                               '</div>');
    }
  }
};
```

Action alert list
-----------------

[action-center.html](https://raw.github.com/noahcooper/luminateExtend/master/examples/bootstrap/action-center.html) is a page that allows users to see a list of active action alerts for your organization, with a link to the alert and a counter showing how many people have taken action to-date. This example could be further extended to allow for the alerts to be taken via API as well using the [takeAction](http://open.convio.com/api/#advocacy_api.takeAction_method.html) method.

The getAdvocacyAlerts function builds the list of alerts using the [getAdvocacyAlerts](http://open.convio.com/api/#advocacy_api.getAdvocacyAlerts_method.html) API method.

```js
/* example: display a list of action alerts for the organization in the specified container */
window.getAdvocacyAlerts = function(selector) {
  var getAdvocacyAlertsCallback = function(data) {
    $(selector).html('');
    
    var alertList = luminateExtend.utils.ensureArray(data.getAdvocacyAlertsResponse.alert);
    $.each(alertList, function() {
      $(selector).append('<div class="action-alert-row">' + 
                           '<p><a href="' + this.url + '"><strong>' + this.title + '</strong></a><br>' + 
                           this.description + '<br>' + 
                           ((this.interactionCount == '0') ? 'No actions taken so far. Be the first to respond!' : ('<strong>' + this.interactionCount + '</strong> actions taken so far.')) + 
                           '</p>' + 
                           '<p><a class="btn btn-primary" href="' + this.url + '">Take Action</a></p>' + 
                         '</div>');
    });
  };
  
  luminateExtend.api({
    api: 'advocacy', 
    callback: getAdvocacyAlertsCallback, 
    data: 'method=getAdvocacyAlerts&alert_status=active&alert_type=action'
  });
};
```

Within the HTML for the action center, the getAdvocacyAlerts function is called and passed the selector where the alert list is to be placed.

```js
$(function() {
  getAdvocacyAlerts('#action-alert-list');
});
```

TeamRaiser ZIP Code radius search
---------------------------------

[walk-for-health.html](https://raw.github.com/noahcooper/luminateExtend/master/examples/bootstrap/walk-for-health.html) lets users search for TeamRaiser events in their local area using the [getTeamraisersByDistance](http://open.convio.com/api/#teamraiser_api.getTeamraisersByDistance_method.html) API method. Each event in the search results includes basic information such as the event name and date, as well as links to form or join a team.

To use the event search form, you'll need to edit the form's action to use your organization's domain:

```html
<form class="form-inline luminateApi teamraiser-event-search-form" method="POST" action="https://secure2.convio.net/shortname/site/CRTeamraiserAPI" data-luminateApi='{"callback": "getTeamraisersByDistanceCallback"}'>
```

Reading the HTML for the search form above, you'll note that the form tag has a callback defined for handling the API response, getTeamraisersByDistanceCallback. If one or more events is returned for the ZIP Code provided, they are displayed below the form. If an error is returned, e.g. because no events match the search criteria, the error message is displayed above the form.

```js
/* example: handle the TeamRaiser ZIP Code radius form */
/* if one or more TeamRaisers are returned, display them */
/* if an error is returned, display it above the form */
window.getTeamraisersByDistanceCallback = {
  error: function(data) {
    $('#teamraiser-event-search-errors').remove();
    $('#teamraiser-event-search-results').html('');
    
    $('.teamraiser-event-search-form').prepend('<div id="teamraiser-event-search-errors">' + 
                                                 '<div class="alert alert-danger">' + 
                                                   data.errorResponse.message + 
                                                 '</div>' + 
                                               '</div>');
  }, 
  success: function(data) {
    $('#teamraiser-event-search-errors').remove();
    $('#teamraiser-event-search-results').html('');
    
    if(data.getTeamraisersResponse.totalNumberResults == 0) {
      $('.teamraiser-event-search-form').prepend('<div id="teamraiser-event-search-errors">' + 
                                                   '<div class="alert alert-danger">' + 
                                                     'No events found. Please try another search.' + 
                                                   '</div>' + 
                                                 '</div>');
    }
    else {
      $('#teamraiser-event-search-results').html('<div class="well"></div>');
      var teamraiserList = luminateExtend.utils.ensureArray(data.getTeamraisersResponse.teamraiser);
      $.each(teamraiserList, function() {
        $('#teamraiser-event-search-results .well').append('<div class="teamraiser-event-search-row">' + 
                                                             '<p><a href="' + this.greeting_url + '"><strong>' + this.name + '</strong></a><br>' + 
                                                             luminateExtend.utils.simpleDateFormat(this.event_date, 'MMMM d, yyyy') + '</p>' + 
                                                             '<p><a class="btn btn-primary" href="' + this.reg_new_team_url + '">Form a Team</a> ' + 
                                                             '<a class="btn btn-primary" href="' + this.reg_join_team_url + '">Join a Team</a> ' + 
                                                           '</div>');
      });
    }
  }
};
```