test('luminateExtend.utils.ensureArray() returns an array when a single object is provided', function() {
  var fooBarArray = luminateExtend.utils.ensureArray({"foo": "bar"});
  ok($.isArray(fooBarArray) && 
     fooBarArray.length === 1 && 
     fooBarArray[0].foo === 'bar');
});

test('luminateExtend.utils.ensureArray() returns an array when an array is provided', function() {
  var fooBarArray = luminateExtend.utils.ensureArray([{"foo": "bar"}, {"foo": "barTwo"}]);
  ok($.isArray(fooBarArray) && 
     fooBarArray.length === 2 && 
     fooBarArray[0].foo === 'bar' && 
     fooBarArray[1].foo === 'barTwo');
});

test('luminateExtend.utils.ensureArray() returns an empty array when undefined is provided', function() {
  var fooBar, 
  fooBarArray = luminateExtend.utils.ensureArray(fooBar);
  ok($.isArray(fooBarArray) && 
     fooBarArray.length === 0);
});

var unformattedDate = new Date('1970', '00', '28', '00', '00', '00');

test('luminateExtend.utils.simpleDateFormat() defaults to "M/d/yy" when luminateExtend.global.locale is undefined', function() {
  delete luminateExtend.global.locale;
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '1/28/70');
});

test('luminateExtend.utils.simpleDateFormat() overrides default when pattern is provided', function() {
  delete luminateExtend.global.locale;
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate, 'MMMM d, yyyy');
  ok(formattedDate === 'January 28, 1970');
});

test('luminateExtend.utils.simpleDateFormat() defaults to "M/d/yy" when luminateExtend.global.locale is "en_US"', function() {
  luminateExtend.global.update('locale', 'en_US');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '1/28/70');
});

test('luminateExtend.utils.simpleDateFormat() accepts pattern "EEEE, MMMM d, yyyy"', function() {
  luminateExtend.global.update('locale', 'en_US');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate, 'EEEE, MMMM d, yyyy');
  ok(formattedDate === 'Wednesday, January 28, 1970');
});

test('luminateExtend.utils.simpleDateFormat() accepts pattern "EEEE, MMMM d, yyyy, h:mma"', function() {
  luminateExtend.global.update('locale', 'en_US');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate, 'EEEE, MMMM d, yyyy, h:mma');
  ok(formattedDate === 'Wednesday, January 28, 1970, 12:00AM');
});

test('luminateExtend.utils.simpleDateFormat() accepts pattern "h \'o\'\'clock\'"', function() {
  luminateExtend.global.update('locale', 'en_US');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate, 'h \'o\'\'clock\'');
  ok(formattedDate === '12 o\'clock');
});

test('luminateExtend.utils.simpleDateFormat() accepts pattern "h+3:mm"', function() {
  luminateExtend.global.update('locale', 'en_US');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate, 'h+3:mm');
  ok(formattedDate === '3:00');
});

test('luminateExtend.utils.simpleDateFormat() defaults to "M/d/yy" when luminateExtend.global.locale is "es_US"', function() {
  luminateExtend.global.update('locale', 'es_US');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '1/28/70');
});

test('luminateExtend.utils.simpleDateFormat() returns Spanish month names when luminateExtend.global.locale is "es_US"', function() {
  luminateExtend.global.update('locale', 'es_US');
  var unformattedDateClone = new Date('1970', '00', '28', '00', '00', '00'), 
  formattedMonth1 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(1);
  var formattedMonth2 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(2);
  var formattedMonth3 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(3);
  var formattedMonth4 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(4);
  var formattedMonth5 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(5);
  var formattedMonth6 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(6);
  var formattedMonth7 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(7);
  var formattedMonth8 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(8);
  var formattedMonth9 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(9);
  var formattedMonth10 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(10);
  var formattedMonth11 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(11);
  var formattedMonth12 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  ok(formattedMonth1 === 'enero' && 
     formattedMonth2 === 'febrero' && 
     formattedMonth3 === 'marzo' && 
     formattedMonth4 === 'abril' && 
     formattedMonth5 === 'mayo' && 
     formattedMonth6 === 'junio' && 
     formattedMonth7 === 'julio' && 
     formattedMonth8 === 'agosto' && 
     formattedMonth9 === 'septiembre' && 
     formattedMonth10 === 'octubre' && 
     formattedMonth11 === 'noviembre' && 
     formattedMonth12 === 'diciembre');
});

