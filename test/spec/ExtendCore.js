describe("Extend Core", function() {
  var config, version = '1.3';

  beforeEach(function() {
    $(function() {
      config = {
        apiKey: '123456789', 
        path: {
          nonsecure: 'http://www.myorganization.com/site/', 
          secure: 'https://secure2.convio.net/myorg/site/'
        }
      }

      luminateExtend(config);
    });
  });

  describe("Static Methods", function() {
    it("should have a version", function() {
      expect(luminateExtend.library.version).toEqual(version);
    });

    it("can update global setting", function() {
      var updatedAPIKey = '987654321';

      luminateExtend.global.update('apiKey', updatedAPIKey); 

      expect(luminateExtend.global.apiKey).toEqual(updatedAPIKey);
    });
  });

});

