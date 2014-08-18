require.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/lodash/dist/lodash',
        backbone: '../node_modules/backbone/backbone',
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
        'controllers/movie-list', 'controllers/movie-details', 'controllers/person-details', 'controllers/user-details', 'controllers/header'
    ], function(Backbone, Marionette, Radio, app, config,
        MovieListController, MovieDetailsController, PersonDetailsController, UserDetailsController, HeaderController
    ) {

        app.addInitializer(function() {

            var radio = Radio.channel('app');
            Radio.tuneIn('app');
            Radio.DEBUG = true;


            // Header

            var headerController = new HeaderController({
                region: app.headerRegion,
                user: config.user
            });

            headerController.show({ sectionTitle: 'Best Movies' });

            // Movie list

            var movieListController = new MovieListController({
                region: app.movieListRegion
            });

            var router = new Marionette.AppRouter({
                controller: movieListController,
                appRoutes: {
                    'movie/:id': 'selectMovie',
                    'janre/:name': 'selectJanre'
                },
                onRoute: function() {
                    debugger;
                    console.log('onRoute', arguments);
                }
            });

            radio.on('janre:selected', function(janre) {
                movieListController.show(janre);
                headerController.showJanre(janre);
            });

            // Movie details

            var movieDetailsController = new MovieDetailsController({
                region: app.detailsRegion
            });

            radio.on('movie:selected', function(id) {
                movieDetailsController.show(id);
                router.navigate('movie/' + id);
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
                router.navigate('person/' + id);
            });

            // User details

            var userDetailsController = new UserDetailsController({
                region: app.userRegion,
//                router: router,
                user: config.user
            });

            radio.on('user:requested', userDetailsController.show);
            radio.on('movie:hidden', userDetailsController.ignoreMovie);
            radio.on('movie:restored', userDetailsController.restoreMovie);
            radio.on('janre:hidden', userDetailsController.ignoreJanre);
            radio.on('janre:restored', userDetailsController.restoreJanre);
            radio.on('movie:watchlisted', userDetailsController.toggleWatchlistedMovie);
            radio.on('user:getDetails', function() {
//                return userDetailsController.getDetails();
            });

            userDetailsController.show();

            Backbone.history.start({ /*pushState: true*/ });

        });

        // Start

        app.start();

    }
);