test('luminateExtend.utils.simpleDateFormat() returns Spanish day names when luminateExtend.global.locale is "es_US"', function() {
  luminateExtend.global.update('locale', 'es_US');
  var unformattedDateClone = new Date('1970', '00', '25', '00', '00', '00'), 
  formattedDay1 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('26');
  var formattedDay2 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('27');
  var formattedDay3 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('28');
  var formattedDay4 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('29');
  var formattedDay5 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('30');
  var formattedDay6 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('31');
  var formattedDay7 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  ok(formattedDay1 === 'domingo' && 
     formattedDay2 === 'lunes' && 
     formattedDay3 === 'martes' && 
     formattedDay4 === 'mi&eacute;rcoles' && 
     formattedDay5 === 'jueves' && 
     formattedDay6 === 'viernes' && 
     formattedDay7 === 's&aacute;bado');
});

test('luminateExtend.utils.simpleDateFormat() defaults to "d/M/yy" when luminateExtend.global.locale is "en_CA"', function() {
  luminateExtend.global.update('locale', 'en_CA');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '28/1/70');
});

test('luminateExtend.utils.simpleDateFormat() defaults to "d/M/yy" when luminateExtend.global.locale is "fr_CA"', function() {
  luminateExtend.global.update('locale', 'fr_CA');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '28/1/70');
});

test('luminateExtend.utils.simpleDateFormat() returns French month names when luminateExtend.global.locale is "fr_CA"', function() {
  luminateExtend.global.update('locale', 'fr_CA');
  var unformattedDateClone = new Date('1970', '00', '28', '00', '00', '00'), 
  formattedMonth1 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(1);
  var formattedMonth2 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(2);
  var formattedMonth3 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(3);
  var formattedMonth4 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(4);
  var formattedMonth5 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(5);
  var formattedMonth6 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(6);
  var formattedMonth7 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(7);
  var formattedMonth8 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(8);
  var formattedMonth9 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(9);
  var formattedMonth10 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(10);
  var formattedMonth11 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  unformattedDateClone.setMonth(11);
  var formattedMonth12 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'MMMM');
  ok(formattedMonth1 === 'janvier' && 
     formattedMonth2 === 'f&#233;vrier' && 
     formattedMonth3 === 'mars' && 
     formattedMonth4 === 'avril' && 
     formattedMonth5 === 'mai' && 
     formattedMonth6 === 'juin' && 
     formattedMonth7 === 'juillet' && 
     formattedMonth8 === 'ao&#251;t' && 
     formattedMonth9 === 'septembre' && 
     formattedMonth10 === 'octobre' && 
     formattedMonth11 === 'novembre' && 
     formattedMonth12 === 'd&#233;cembre');
});

test('luminateExtend.utils.simpleDateFormat() returns French day names when luminateExtend.global.locale is "fr_CA"', function() {
  luminateExtend.global.update('locale', 'fr_CA');
  var unformattedDateClone = new Date('1970', '00', '25', '00', '00', '00'), 
  formattedDay1 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('26');
  var formattedDay2 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('27');
  var formattedDay3 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('28');
  var formattedDay4 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('29');
  var formattedDay5 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('30');
  var formattedDay6 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  unformattedDateClone.setDate('31');
  var formattedDay7 = luminateExtend.utils.simpleDateFormat(unformattedDateClone, 'EEEE');
  ok(formattedDay1 === 'dimanche' && 
     formattedDay2 === 'lundi' && 
     formattedDay3 === 'mardi' && 
     formattedDay4 === 'mercredi' && 
     formattedDay5 === 'jeudi' && 
     formattedDay6 === 'vendredi' && 
     formattedDay7 === 'samedi');
});

test('luminateExtend.utils.simpleDateFormat() defaults to "d/M/yy" when luminateExtend.global.locale is "en_GB"', function() {
  luminateExtend.global.update('locale', 'en_GB');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '28/1/70');
});

test('luminateExtend.utils.simpleDateFormat() defaults to "d/M/yy" when luminateExtend.global.locale is "en_AU"', function() {
  luminateExtend.global.update('locale', 'en_AU');
  var formattedDate = luminateExtend.utils.simpleDateFormat(unformattedDate);
  ok(formattedDate === '28/1/70');
});