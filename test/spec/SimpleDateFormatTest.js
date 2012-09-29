/**
 * SimpleDateFormat Test Suite
 * Since each test explains the purpose, there isn't a lot of documentation 
 * throughout the code. If there are sections unclear, please create a new issue 
 * and we'll get the documentation updated.
 *
 * Helpful testing resources:
 * method signature - simpleDateFormat: function(unformattedDate, pattern, locale)
 * supported locales -  "en_US", "es_US", "en_CA", "fr_CA", and "en_GB"
 * SimpleDateFormat Doc - https://github.com/noahcooper/SimpleDateFormatJS
 * JavaScript Date Object - https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date
 * Calendar of January 1970 - http://www.dayoftheweek.org/?m=January&d=31&y=1970&go=Go
 * Months of the year (many languages) - http://www.omniglot.com/language/time/months.htm
 * Days of the week (many languages) - http://www.omniglot.com/language/time/days.htm
 */
describe("SimpleDateFormat", function() {
  // Create a shortcut for simpleDateFormat and create our base date object
  var sdf = luminateExtend.utils.simpleDateFormat,
      dateObj = {};

  dateObj.unformatted = new Date( '1970', '00', '28', '00', '00', '00' );

  // Before each spec, initialize luminateExtend and ensure locale is null 
  beforeEach(function() {
    $(function() {
      luminateExtend.init();
    });

    luminateExtend.global.locale = null;

    expect( luminateExtend.global.locale ).toBeNull();
  });

  // Suite to validate the handling of user input
  describe( "Input", function() {
    it("should honor locale parameter", function() {
      expect( sdf(dateObj.unformatted, "M/d/yy", 'en_US') ).toBe( "1/28/70" );
    });

    it("given null time, should use now", function() {
      var now = new Date();
      var defaultSample = ([now.getMonth() + 1, now.getDate(), now.getFullYear().toString().substring(2)]).join('/');

      expect( sdf(null) ).toBe( defaultSample );
    });

    it("given pattern and locale params, pattern takes precedence", function() {
      expect( sdf(dateObj.unformatted, "M/d/yy", 'en_CA') ).not.toBe( "28/1/70" );
    });

    // TODO: https://github.com/noahcooper/luminateExtend/issues/16
    // TODO: https://github.com/noahcooper/luminateExtend/issues/17
    xit("given null pattern, should honor locale setting", function() {
      luminateExtend.global.update('locale', 'en_GB'); 

      expect( sdf(dateObj.unformatted, null) ).toBe( '28/1/70' );
    });
  });

  // General suite to very some common date formats that aren't tied to a 
  // specific locale (Not testing the language functionality)
  describe( "Non-Locale Specific", function() {
    describe( "Common Formats", function() {
      it("given pattern 'M/d/yy'", function() {
        expect( sdf(dateObj.unformatted, 'M/d/yy') ).toBe( '1/28/70' );
      });
      
      it("given pattern 'd/M/yy'", function() {
        expect( sdf(dateObj.unformatted, 'd/M/yy') ).toBe( '28/1/70' );
      });
      
      it("given pattern 'MMMM d, yyyy'", function() {
        expect( sdf(dateObj.unformatted, 'MMMM d, yyyy') ).toBe( 'January 28, 1970' );
      });
      
      it("given pattern 'EEEE, MMMM d, yyyy'", function() {
        expect( sdf(dateObj.unformatted, 'EEEE, MMMM d, yyyy') ).toBe( 'Wednesday, January 28, 1970' );
      });
      
      it("given pattern 'EEEE, MMMM d, yyyy, h:mma', should display double digit hours", function() {
        expect( sdf(dateObj.unformatted, 'EEEE, MMMM d, yyyy, h:mma') ).toBe( 'Wednesday, January 28, 1970, 12:00AM' );
      });
      
      it("given pattern 'EEEE, MMMM d, yyyy, h:mma', should display single digit hours with no leading zero", function() {
        var dateClone = new Date(dateObj.unformatted);
        dateClone.setHours('01');

        expect( sdf(dateClone, 'EEEE, MMMM d, yyyy, h:mma') ).toBe( 'Wednesday, January 28, 1970, 1:00AM' );
      });
      
      it("given pattern 'h \'o\'\'clock\''", function() {
        expect( sdf(dateObj.unformatted, 'h \'o\'\'clock\'') ).toBe( "12 o'clock" );
      });

      it("given pattern 'h+3:mm'", function() {
        expect( sdf(dateObj.unformatted, 'h+3:mm') ).toBe( '3:00' );
      });
    });
    
  });

  // 'M/d/yy' pattern specific tests
  describe( "'M/d/yy' pattern", function() {
    it( "is default pattern", function() {
      var now = new Date();
      var defaultSample = ([now.getMonth() + 1, now.getDate(), now.getFullYear().toString().substring(2)]).join('/');
      
      expect( sdf() ).toBe( defaultSample );
    });

  });

  // en_US language tests
  // Note: A new date is cloned from dateObj.unformatted and modified directly in each
  // spec. We may need to add this to the build-up / tear-down process, but isn't needed 
  // today.
  describe( "en_US", function() {
    describe("Should use the correct month names", function() {
      var enUSDateClone = new Date(dateObj.unformatted);

      it("should get January correct", function() {
        expect( sdf( enUSDateClone, 'MMMM', 'en_US') ).toBe( 'January' );
      });

      it("should get February correct", function() {
        var enUSFeb = new Date(enUSDateClone.valueOf());
        enUSFeb.setMonth(1);
        
        expect( sdf( enUSFeb, 'MMMM', 'en_US') ).toBe( 'February' );
      });

      it("should get March correct", function() {
        var enUSMarch = new Date(enUSDateClone.valueOf());
        enUSMarch.setMonth(2);

        expect( sdf( enUSMarch, 'MMMM', 'en_US') ).toBe( 'March' );
      });
      
      it("should get April correct", function() {
        var enUSApril = new Date(enUSDateClone.valueOf());
        enUSApril.setMonth(3);

        expect( sdf( enUSApril, 'MMMM', 'en_US') ).toBe( 'April' );
      });

      it("should get May correct", function() {
        var enUSMay = new Date(enUSDateClone.valueOf());
        enUSMay.setMonth(4);

        expect( sdf( enUSMay, 'MMMM', 'en_US') ).toBe( 'May' );
      });

      it("should get June correct", function() {
        var enUSJune = new Date(enUSDateClone.valueOf());
        enUSJune.setMonth(5);

        expect( sdf( enUSJune, 'MMMM', 'en_US') ).toBe( 'June' );
      });

      it("should get July correct", function() {
        var enUSJuly = new Date(enUSDateClone.valueOf());
        enUSJuly.setMonth(6);

        expect( sdf( enUSJuly, 'MMMM', 'en_US') ).toBe( 'July' );
      });

      it("should get August correct", function() {
        var enUSAugust = new Date(enUSDateClone.valueOf());
        enUSAugust.setMonth(7);

        expect( sdf( enUSAugust, 'MMMM', 'en_US') ).toBe( 'August' );
      });

      it("should get September correct", function() {
        var enUSSeptember = new Date(enUSDateClone.valueOf());
        enUSSeptember.setMonth(8);

        expect( sdf( enUSSeptember, 'MMMM', 'en_US') ).toBe( 'September' );
      });

      it("should get October correct", function() {
        var enUSOctober = new Date(enUSDateClone.valueOf());
        enUSOctober.setMonth(9);

        expect( sdf( enUSOctober, 'MMMM', 'en_US') ).toBe( 'October' );
      });

      it("should get November correct", function() {
        var enUSNovember = new Date(enUSDateClone.valueOf());
        enUSNovember.setMonth(10);

        expect( sdf( enUSNovember, 'MMMM', 'en_US') ).toBe( 'November' );
      });

      it("should get December correct", function() {
        var enUSDecember = new Date(enUSDateClone.valueOf());
        enUSDecember.setMonth(11);

        expect( sdf( enUSDecember, 'MMMM', 'en_US') ).toBe( 'December' );
      });

    });

    describe("Should use the correct day names", function() {
      var enUSDateClone = new Date(dateObj.unformatted);
      
      it("should get Sunday correct", function() {
        var enUSMonday = new Date(enUSDateClone.valueOf());
        enUSMonday.setDate(18);

        expect( sdf( enUSMonday, 'EEEE', 'en_US' ) ).toBe( 'Sunday' );
      });

      it("should get Monday correct", function() {
        var enUSMonday = new Date(enUSDateClone.valueOf());
        enUSMonday.setDate(19);

        expect( sdf( enUSMonday, 'EEEE', 'en_US' ) ).toBe( 'Monday' );
      });

      it("should get Tuesday correct", function() {
        var enUSTuesday = new Date(enUSDateClone.valueOf());
        enUSTuesday.setDate(20);

        expect( sdf( enUSTuesday, 'EEEE', 'en_US' ) ).toBe( 'Tuesday' );
      });

      it("should get Wednesday correct", function() {
        var enUSWednesday = new Date(enUSDateClone.valueOf());
        enUSWednesday.setDate(21);

        expect( sdf( enUSWednesday, 'EEEE', 'en_US' ) ).toBe( 'Wednesday' );
      });

      it("should get Thursday correct", function() {
        var enUSThursday = new Date(enUSDateClone.valueOf());
        enUSThursday.setDate(22);

        expect( sdf( enUSThursday, 'EEEE', 'en_US' ) ).toBe( 'Thursday' );
      });

      it("should get Friday correct", function() {
        var enUSFriday = new Date(enUSDateClone.valueOf());
        enUSFriday.setDate(23);

        expect( sdf( enUSFriday, 'EEEE', 'en_US' ) ).toBe( 'Friday' );
      });

      it("should get Saturday correct", function() {
        var enUSSaturday = new Date(enUSDateClone.valueOf());
        enUSSaturday.setDate(24);

        expect( sdf( enUSSaturday, 'EEEE', 'en_US' ) ).toBe( 'Saturday' );
      });

    });
  });

  // es_US language tests
  // Note: A new date is cloned from dateObj.unformatted and modified directly in each
  // spec. We may need to add this to the build-up / tear-down process, but isn't needed 
  // today.
  describe( "es_US", function() {
    describe("Should use the correct month names", function() {
      var esUSDateClone = new Date(dateObj.unformatted);

      it("should get January correct", function() {
        expect( sdf( esUSDateClone, 'MMMM', 'es_US') ).toBe( 'enero' );
      });

      it("should get February correct", function() {
        var esUSFeb = new Date(esUSDateClone.valueOf());
        esUSFeb.setMonth(1);
        
        expect( sdf( esUSFeb, 'MMMM', 'es_US') ).toBe( 'febrero' );
      });

      it("should get March correct", function() {
        var esUSMarch = new Date(esUSDateClone.valueOf());
        esUSMarch.setMonth(2);

        expect( sdf( esUSMarch, 'MMMM', 'es_US') ).toBe( 'marzo' );
      });
      
      it("should get April correct", function() {
        var esUSApril = new Date(esUSDateClone.valueOf());
        esUSApril.setMonth(3);

        expect( sdf( esUSApril, 'MMMM', 'es_US') ).toBe( 'abril' );
      });

      // TODO: https://github.com/noahcooper/luminateExtend/issues/18
      xit("should get May correct", function() {
        var esUSMay = new Date(esUSDateClone.valueOf());
        esUSMay.setMonth(4);

        expect( sdf( esUSMay, 'MMMM', 'es_US') ).toBe( 'mayo' );
      });

      it("should get June correct", function() {
        var esUSJune = new Date(esUSDateClone.valueOf());
        esUSJune.setMonth(5);

        expect( sdf( esUSJune, 'MMMM', 'es_US') ).toBe( 'junio' );
      });

      it("should get July correct", function() {
        var esUSJuly = new Date(esUSDateClone.valueOf());
        esUSJuly.setMonth(6);

        expect( sdf( esUSJuly, 'MMMM', 'es_US') ).toBe( 'julio' );
      });

      it("should get August correct", function() {
        var esUSAugust = new Date(esUSDateClone.valueOf());
        esUSAugust.setMonth(7);

        expect( sdf( esUSAugust, 'MMMM', 'es_US') ).toBe( 'agosto' );
      });

      it("should get September correct", function() {
        var esUSSeptember = new Date(esUSDateClone.valueOf());
        esUSSeptember.setMonth(8);

        expect( sdf( esUSSeptember, 'MMMM', 'es_US') ).toBe( 'septiembre' );
      });

      it("should get October correct", function() {
        var esUSOctober = new Date(esUSDateClone.valueOf());
        esUSOctober.setMonth(9);

        expect( sdf( esUSOctober, 'MMMM', 'es_US') ).toBe( 'octubre' );
      });

      it("should get November correct", function() {
        var esUSNovember = new Date(esUSDateClone.valueOf());
        esUSNovember.setMonth(10);

        expect( sdf( esUSNovember, 'MMMM', 'es_US') ).toBe( 'noviembre' );
      });

      it("should get December correct", function() {
        var esUSDecember = new Date(esUSDateClone.valueOf());
        esUSDecember.setMonth(11);

        expect( sdf( esUSDecember, 'MMMM', 'es_US') ).toBe( 'diciembre' );
      });

    });

    describe("Should use the correct day names", function() {
      var esUSDateClone = new Date(dateObj.unformatted);
      
      it("should get Sunday correct", function() {
        var esUSMonday = new Date(esUSDateClone.valueOf());
        esUSMonday.setDate(18);

        expect( sdf( esUSMonday, 'EEEE', 'es_US' ) ).toBe( 'domingo' );
      });

      it("should get Monday correct", function() {
        var esUSMonday = new Date(esUSDateClone.valueOf());
        esUSMonday.setDate(19);

        expect( sdf( esUSMonday, 'EEEE', 'es_US' ) ).toBe( 'lunes' );
      });

      it("should get Tuesday correct", function() {
        var esUSTuesday = new Date(esUSDateClone.valueOf());
        esUSTuesday.setDate(20);

        expect( sdf( esUSTuesday, 'EEEE', 'es_US' ) ).toBe( 'martes' );
      });

      it("should get Wednesday correct", function() {
        var esUSWednesday = new Date(esUSDateClone.valueOf());
        esUSWednesday.setDate(21);

        expect( sdf( esUSWednesday, 'EEEE', 'es_US' ) ).toBe( 'mi&eacute;rcoles' );
      });

      it("should get Thursday correct", function() {
        var esUSThursday = new Date(esUSDateClone.valueOf());
        esUSThursday.setDate(22);

        expect( sdf( esUSThursday, 'EEEE', 'es_US' ) ).toBe( 'jueves' );
      });

      it("should get Friday correct", function() {
        var esUSFriday = new Date(esUSDateClone.valueOf());
        esUSFriday.setDate(23);

        expect( sdf( esUSFriday, 'EEEE', 'es_US' ) ).toBe( 'viernes' );
      });

      it("should get Saturday correct", function() {
        var esUSSaturday = new Date(esUSDateClone.valueOf());
        esUSSaturday.setDate(24);

        expect( sdf( esUSSaturday, 'EEEE', 'es_US' ) ).toBe( 's&aacute;bado' );
      });
    });
  });

  // fr_CA language tests
  // Note: A new date is cloned from dateObj.unformatted and modified directly in each
  // spec. We may need to add this to the build-up / tear-down process, but isn't needed 
  // today.
  describe( "fr_CA", function() {
    describe("Should use the correct month names", function() {
      var frCADateClone = new Date(dateObj.unformatted);

      it("should get January correct", function() {
        expect( sdf( frCADateClone, 'MMMM', 'fr_CA') ).toBe( 'janvier' );
      });

      it("should get February correct", function() {
        var frCAFeb = new Date(frCADateClone.valueOf());
        frCAFeb.setMonth(1);
        
        expect( sdf( frCAFeb, 'MMMM', 'fr_CA') ).toBe( 'f&#233;vrier' );
      });

      it("should get March correct", function() {
        var frCAMarch = new Date(frCADateClone.valueOf());
        frCAMarch.setMonth(2);

        expect( sdf( frCAMarch, 'MMMM', 'fr_CA') ).toBe( 'mars' );
      });
      
      it("should get April correct", function() {
        var frCAApril = new Date(frCADateClone.valueOf());
        frCAApril.setMonth(3);

        expect( sdf( frCAApril, 'MMMM', 'fr_CA') ).toBe( 'avril' );
      });

      // TODO: https://github.com/noahcooper/luminateExtend/issues/18
      xit("should get May correct", function() {
        var frCAMay = new Date(frCADateClone.valueOf());
        frCAMay.setMonth(4);

        expect( sdf( frCAMay, 'MMMM', 'fr_CA') ).toBe( 'mai' );
      });

      it("should get June correct", function() {
        var frCAJune = new Date(frCADateClone.valueOf());
        frCAJune.setMonth(5);

        expect( sdf( frCAJune, 'MMMM', 'fr_CA') ).toBe( 'juin' );
      });

      it("should get July correct", function() {
        var frCAJuly = new Date(frCADateClone.valueOf());
        frCAJuly.setMonth(6);

        expect( sdf( frCAJuly, 'MMMM', 'fr_CA') ).toBe( 'juillet' );
      });

      it("should get August correct", function() {
        var frCAAugust = new Date(frCADateClone.valueOf());
        frCAAugust.setMonth(7);

        expect( sdf( frCAAugust, 'MMMM', 'fr_CA') ).toBe( 'ao&#251;t' );
      });

      it("should get September correct", function() {
        var frCASeptember = new Date(frCADateClone.valueOf());
        frCASeptember.setMonth(8);

        expect( sdf( frCASeptember, 'MMMM', 'fr_CA') ).toBe( 'septembre' );
      });

      it("should get October correct", function() {
        var frCAOctober = new Date(frCADateClone.valueOf());
        frCAOctober.setMonth(9);

        expect( sdf( frCAOctober, 'MMMM', 'fr_CA') ).toBe( 'octobre' );
      });

      it("should get November correct", function() {
        var frCANovember = new Date(frCADateClone.valueOf());
        frCANovember.setMonth(10);

        expect( sdf( frCANovember, 'MMMM', 'fr_CA') ).toBe( 'novembre' );
      });

      it("should get December correct", function() {
        var frCADecember = new Date(frCADateClone.valueOf());
        frCADecember.setMonth(11);

        expect( sdf( frCADecember, 'MMMM', 'fr_CA') ).toBe( 'd&#233;cembre' );
      });

    });

    describe("Should use the correct day names", function() {
      var frCADateClone = new Date(dateObj.unformatted);
      
      it("should get Sunday correct", function() {
        var frCAMonday = new Date(frCADateClone.valueOf());
        frCAMonday.setDate(18);

        expect( sdf( frCAMonday, 'EEEE', 'fr_CA' ) ).toBe( 'dimanche' );
      });

      it("should get Monday correct", function() {
        var frCAMonday = new Date(frCADateClone.valueOf());
        frCAMonday.setDate(19);

        expect( sdf( frCAMonday, 'EEEE', 'fr_CA' ) ).toBe( 'lundi' );
      });

      it("should get Tuesday correct", function() {
        var frCATuesday = new Date(frCADateClone.valueOf());
        frCATuesday.setDate(20);

        expect( sdf( frCATuesday, 'EEEE', 'fr_CA' ) ).toBe( 'mardi' );
      });

      it("should get Wednesday correct", function() {
        var frCAWednesday = new Date(frCADateClone.valueOf());
        frCAWednesday.setDate(21);

        expect( sdf( frCAWednesday, 'EEEE', 'fr_CA' ) ).toBe( 'mercredi' );
      });

      it("should get Thursday correct", function() {
        var frCAThursday = new Date(frCADateClone.valueOf());
        frCAThursday.setDate(22);

        expect( sdf( frCAThursday, 'EEEE', 'fr_CA' ) ).toBe( 'jeudi' );
      });

      it("should get Friday correct", function() {
        var frCAFriday = new Date(frCADateClone.valueOf());
        frCAFriday.setDate(23);

        expect( sdf( frCAFriday, 'EEEE', 'fr_CA' ) ).toBe( 'vendredi' );
      });

      it("should get Saturday correct", function() {
        var frCASaturday = new Date(frCADateClone.valueOf());
        frCASaturday.setDate(24);

        expect( sdf( frCASaturday, 'EEEE', 'fr_CA' ) ).toBe( 'samedi' );
      });
    });
  });

});