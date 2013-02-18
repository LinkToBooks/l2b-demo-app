define(
  [
    "determineFromIPAddress"
  ],
  function (
    countryConfig
  ) {
    "use strict";

    var config = {
      country: countryConfig,
      currency: {
        id:   countryConfig.defaultCurrency,
        code: countryConfig.defaultCurrency,
        name: countryConfig.defaultCurrency
      }
    };
    
    return config;
  
  }
);