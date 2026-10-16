asyncTest('luminateExtend.api.getAuth() defines luminateExtend.global.auth.type and luminateExtend.global.auth.token', function() {
  luminateExtend.api.getAuth({
    callback: function() {
      var auth = luminateExtend.global.auth;
      
      ok(auth.type === 'auth' && 
         auth.token);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "addressbook" shorthand', function() {
  luminateExtend.api.request({
    api: 'addressbook', 
    data: 'method=getAddressBookContacts&list_page_size=1', 
    requiresAuth: true, 
    useHTTPS: true, 
    callback: function(response) {
      ok(response.getAddressBookContactsResponse, 
         'You must be logged in as a constituent for this test to succeed.');
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "advocacy" shorthand', function() {
  luminateExtend.api.request({
    api: 'advocacy', 
    data: 'method=getAdvocacyAlerts&list_page_size=1', 
    callback: function(response) {
      ok(response.getAdvocacyAlertsResponse);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "cons" shorthand', function() {
  luminateExtend.api.request({
    api: 'cons', 
    data: 'method=listUserFields', 
    callback: function(response) {
      ok(response.listConsFieldsResponse);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "content" shorthand', function() {
  luminateExtend.api.request({
    api: 'content', 
    data: 'method=listLinks&provider_id=42&list_page_size=1', 
    callback: function(response) {
      ok(response.listLinksResponse);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "donation" shorthand', function() {
  luminateExtend.api.request({
    api: 'donation', 
    data: 'method=getDesignationTypes', 
    callback: function(response) {
      ok(response.getDesignationTypesResponse);
      start();
    }
  });
});

var today = new Date();
asyncTest('luminateExtend.api.request() allows "orgevent" shorthand', function() {
  luminateExtend.api.request({
    api: 'orgevent', 
    data: 'method=getMonthEvents&month=' + (today.getMonth() + 1) + '&year=' + today.getFullYear(), 
    callback: function(response) {
      ok(response.getMonthEventsResponse);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "recurring" shorthand', function() {
  luminateExtend.api.request({
    api: 'recurring', 
    data: 'method=getRecurringGifts', 
    requiresAuth: true, 
    callback: function(response) {
      ok(response.getRecurringGiftsResponse, 
         'You must be logged in as a constituent for this test to succeed.');
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "survey" shorthand', function() {
  luminateExtend.api.request({
    api: 'survey', 
    data: 'method=listSurveys&list_page_size=1', 
    callback: function(response) {
      ok(response.listSurveysResponse);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() allows "teamraiser" shorthand', function() {
  luminateExtend.api.request({
    api: 'teamraiser', 
    data: 'method=getTeamraisersByInfo&name=%25&list_page_size=1', 
    callback: function(response) {
      ok(response.getTeamraisersResponse);
      start();
    }
  });
});

if(apiTestSurveyId) {
  asyncTest('luminateExtend.api.request() can call API methods which requires authentication but not a logged in user', function() {
    luminateExtend.api.request({
      api: 'survey', 
      data: 'method=getSurvey&survey_id=' + apiTestSurveyId, 
      requiresAuth: true, 
      callback: function(response) {
        ok(response.getSurveyResponse);
        start();
      }
    });
  });
}

asyncTest('luminateExtend.api.request() can get info on logged in user', function() {
  luminateExtend.api.request({
    api: 'cons', 
    data: 'method=getUser', 
    requiresAuth: true, 
    callback: function(response) {
      ok(response.getConsResponse, 
         'You must be logged in as a constituent for this test to succeed.');
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() can filter using equal statement', function() {
  luminateExtend.api.request({
    api: 'cons', 
    data: 'method=listUserFields', 
    responseFilter: {
      array: 'listConsFieldsResponse.field', 
      filter: 'required == true'
    }, 
    callback: function(response) {
      var fields = luminateExtend.utils.ensureArray(response.listConsFieldsResponse.field), 
      nonRequiredFields = [];
      $.each(fields, function() {
        if(this.required == 'false') {
          nonRequiredFields.push(this);
        }
      });
      ok(nonRequiredFields.length === 0);
      start();
    }
  });
});

asyncTest('luminateExtend.api.request() can filter using not equal statement', function() {
  luminateExtend.api.request({
    api: 'cons', 
    data: 'method=listUserFields', 
    responseFilter: {
      array: 'listConsFieldsResponse.field', 
      filter: 'required != false'
    }, 
    callback: function(response) {
      var fields = luminateExtend.utils.ensureArray(response.listConsFieldsResponse.field), 
      nonRequiredFields = [];
      $.each(fields, function() {
        if(this.required == 'false') {
          nonRequiredFields.push(this);
        }
      });
      ok(nonRequiredFields.length === 0);
      start();
    }
  });
});

test('luminateExtend.api.request() can make multiple requests asynchronously', function() {
  stop(2);
  
  luminateExtend.api.request([{
    api: 'cons', 
    data: 'method=listUserFields', 
    requiresAuth: true, 
    callback: function(response) {
      ok(response.listConsFieldsResponse);
      start();
    }
  }, {
    api: 'cons', 
    data: 'method=listUserFieldChoices&field=primary_address.state', 
    requiresAuth: true, 
    callback: function(response) {
      ok(response.listConsFieldChoicesResponse);
      start();
    }
  }]);
});

var listConsFieldsResponse;
test('luminateExtend.api.request() can make multiple requests synchronously', function() {
  stop(2);
  
  luminateExtend.api.request([{
    api: 'cons', 
    data: 'method=listUserFields', 
    requiresAuth: true, 
    callback: function(response) {
      listConsFieldsResponse = response.listConsFieldsResponse;
      ok(listConsFieldsResponse);
      start();
    }
  }, {
    async: false, 
    api: 'cons', 
    data: 'method=listUserFieldChoices&field=primary_address.state', 
    requiresAuth: true, 
    callback: function(response) {
      ok(listConsFieldsResponse && 
         response.listConsFieldChoicesResponse);
      start();
    }
  }]);
});
var getRequestUrl = function(requestOptions) {
  var originalAjax = $.ajax, 
  requestUrl;
  $.ajax = function(ajaxOptions) {
    requestUrl = ajaxOptions.url;
  };
  try {
    luminateExtend.api.request(requestOptions);
  }
  finally {
    $.ajax = originalAjax;
  }
  return requestUrl;
};

test('luminateExtend.api.request() uses HTTPS by default', function() {
  ok(getRequestUrl({
    api: 'cons', 
    data: 'method=listUserFields'
  }).indexOf(luminateExtend.global.path.secure + 'CRConsAPI') === 0);
});

test('luminateExtend.api.request() uses HTTPS by default for CRConnectAPI', function() {
  ok(getRequestUrl({
    api: 'connect', 
    data: 'method=getContacts'
  }).indexOf('https://') === 0);
});

test('luminateExtend.api.request() uses the nonsecure path when useHTTPS is false', function() {
  ok(getRequestUrl({
    api: 'cons', 
    data: 'method=listUserFields', 
    useHTTPS: false
  }).indexOf(luminateExtend.global.path.nonsecure.replace(/^https?:\/\//, 'http://') + 'CRConsAPI') === 0);
});

test('luminateExtend.api.request() always uses HTTPS for CRDonationAPI', function() {
  ok(getRequestUrl({
    api: 'donation', 
    data: 'method=getDonationFormInfo&form_id=1', 
    useHTTPS: false
  }).indexOf(luminateExtend.global.path.secure + 'CRDonationAPI') === 0);
});
