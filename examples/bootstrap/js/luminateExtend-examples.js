(function($) {
  /* define init variables for your organization */
  luminateExtend({
    apiKey: '123456789', 
    path: {
      nonsecure: 'http://shortname.convio.net/site/', 
      secure: 'https://secure2.convio.net/shortname/site/'
    }
  });
  
  $(function() {
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
    
    /* UI handlers for the donation form example */
    if($('.donation-form').length > 0) {
      $('input[name="level_id"]').click(function() {
        if($(this).is('#level-other')) {
          $('#other-amount').removeAttr('disabled');
          $('#other-amount').attr('name', 'other_amount');
          $('#other-amount').focus();
        }
        else {
          $('#other-amount').attr('disabled', 'disabled');
          $('#other-amount').removeAttr('name');
        }
      });
      
      $('.donation-form').submit(function() {
        window.scrollTo(0, 0);
        $(this).hide();
        $(this).before('<div class="well donation-loading">' + 
                         'Loading ...' + 
                       '</div>');
      });
    }
    
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
    
    /* UI handlers for the Survey example */
    if($('.survey-form').length > 0) {
      $('.survey-form').submit(function() {
        window.scrollTo(0, 0);
        $(this).hide();
        $(this).before('<div class="well survey-loading">' + 
                         'Loading ...' + 
                       '</div>');
      });
    }
    
    /* example: handle the Survey form submission */
    /* if the Survey is submitted succesfully, display a thank you message */
    /* if there is an error, display it inline */
    window.submitSurveyCallback = {
      error: function(data) {
        $('#survey-errors').remove();
        $('.survey-form .form-group .alert').remove();
        
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
        $('.survey-form .form-group .survey-alert-wrap').remove();
        
        if(data.submitSurveyResponse.success == 'false') {
          $('.survey-form').prepend('<div id="survey-errors">' + 
                                      '<div class="alert alert-danger">' + 
                                        'There was an error with your submission. Please try again.' + 
                                      '</div>' + 
                                    '</div>');
          
          var surveyErrors = luminateExtend.utils.ensureArray(data.submitSurveyResponse.errors);
          $.each(surveyErrors, function() {
            if(this.errorField) {
              $('input[name="' + this.errorField + '"]').closest('.form-group')
                                                        .prepend('<div class="col-sm-12 survey-alert-wrap">' + 
                                                                   '<div class="alert alert-danger">' + 
                                                                     this.errorMessage + 
                                                                   '</div>' + 
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
    
    /* bind any forms with the "luminateApi" class */
    luminateExtend.api.bind();
  });
})(jQuery);