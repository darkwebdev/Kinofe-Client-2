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

            var radio = Radio.channel('main');

            // Header

            var headerController = new HeaderController({
                region: app.headerRegion,
                vent: radio,
                user: config.user
            });

            headerController.show({ sectionTitle: 'Best Movies' });

            // Movie list

            var movieListController = new MovieListController({
                region: app.movieListRegion,
                vent: radio
            });

            var router = new Marionette.AppRouter({
                controller: movieListController,
                appRoutes: {
                    'movie/:id': 'selectMovie',
                    'janre/:name': 'selectJanre'
                }
            });

            radio.on('janre:selected', function(janre) {
                movieListController.show(janre);
                console.log('radio on janre:selected', janre);
                headerController.showJanre(janre);
            });

            // Movie details

            var movieDetailsController = new MovieDetailsController({
                region: app.detailsRegion,
                vent: radio,
                router: router
            });

            radio.on('movie:selected', function(id) {
                console.log('radio:movie:selected', id);
                movieDetailsController.show(id);
            });

            // Person details

            var personDetailsController = new PersonDetailsController({
                region: app.detailsRegion,
                vent: radio,
                router: router
            });

            new Marionette.AppRouter({
                controller: personDetailsController,
                appRoutes: {
                    'person/:id': 'show'
                }
            });

            radio.on('person:selected', function(id) {
                console.log('radio:person:selected', id);
                personDetailsController.show(id);
            });

            // User details

            var userDetailsController = new UserDetailsController({
                region: app.userRegion,
                vent: radio,
                router: router,
                user: config.user
            });

            radio.on('user:requested', function() {
                console.log('radio:user:requested');
                userDetailsController.show();
            });
            radio.on('movie:hidden', function(id) {
                console.log('radio:movie:hidden', id);
                userDetailsController.ignoreMovie(id);
            });
            radio.on('movie:restored', function(id) {
                console.log('radio:movie:restored', id);
                userDetailsController.restoreMovie(id);
            });
            radio.on('janre:hidden', function(name) {
                console.log('radio on janre:hidden', name);
                userDetailsController.ignoreJanre(name);
            });
            radio.on('janre:restored', function(name) {
                console.log('radio on janre:restored', name);
                userDetailsController.restoreJanre(name);
            });
            radio.on('movie:watchlisted', function(id) {
                console.log('radio:movie:watchlisted', id);
                userDetailsController.toggleWatchlistedMovie(id);
            });
            radio.on('user:getDetails', function() {
                console.log('radio on user:details');
//                return userDetailsController.getDetails();
            });

            userDetailsController.show();

        });

        // Start

        app.start();

    }
);