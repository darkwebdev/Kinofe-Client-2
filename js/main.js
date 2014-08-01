require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../node_modules/lodash/dist/lodash',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/requirejs-text/text'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require(['backbone', 'marionette', 'app', 'vent',
        'controllers/movie-list', 'controllers/movie-details', 'controllers/person-details', 'controllers/user-details', 'controllers/header'
    ], function(Backbone, Marionette, app, vent,
        MovieListController, MovieDetailsController, PersonDetailsController, UserDetailsController, HeaderController
    ) {

        app.addInitializer(function() {

            // Header

            var headerController = new HeaderController({
                region: app.headerRegion,
                vent: vent
            });

            headerController.show('Best Movies');

            // Movie list

            var movieListController = new MovieListController({
                region: app.movieListRegion,
                vent: vent
            });

            var router = new Marionette.AppRouter({
                controller: movieListController,
                appRoutes: {
                    'movie/:id': 'selectMovie',
                    'janre/:name': 'selectJanre'
                }
            });

            vent.on('janre:selected', function(janre) {
                movieListController.show(janre);
                console.log('vent on janre:selected', janre);
                headerController.showJanre(janre);
            });

            // Movie details

            var movieDetailsController = new MovieDetailsController({
                region: app.detailsRegion,
                vent: vent,
                router: router
            });

            vent.on('movie:selected', function(id) {
                console.log('vent:movie:selected', id);
                movieDetailsController.show(id);
            });

            // Person details

            var personDetailsController = new PersonDetailsController({
                region: app.detailsRegion,
                vent: vent,
                router: router
            });

            new Marionette.AppRouter({
                controller: personDetailsController,
                appRoutes: {
                    'person/:id': 'show'
                }
            });

            vent.on('person:selected', function(id) {
                console.log('vent:person:selected', id);
                personDetailsController.show(id);
            });

            // User details

            var userDetailsController = new UserDetailsController({
                region: app.userRegion,
                vent: vent,
                router: router
            });

            vent.on('user:requested', function() {
                console.log('vent:user:requested');
                userDetailsController.show();
            });
            vent.on('movie:hidden', function(id) {
                console.log('vent:movie:hidden', id);
                userDetailsController.ignoreMovie(id);
            });
            vent.on('janre:hidden', function(name) {
                console.log('vent on janre:hidden', name);
                userDetailsController.ignoreJanre(name);
            });
            vent.on('movie:watchlisted', function(id) {
                console.log('vent:movie:watchlisted', id);
                userDetailsController.toggleWatchlistedMovie(id);
            });

            userDetailsController.show();

        });

        // Start

        app.start();

    }
);
