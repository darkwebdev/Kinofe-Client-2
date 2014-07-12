//'use strict';

//var reqjs = require('requirejs');

require.config({
    baseUrl: '../js',
    paths: {
        module: function() { return { exports: null }},
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        mocha: '../node_modules/mocha/mocha',
        chai: '../node_modules/chai/chai',
        sinonChai: '../node_modules/sinon-chai/lib/sinon-chai',
        sinon: '../node_modules/sinon/pkg/sinon',
        text: '../bower_components/requirejs-text/text',
        json: '../node_modules/json2/lib/JSON2/static/json2',
        jsonMarkup: '../node_modules/json-markup/index'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        common: {
            deps: ['marionette']
        },
        mocha: {
            exports: 'mocha'
        },
        chai: {
            exports: 'chai'
        },
        sinonChai: {
            exports: 'sinonChai'
        },
        sinon: {
            exports: 'sinon'
        },
        json: {
            exports: 'json'
        },
        jsonMarkup: {
            exports: 'jsonMarkup'
        }
    }
});

require([ 'backbone', 'marionette', 'mocha', 'chai', 'sinonChai', 'sinon', 'json', 'jsonMarkup' ],
    function(Backbone, Marionette, mocha, chai, sinonChai, sinon, JSON, jsonMarkup) {
        assert = chai.assert;
//        should = chai.should();
        expect = chai.expect;
        chai.use(sinonChai);

        mocha.setup('bdd');
        mocha.bail(false); //continue on fail

        require([ 'app.js', 'models.js', 'controllers.js', 'views.js', 'routers.js' ], function() {
    //    mocha.setup({ globals: ['hasCert'] });
            if (window.mochaPhantomJS) {
                mochaPhantomJS.run();
            }
            else {
                mocha.reporter('html');
                mocha.run();
            }
        });
    }
);
