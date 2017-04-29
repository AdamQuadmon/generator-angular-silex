/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;


describe('Angular generator', () => {
  var angular;

  beforeEach(done => {
    var deps = [
      '../../app',
      '../../common',
      '../../controller',
      '../../main', [
        helpers.createDummyGenerator(),
        'karma:app'
      ]
    ];
    helpers.testDirectory(path.join(__dirname, 'temp'), err => {
      if (err) {
        done(err);
      }
      angular = helpers.createGenerator('angular:app', deps);
      angular.options['skip-install'] = true;
      done();
    });
  });

  it('should generate dotfiles', done => {
    helpers.mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});

    angular.run({}, () => {
      helpers.assertFiles(['.bowerrc', '.gitignore', '.editorconfig', '.jshintrc']);
      done();
    });
  });

  it('creates expected files', done => {
    var expected = ['app/.htaccess',
                    'app/404.html',
                    'app/favicon.ico',
                    'app/robots.txt',
                    'app/styles/main.css',
                    'app/views/main.html',
                    ['.bowerrc', /"directory": "app\/components"/],
                    'Gruntfile.js',
                    'package.json',
                    ['bower.json', /"name":\s+"temp"/],
                    'app/scripts/app.js',
                    'app/index.html',
                    'app/scripts/controllers/main.js',
                    'test/spec/controllers/main.js'
                    ];
    helpers.mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});

    angular.run({}, () => {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates coffeescript files', done => {
    var expected = ['app/.htaccess',
                    'app/404.html',
                    'app/favicon.ico',
                    'app/robots.txt',
                    'app/styles/main.css',
                    'app/views/main.html',
                    ['.bowerrc', /"directory": "app\/components"/],
                    'Gruntfile.js',
                    'package.json',
                    ['bower.json', /"name":\s+"temp"/],
                    'app/scripts/app.coffee',
                    'app/index.html',
                    'app/scripts/controllers/main.coffee',
                    'test/spec/controllers/main.coffee'
                    ];
    helpers.mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});

    angular.env.options.coffee = true;
    angular.run([], () => {
      helpers.assertFiles(expected);
      done();
    });
  });

  describe('Controller', () => {
    it('should generate a new controller', done => {
      var angularCtrl;
      var deps = ['../../controller'];
      angularCtrl = helpers.createGenerator('angular:controller', deps, ['foo']);

      helpers.mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});
      angular.run([], () => {
        angularCtrl.run([], () => {
          helpers.assertFiles([
            ['app/scripts/controllers/foo.js', /controller\('FooCtrl'/],
            ['test/spec/controllers/foo.js', /describe\('Controller: FooCtrl'/]
          ]);
          done();
        });
      });
    });
  });

  describe('View', () => {
    it('should generate a new view', done => {
      var angularView;
      var deps = ['../../view'];
      angularView = helpers.createGenerator('angular:view', deps, ['foo']);

      helpers.mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});
      angular.run([], () => {
        angularView.run([], () => {
          helpers.assertFiles([
            ['app/views/foo.html']
          ]);
          done();
        });
      });
    });
  });
});
