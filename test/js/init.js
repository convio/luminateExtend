test('luminateExtend is defined once library is included', function() {
  ok(luminateExtend);
});

luminateExtend({
  apiKey: '123456789', 
  path: {
    nonsecure: 'http://shortname.convio.net/site/', 
    secure: 'https://secure2.convio.net/shortname/site/'
  }, 
  custom: {
    myCallback: function() {}
  }
});

test('luminateExtend.global.apiKey is correct following init', function() {
  ok(luminateExtend.global.apiKey === '123456789');
});

test('luminateExtend.global.path.nonsecure is correct following init', function() {
  ok(luminateExtend.global.path.nonsecure === 'http://shortname.convio.net/site/');
});

test('luminateExtend.global.path.secure is correct following init', function() {
  ok(luminateExtend.global.path.secure === 'https://secure2.convio.net/shortname/site/');
});

test('luminateExtend.global.custom.myCallback is correct following init', function() {
  ok($.type(luminateExtend.global.custom.myCallback) === 'function');
});

test('luminateExtend.global.apiCommon defaults to empty object', function() {
  ok($.isEmptyObject(luminateExtend.global.apiCommon));
});

test('luminateExtend.global.auth.type defaults to "auth"', function() {
  ok(luminateExtend.global.auth.type === 'auth');
});

test('luminateExtend.global.auth.token defaults to undefined', function() {
  ok(!luminateExtend.global.auth.token);
});

test('luminateExtend.global.locale is defaults to undefined', function() {
  ok(!luminateExtend.global.locale);
});