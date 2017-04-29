'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .provider('<%= _.camelize(name) %>', function () {

    // Private variables
    var salutation = 'Hello';

    // Private constructor
    function Greeter() {
      this.greet = () => salutation;
    }

    // Public API for configuration
    this.setSalutation = s => {
      salutation = s;
    };

    // Method for instantiating
    this.$get = () => new Greeter();
  });
