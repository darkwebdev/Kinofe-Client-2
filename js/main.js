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
        'controllers/movie-list', 'controllers/movie-details', 'controllers/person-details', 'controllers/user-details'
    ], function(Backbone, Marionette, app, vent,
        MovieListController, MovieDetailsController, PersonDetailsController, UserDetailsController
    ) {

        app.addInitializer(function() {

            // Movie list

            var router = new Marionette.AppRouter({
                controller: new MovieListController({
                    region: app.movieListRegion,
                    vent: vent
                }),
                appRoutes: {
                    'movie/:id': 'selectMovie'
                }
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
