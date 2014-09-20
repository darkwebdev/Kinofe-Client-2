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

require(['backbone', 'marionette', 'backbone.radio', 'app', 'config',
        'controllers/movie-list', 'controllers/movie-details', 'controllers/person-details', 'controllers/user-details', 'controllers/nav'
    ], function(Backbone, Marionette, Radio, app, config,
        MovieListController, MovieDetailsController, PersonDetailsController, UserDetailsController, NavController
    ) {

        app.addInitializer(function() {

            var radio = Radio.channel('app');
            Radio.tuneIn('app');
            Radio.DEBUG = true;


            // Header

            var navController = new NavController({
                region: app.headerRegion,
                user: config.user
            });

            navController.show();

            var routes = {};

            _.each(config.urls, function(url, name) {
                routes[url] = 'show' + name[0].toUpperCase() + name.slice(1);
            });

            console.log('appRouter', routes);

            new Marionette.AppRouter({
                controller: navController,
                appRoutes: routes
            });

            // Releases list

            var releasesController = new MovieListController({
                region: app.movieListRegion,
                autoUrl: config.urls.releases
            });

            // Watchlist

            var watchlistController = new MovieListController({
                region: app.movieListRegion,
                autoUrl: config.urls.watchlist,
                watchlistUserId: config.user.id
            });

            // Ignorelist

            var ignorelistController = new MovieListController({
                region: app.movieListRegion,
                ignorelistUserId: config.user.id
            });

            // Movie details

            var movieDetailsController = new MovieDetailsController({
                region: app.detailsRegion,
                appRoutes: {
                    //'movie/:id': 'show'
                }
            });

            // Person details

            var personDetailsController = new PersonDetailsController({
                region: app.detailsRegion
            });

            new Marionette.AppRouter({
                controller: personDetailsController,
                appRoutes: {
                    //'person/:id': 'show'
                }
            });

            // User details

            var userDetailsController = new UserDetailsController({
                region: app.userRegion,
                user: config.user
            });

            userDetailsController.show();

            // Dispatcher

            radio
                .on({
                    'movie:selected': movieDetailsController.show,
                    //'janre:selected': navController.showJanre,
                    'person:selected': personDetailsController.show,
                    //'user:requested': userDetailsController.show,
                    'movie:hidden': userDetailsController.ignoreMovie,
                    'movie:restored': userDetailsController.restoreMovie,
                    'janre:hidden': userDetailsController.ignoreJanre,
                    'janre:restored': userDetailsController.restoreJanre,
                    'movie:watchlisted': userDetailsController.toggleWatchlistedMovie
                })
                .comply({
                    'releases:show': releasesController.show,
                    'ignorelist:show': ignorelistController.show,
                    'watchlist:show': watchlistController.show,
                    'watchlist:update': watchlistController.update,
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