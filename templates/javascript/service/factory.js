'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .factory('<%= _.camelize(name) %>', () => {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod() {
        return meaningOfLife;
      }
    };
  });
