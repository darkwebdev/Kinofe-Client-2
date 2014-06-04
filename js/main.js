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

require(['backbone', 'marionette', 'app', 'vent', 'router', 'controller', 'collections/movie-list', 'views/movie-list'],
    function(Backbone, Marionette, app, vent, Router, Controller, MovieList, MovieListView) {

        // Models

//        var MovieDetails = Backbone.Model.extend({
//            url: 'data/movie-details.json'
//        });


        app.addInitializer(function() {
            var movieList = new MovieList();
            var movieListView = new MovieListView({
                collection: movieList
            });

            var controller = new Controller({
                collection: movieList,
                region: app.mainRegion,
                vent: vent
            });

            var router = new Router({
                controller: controller
            });

            vent.on('movie:selected', function(movie) {
                console.log('vent:movie:selected', movie);
//                controller.showMovieDetails(movie);
                router.navigate('movie/' + movie.id);
            });

            app.mainRegion.show(movieListView);
        });

        // Start

        app.start();

    }
);
