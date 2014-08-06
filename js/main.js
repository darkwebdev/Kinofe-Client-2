require.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/lodash/dist/lodash',
        backbone: '../node_modules/backbone/backbone',
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

            var vent;

            // Header

            var headerController = new HeaderController({
                region: app.headerRegion,
                vent: vent,
                user: config.user
            });

            headerController.show({ sectionTitle: 'Best Movies' });

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
                router: router,
                user: config.user
            });

            vent.on('user:requested', function() {
                console.log('vent:user:requested');
                userDetailsController.show();
            });
            vent.on('movie:hidden', function(id) {
                console.log('vent:movie:hidden', id);
                userDetailsController.ignoreMovie(id);
            });
            vent.on('movie:restored', function(id) {
                console.log('vent:movie:restored', id);
                userDetailsController.restoreMovie(id);
            });
            vent.on('janre:hidden', function(name) {
                console.log('vent on janre:hidden', name);
                userDetailsController.ignoreJanre(name);
            });
            vent.on('janre:restored', function(name) {
                console.log('vent on janre:restored', name);
                userDetailsController.restoreJanre(name);
            });
            vent.on('movie:watchlisted', function(id) {
                console.log('vent:movie:watchlisted', id);
                userDetailsController.toggleWatchlistedMovie(id);
            });
            vent.on('user:getDetails', function() {
                console.log('vent on user:details');
//                return userDetailsController.getDetails();
            });

            userDetailsController.show();

        });

        // Start

        app.start();

    }
);