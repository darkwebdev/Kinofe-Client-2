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

            //navController.show({ activeView: 'releases' });
            navController.show();

            new Marionette.AppRouter({
                controller: navController,
                appRoutes: {
                    '': 'showDefault',
                    'movie/:id': 'showMovie',
                    'janre/:name': 'showJanre'
                }
            });

            radio.on('janre:selected', function(janre) {
                navController.showJanre(janre);
                Backbone.history.navigate('janre/' + janre);
            });

            // Releases list

            var releasesController = new MovieListController({
                region: app.movieListRegion
            });

            radio.comply({
                "releases:show": releasesController.show,
                "releases:update": releasesController.update
            });

            // Watchlist

            var watchlistController = new MovieListController({
                region: app.movieListRegion,
                watchlistUserId: config.user.id
            });

            new Marionette.AppRouter({
                controller: watchlistController
            });

            radio.comply({
                "watchlist:show": watchlistController.show,
                "watchlist:update": watchlistController.update
            });

            // Movie details

            var movieDetailsController = new MovieDetailsController({
                region: app.detailsRegion
            });

            radio.on('movie:selected', function(id) {
                movieDetailsController.show(id);
                Backbone.history.navigate('movie/' + id);
            });

            // Person details

            var personDetailsController = new PersonDetailsController({
                region: app.detailsRegion
            });

            new Marionette.AppRouter({
                controller: personDetailsController,
                appRoutes: {
                    'person/:id': 'show'
                }
            });

            radio.on('person:selected', function(id) {
                personDetailsController.show(id);
                Backbone.history.navigate('person/' + id);
            });

            // User details

            var userDetailsController = new UserDetailsController({
                region: app.userRegion,
                user: config.user
            });

            radio.on({
                'user:requested': userDetailsController.show,
                'movie:hidden': userDetailsController.ignoreMovie,
                'movie:restored': userDetailsController.restoreMovie,
                'janre:hidden': userDetailsController.ignoreJanre,
                'janre:restored': userDetailsController.restoreJanre,
                'movie:watchlisted': userDetailsController.toggleWatchlistedMovie
            });

            radio.reply('user:getDetails', function() {
//                return userDetailsController.getDetails();
            });

            userDetailsController.show();

            Backbone.history.start({ /*pushState: true*/ });

        });

        // Start

        app.start();

    }
);