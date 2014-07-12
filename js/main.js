require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        handlebars: '../bower_components/handlebars/handlebars'
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
        }
    }
});

require(['backbone', 'marionette', 'app', 'vent',
        'controllers/movie-list', 'controllers/movie-details', 'controllers/person-details'
    ], function(Backbone, Marionette, app, vent,
        MovieListController, MovieDetailsController, PersonDetailsController
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

        });

        // Start

        app.start();

    }
);
