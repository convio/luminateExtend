test('luminateExtend.global.update() can update one property', function() {
  luminateExtend.global.update('apiKey', 'abcdefg');
  ok(luminateExtend.global.apiKey === 'abcdefg');
});

test('luminateExtend.global.update() can update multiple properties', function() {
  luminateExtend.global.update({
    apiKey: 'hijklmnop', 
    customVar: 'foo'
  });
  ok(luminateExtend.global.apiKey === 'hijklmnop' && luminateExtend.global.customVar === 'foo');
});

test('luminateExtend.global.locale accepts "en_US"', function() {
  luminateExtend.global.update('locale', 'en_US');
  ok(luminateExtend.global.locale === 'en_US');
});

test('luminateExtend.global.locale accepts "es_US"', function() {
  luminateExtend.global.update('locale', 'es_US');
  ok(luminateExtend.global.locale === 'es_US');
});

test('luminateExtend.global.locale accepts "en_CA"', function() {
  luminateExtend.global.update('locale', 'en_CA');
  ok(luminateExtend.global.locale === 'en_CA');
});

test('luminateExtend.global.locale accepts "fr_CA"', function() {
  luminateExtend.global.update('locale', 'fr_CA');
  ok(luminateExtend.global.locale === 'fr_CA');
});

test('luminateExtend.global.locale accepts "en_GB"', function() {
  luminateExtend.global.update('locale', 'en_GB');
  ok(luminateExtend.global.locale === 'en_GB');
});

test('luminateExtend.global.locale accepts "en_AU"', function() {
  luminateExtend.global.update('locale', 'en_AU');
  ok(luminateExtend.global.locale === 'en_AU');
});

test('luminateExtend.global.locale defaults to "en_US" when unrecognized value is provided', function() {
  luminateExtend.global.update('locale', 'foo');
  ok(luminateExtend.global.locale === 'en_US');
});