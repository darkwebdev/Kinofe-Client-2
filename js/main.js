require.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/lodash/dist/lodash',
        backbone: '../node_modules/backbone/backbone',
//        backbone: '../bower_components/backbone/backbone',
//        marionette: '../node_modules/backbone.marionette/lib/core/backbone.marionette', // no wreqr, no babysitter
        marionette: '../node_modules/backbone.marionette/lib/backbone.marionette',
        'backbone.radio': '../node_modules/backbone.radio/build/backbone.radio',
        handlebars: '../node_modules/handlebars/dist/handlebars',
        text: '../node_modules/text/text'
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

require(['backbone', 'radio', 'config', 'app',
        'controllers/movie-list', 'controllers/movie-details', 'controllers/person-details', 'controllers/user', 'controllers/nav'
    ], function(Backbone, radio, config, app,
        MovieListController, MovieDetailsController, PersonDetailsController, UserController, NavController
    ) {

        app.addInitializer(function() {

            // Navigation

            var navController = new NavController({
                region: app.headerRegion,
                user: config.user
            });

            navController.show();

            new Backbone.Marionette.AppRouter({
                controller: navController,
                appRoutes: app.routes
            });

            // User details

            var userDetailsController = new UserController({
                region: app.userRegion,
                user: config.user
            });

            userDetailsController.show();

            // Releases list

            var releasesController = new MovieListController({
                region: app.movieListRegion,
                autoUrl: app.getRoute('releases')
            });

            // Watchlist

            var watchlistController = new MovieListController({
                region: app.movieListRegion,
                autoUrl: app.getRoute('watchlist'),
                watchlistUserId: config.user.id
            });

            // Ignorelist

            var ignorelistController = new MovieListController({
                region: app.movieListRegion,
                ignorelistUserId: config.user.id
            });

            // Movie details

            var movieDetailsController = new MovieDetailsController({
                region: app.detailsRegion
            });

            // Person details

            var personDetailsController = new PersonDetailsController({
                region: app.detailsRegion
            });

            // Dispatcher

            radio
                .on({
                    'movie:hidden': userDetailsController.ignoreMovie,
                    'movie:restored': userDetailsController.restoreMovie,
                    'janre:hidden': userDetailsController.ignoreJanre,
                    'janre:restored': userDetailsController.restoreJanre,
                    'movie:watchlisted': userDetailsController.toggleWatchlistedMovie
                })
                .comply({
                    //'home:show': navController.showHome,
                    'releases:show': releasesController.show,
                    'ignorelist:show': ignorelistController.show,
                    'watchlist:show': watchlistController.show,
                    //'watchlist:update': watchlistController.update,
                    'movie:show': movieDetailsController.show,
                    'person:show': personDetailsController.show,
                    'user:show': userDetailsController.show
                })
                .reply({
                    'user:getDetails': function() {
                        //return userDetailsController.getDetails();
                    }
                })
            ;

            // Start

            Backbone.history.start({ /*pushState: true*/ });

        });

        // Start

        app.start();

    }
);